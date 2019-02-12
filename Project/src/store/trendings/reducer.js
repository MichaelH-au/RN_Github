import {GET_TRENDINGS} from "./constants";
import {REFREASH_TRENDINGS} from "./constants";
import {ERROR_MESSAGE} from "./constants";
import {LOAD_MORE_TRENDINGS} from "./constants";
import {LOAD_MORE_TRENDINGS_FAILED} from "./constants";

const initState = {
    // projects:[],
    errorMsg:''
}

export default function (state = initState, action) {
    switch (action.type) {
        case REFREASH_TRENDINGS:
            return {...state, [action.language]:{...state[action.language],isLoading:true,items:[]}}
        case GET_TRENDINGS:
            return {...state, [action.language]:{...state[action.language],items:action.data.slice(0, action.pageSize),isLoading: false, allProjects : action.data, pageIndex:1}}
        case LOAD_MORE_TRENDINGS:
            return {...state, [action.language]:{...state[action.language],items:action.dataArray.slice(0, action.index), pageIndex:action.pageIndex}}
        case LOAD_MORE_TRENDINGS_FAILED:
            return {...state, [action.language]:{...state[action.language],items:action.dataArray, loadFinished: true}}
        case ERROR_MESSAGE:
            return {...state, errorMsg:action.data}
        default:
            return state
    }
}