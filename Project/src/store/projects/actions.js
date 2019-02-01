import axios from 'axios'
import {GET_PROJECTS} from "./constants";
import {REFREASH_PROJECTS} from "./constants";
import {ERROR_MESSAGE} from "./constants";

export function getProject(language) {
    return dispatch => {
        // alert(`https://api.github.com/search/repositories?q=${language}`)
        dispatch({type:REFREASH_PROJECTS,language})
        axios.get(`https://api.github.com/search/repositories?q=${language}`)
            .then(result=>{
                // alert(result.data.items)
                dispatch({type:GET_PROJECTS,language, data:result.data.items})
            }).catch(error=>{
                alert(error)
            dispatch({type:ERROR_MESSAGE, data:'Load data failed'})

        })
    }
}