import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createSwitchNavigator
} from 'react-navigation'
import {connect} from 'react-redux'
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers'

import WelcomePage from '../containers/Welcome'
import HomePate from '../containers/Home'
import DetailPate from '../containers/Details'

export const rootCom = 'Init'
const InitNavigator = createStackNavigator({
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:{
            header:null,
        }
    }
})

const MainNavigator = createStackNavigator({
    HomePage:{
        screen:HomePate,
        navigationOptions:{
            header:null,
        }
    },
    DetailPage: {
        screen: DetailPate,
        navigationOptions: {
        }
    }
});

export const rootNavigator =  createSwitchNavigator({
    Init: InitNavigator,
    Main:MainNavigator
})

export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state=>state.nav
)

const appWithNavigationState = reduxifyNavigator(rootNavigator, 'root');

const mapStatToProps = state => ({
    state:state.nav
})

export default connect(mapStatToProps)(appWithNavigationState)