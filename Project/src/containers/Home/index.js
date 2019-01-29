import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationUtil from '../../navigators/NavigationUtil'
import DynamicTabNavigator from '../../navigators/DynamicTabNavigator'


class Index extends Component {
    render() {
        NavigationUtil.navigation = this.props.navigation
        return (
            <DynamicTabNavigator/>
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