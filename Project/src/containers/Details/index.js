import React, {Component} from 'react';
import { Text, View, TouchableOpacity, WebView, StyleSheet } from 'react-native';
import NavBar from '../../components/NavBar'
import {createMaterialTopTabNavigator} from "react-navigation";
import NavUtil from '../../components/NavBar/util'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../../navigators/NavigationUtil'

const TRENDING_URL = 'https://github.com'
class Indiex extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params
        const {project} = this.params
        this.url = project.html_url || TRENDING_URL + project.full_name
        const title = project.full_name || project.fullName
        this.state = {
            title: title,
            url: this.url,
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
    renderRightButton() {
        return (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => {

                    }}
                >
                    <FontAwesome
                        name={'star-o'}
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