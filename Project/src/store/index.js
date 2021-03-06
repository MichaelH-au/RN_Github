import {combineReducers, createStore, applyMiddleware} from 'redux'
import {middleware} from "../navigators/appNavigators";
import thunk from 'redux-thunk'
import navigationReducer from './navigation'
import themeReducer from './theme'
import projectReducer from './projects'
import trendingReducer from './trendings'
import logger from './middleware/logger'


const middlewares = [
    middleware,
    logger,
    thunk
];

const reducers = combineReducers({
    nav:navigationReducer,
    theme:themeReducer,
    project:projectReducer,
    trending:trendingReducer
})
export default createStore(reducers, applyMiddleware(...middlewares))
