import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from '../../navigators/NavigationUtil'

class Index extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP']
    }

    /**
     * generate tabBar items
     * @private
     */
    _genTabs(){
        const tabs = {};
        this.tabNames.forEach((item, index)=> {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={item}/>,
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
    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
                <Text onPress={()=>{
                    NavigationUtil.redirectPage({
                        navigation:this.props.navigation
                    },'DetailPage')
                }}>Redirect to Detail</Text>
                <Text>{this.props.tabLabel}</Text>
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