import {GET_PROJECTS} from "./constants";
import {REFREASH_PROJECTS} from "./constants";
import {ERROR_MESSAGE} from "./constants";
import {LOAD_MORE_PROJECTS} from "./constants";
import {LOAD_MORE_PROJECTS_FAILED} from "./constants";

const initState = {
    // projects:[],
    errorMsg:''
}

export default function (state = initState, action) {
    switch (action.type) {
        case REFREASH_PROJECTS:
            return {...state, [action.language]:{...state[action.language],isLoading:true,items:[]}}
        case GET_PROJECTS:
            return {...state, [action.language]:{...state[action.language],items:action.data.slice(0, action.pageSize),isLoading: false, allProjects : action.data, pageIndex:1}}
        case LOAD_MORE_PROJECTS:
            return {...state, [action.language]:{...state[action.language],items:action.dataArray.slice(0, action.index), pageIndex:action.pageIndex}}
        case LOAD_MORE_PROJECTS_FAILED:
            return {...state, [action.language]:{...state[action.language],items:action.dataArray, loadFinished: true}}
        case ERROR_MESSAGE:
            return {...state, errorMsg:action.data}
        default:
            return state
    }
}