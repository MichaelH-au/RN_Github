import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation'
import {createAppContainer} from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Popular from '../Propular'
import Trending  from '../Trending'
import Favorite from '../Favorite'
import MyInfo from '../MyInfo'


class Index extends Component {
    _tabNavigator(){
        return createBottomTabNavigator({
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
        })

    }
    render() {
        const Tab = createAppContainer(this._tabNavigator());
        return (
            <Tab/>
        )
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
export default Index;