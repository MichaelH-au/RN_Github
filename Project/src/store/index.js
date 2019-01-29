import {combineReducers, createStore, applyMiddleware} from 'redux'
import {middleware} from "../navigators/appNavigators";
import navigationReducer from './navigation'
import themeReducer from './theme'


const middlewares = [
    middleware
];

const reducers = combineReducers({
    nav:navigationReducer,
    theme:themeReducer
})
export default createStore(reducers, applyMiddleware(...middlewares))
