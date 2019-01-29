import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createSwitchNavigator
} from 'react-navigation'

import WelcomePage from '../containers/Welcome'
import HomePate from '../containers/Home'
import DetailPate from '../containers/Details'

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

export default createSwitchNavigator({
    Init: InitNavigator,
    Main:MainNavigator
})