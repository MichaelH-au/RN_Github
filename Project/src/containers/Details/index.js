import React, {Component} from 'react';
import { Text, View, TouchableOpacity, WebView, StyleSheet } from 'react-native';
import NavBar from '../../components/NavBar'
import {createMaterialTopTabNavigator} from "react-navigation";
import NavUtil from '../../components/NavBar/util'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../../navigators/NavigationUtil'
import FavoriteDao from "../../dao/FavoriteDao";

const TRENDING_URL = 'https://github.com'
class Indiex extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params
        const {projectModel, flag} = this.params
        const project = projectModel.item
        this.favoriteDao = new FavoriteDao(flag)
        // console.log(project)
        this.url = flag === 'trending' ? TRENDING_URL + project.url : TRENDING_URL + '/' + project.full_name
        // console.log(this.url)
        // console.log(projectMode.isFavorite)
        const title = project.full_name || project.fullName
        this.state = {
            title: title,
            url: this.url,
            isFavorite:projectModel.isFavorite,
            canGoBack: false
        }
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack()
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }
    onFavoriteButtonClick(){
        const {projectModel} = this.params
        const isFavorite = projectModel.isFavorite = !projectModel.isFavorite
        this.setState({
            isFavorite:isFavorite
        })
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString()
        console.log(this.favoriteDao)
        console.log(key)
        console.log(projectModel.isFavorite)
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item))
        } else {
            this.favoriteDao.removeFavoriteItem(key)
        }
    }
    renderRightButton() {
        return (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.onFavoriteButtonClick()
                    }}
                >
                    <FontAwesome
                        name={this.state.isFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight:10}}
                    />
                </TouchableOpacity>
                {NavUtil.getShareButton(() => {})}
            </View>
        )
    }
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack:navState.canGoBack,
            url:navState.url
        })
    }
    render() {
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight:30} : null
        let navBar = <NavBar
            leftButton={NavUtil.getLeftBackButton(() => this.onBack())}
            titleLayoutStyle={titleLayoutStyle}
            rightButton = {this.renderRightButton()}
            title = {this.state.title}
            style={{backgroundColor:'#678'}}
        />
        return (
            <View style={styles.container}>
                {navBar}
                {/*<Text>Details page</Text>*/}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{uri:this.state.url}}
                />
                <Text>{this.state.url}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default Indiex;