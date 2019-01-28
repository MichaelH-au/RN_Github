/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {createAppContainer} from 'react-navigation'
import { appStackNavigator } from "./src/navigators/appNavigators";
import {name as appName} from './app.json';

const appStackNavigatorContainer = createAppContainer(appStackNavigator)
AppRegistry.registerComponent(appName, () => appStackNavigatorContainer);
