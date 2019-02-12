import axios from 'axios'
import {GET_PROJECTS} from "./constants";
import {REFREASH_PROJECTS} from "./constants";
import {ERROR_MESSAGE} from "./constants";
import {LOAD_MORE_PROJECTS} from "./constants";
import {LOAD_MORE_PROJECTS_FAILED} from "./constants";

export function loadMoreProjects(language, pageIndex, pageSize, dataArray) {
    if ((pageIndex - 1) * pageSize >= dataArray.length) {
        return {type:LOAD_MORE_PROJECTS_FAILED,language, errorMsg:'No more projects',dataArray}
    } else {
        let index = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        return {type:LOAD_MORE_PROJECTS,language, index, pageIndex, dataArray}
    }
}

export function getProject(language, pageSize) {
    return dispatch => {
        // alert(`https://api.github.com/search/repositories?q=${language}`)
        dispatch({type:REFREASH_PROJECTS,language})
        axios.get(`https://api.github.com/search/repositories?q=${language}`)
            .then(result=>{
                // alert(result.data.items)
                dispatch({type:GET_PROJECTS,language, data:result.data.items, pageSize})
            }).catch(error=>{
                alert(error)
            dispatch({type:ERROR_MESSAGE, data:'Load data failed'})

        })
    }
}

