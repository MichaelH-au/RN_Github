import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from '../../navigators/NavigationUtil'

class Index extends Component {
    render() {
        const TabNavigator = createMaterialTopTabNavigator({
            PopularTab1:{
                screen: PopularTab,
                navigationOptions:{
                    title:'Tab1'
                }
            },
            PopularTab2:{
                screen: PopularTab,
                navigationOptions:{
                    title:'Tab1'
                }
            },
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
    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
                <Text onPress={()=>{
                    NavigationUtil.redirectPage({
                        navigation:this.props.navigation
                    },'DetailPage')
                }}>Redirect to Detail</Text>
            </View>
        );
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