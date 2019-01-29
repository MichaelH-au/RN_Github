import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation'
import {createAppContainer} from 'react-navigation'
import {BottomTabBar} from 'react-navigation-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Popular from '../containers/Propular'
import Trending  from '../containers/Trending'
import Favorite from '../containers/Favorite'
import MyInfo from '../containers/MyInfo'

import NavigationUtil from './NavigationUtil'

const TABS = {
    PopularPage:{
        screen:Popular,
        navigationOptions:{
            tabBarIcon:({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color:tintColor}}
                />
            )


        }
    },
    TrendingPage:{
        screen:Trending,
        navigationOptions:{
            tabBarIcon:({tintColor, focused}) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    FavoritePage:{
        screen:Favorite,
        navigationOptions:{
            tabBarIcon:({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    MyInfoPage:{
        screen:MyInfo,
        navigationOptions:{
            tabBarIcon:({tintColor, focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    }
}
class DynamicTabNavigator extends Component {
    _tabNavigator(){
       const {PopularPage, TrendingPage, FavoritePage, MyInfoPage} = TABS;
       const tabs = {PopularPage, TrendingPage, FavoritePage, MyInfoPage}
       return createBottomTabNavigator(tabs,{
           tabBarComponent:TabBarComponent
       })

    }
    render() {
        // console.log(this.props.navigation)
        const Tab = createAppContainer(this._tabNavigator());
        return (
            <Tab/>
        )
    }
}

class TabBarComponent extends Component{
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime:new Date().getTime()
        }
    }
    render(){
        const {routes, index} = this.props.navigation.state;
        if (routes[index].params) {
            const {theme} = routes[index].params
            /**
             * make sure it is the latest setting
             */
            if (theme && theme.updateTime > this.theme.updateTime){
                this.theme = theme
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor||this.props.activeTintColor}
        />
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})
export default DynamicTabNavigator;