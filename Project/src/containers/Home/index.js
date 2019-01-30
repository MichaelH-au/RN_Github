import React, {Component} from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import NavigationUtil from '../../navigators/NavigationUtil'
import DynamicTabNavigator from '../../navigators/DynamicTabNavigator'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'

class Index extends Component {

    componentDidMount(){
        /**
         * For Android only
         */
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }

    /**
     * For Android only reset default go back button
     * @returns {boolean}
     */
    onBackPress(){
        const {dispatch, nav} = this.props;
        if (nav.routes[1].index === 0) {
            return false
        }
        dispatch(NavigationActions.back())
        return true
    }
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

const mapStateToProps =  state => ({
    nav:state.nav,
    theme:state.theme
})

export default connect(mapStateToProps)(Index);