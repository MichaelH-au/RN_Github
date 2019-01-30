import {combineReducers, createStore, applyMiddleware} from 'redux'
import {middleware} from "../navigators/appNavigators";
import thunk from 'redux-thunk'
import navigationReducer from './navigation'
import themeReducer from './theme'
import logger from './middleware/logger'


const middlewares = [
    middleware,
    logger,
    thunk
];

const reducers = combineReducers({
    nav:navigationReducer,
    theme:themeReducer
})
export default createStore(reducers, applyMiddleware(...middlewares))
