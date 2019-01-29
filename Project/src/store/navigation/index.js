import {rootCom, rootNavigator} from "../../navigators/appNavigators";
import {createStore} from 'redux'
const navState = rootNavigator.router.getStateForAction(rootNavigator.router.getActionForPathAndParams(rootCom))

const navReducer = (state = navState, action) => {
    const nextState = rootNavigator.router.getStateForAction(action, state);
    return nextState || state
}
export default navReducer
