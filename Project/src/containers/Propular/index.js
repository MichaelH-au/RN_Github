import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation'
import {createAppContainer} from 'react-navigation'
import {connect}from 'react-redux'
import {getProject} from "../../store/projects/actions";
import NavigationUtil from '../../navigators/NavigationUtil'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames : ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP']
        }
    }

    /**
     * generate tabBar items
     * @private
     */
    _genTabs(){
        const tabs = {};
        this.state.tabNames.forEach((item, index)=> {
            // alert(this.props.getProject)
            tabs[`tab${index}`] = {
                screen: props => <PopularPage {...props} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        })
        return tabs
    }
    render() {
        const TabNavigator = createMaterialTopTabNavigator(this._genTabs(),{
            tabBarOptions:{
                //tabBar style
                tabStyle:styles.tabStyle,
                upperCaseLabel:false,
                scrollEnabled:true,
                style:{
                    //change background color
                    backgroundColor: '#678'
                },
                //underline style
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle

            }
        })
        const NavigatorContainer = createAppContainer(TabNavigator)
        return (
            <View style={{flex:1,paddingTop:30}}>
                <NavigatorContainer/>
            </View>
        );
    }
}

class PopularTab extends Component {
    componentDidMount(){
        this.props.getProject(this.props.tabLabel)
    }
    renderItem(data){
        const item = data.item
        return (
            <View style={{marginBottom: 10}}>
                <Text style={{backgroundColor:'#faa'}}>{JSON.stringify(item)}</Text>
            </View>
        )
    }
    render() {
        const {tabLabel} = this.props;
        // let tabLabel = this.props.tabLabel
        const {projects} = this.props;
        let store = projects[tabLabel]?projects[tabLabel]:{items:[],isLoading:false};

        return (
            <View style={styles.container}>
                <Text onPress={()=>{
                    NavigationUtil.redirectPage({
                        navigation:this.props.navigation
                    },'DetailPage')
                }}>Redirect to Detail</Text>
                <Text>{this.props.tabLabel}</Text>
                {/*{*/}
                   {/*store.items.map((item,index)=>(*/}
                    {/*<Text>{item.full_name}111</Text>*/}
                    {/*))*/}
                {/*}*/}
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.id}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={'red'}
                            colors={['red']}
                            refreshing={store.isLoading}
                            onRefresh={()=>this.props.getProject(this.props.tabLabel)}
                            tintColor={'red'}
                        />
                    }
                />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    projects:state.project
})

const actionCreator = {
    getProject
}
const PopularPage = connect(mapStateToProps, actionCreator)(PopularTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabStyle:{
        minWidth:30,
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    labelStyle:{
        fontSize:13,
        marginTop:6,
        marginBottom:6
    }
})
export default Index;