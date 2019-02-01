import {GET_PROJECTS} from "./constants";
import {REFREASH_PROJECTS} from "./constants";
import {ERROR_MESSAGE} from "./constants";

const initState = {
    // projects:[],
    errorMsg:''
}

export default function (state = initState, action) {
    switch (action.type) {
        case REFREASH_PROJECTS:
            return {...state, [action.language]:{...[action.language],isLoading:true,items:[]}}
        case GET_PROJECTS:
            return {...state, [action.language]:{...[action.language],items:action.data,isLoading: false}}
        case ERROR_MESSAGE:
            return {...state, errorMsg:action.data}
        default:
            return state
    }
}