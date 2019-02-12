import axios from 'axios'
import Trending from 'GitHubTrending'
import {GET_TRENDINGS} from "./constants";
import {REFREASH_TRENDINGS} from "./constants";
import {ERROR_MESSAGE} from "./constants";
import {LOAD_MORE_TRENDINGS} from "./constants";
import {LOAD_MORE_TRENDINGS_FAILED} from "./constants";

export function loadMoreTredings(language, pageIndex, pageSize, dataArray) {
    if ((pageIndex - 1) * pageSize >= dataArray.length) {
        return {type:LOAD_MORE_TRENDINGS_FAILED,language, errorMsg:'No more projects',dataArray}
    } else {
        let index = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        return {type:LOAD_MORE_TRENDINGS,language, index, pageIndex, dataArray}
    }
}

// export function getTreding(language, pageSize) {
//     return dispatch => {
//         // alert(`https://api.github.com/search/repositories?q=${language}`)
//         dispatch({type:REFREASH_TRENDINGS,language})
//         axios.get(`https://api.github.com/search/repositories?q=${language}`)
//             .then(result=>{
//                 // alert(result.data.items)
//                 dispatch({type:GET_TRENDINGS,language, data:result.data.items, pageSize})
//             }).catch(error=>{
//                 alert(error)
//             dispatch({type:ERROR_MESSAGE, data:'Load data failed'})
//
//         })
//     }
// }

export function getTrending(language, pageSize) {
    return dispatch => {
        new Trending().fetchTrending(`https://github.com/trending/${language}`)
            .then(items => {
                if (!items) {
                    throw new Error('empty data')
                }
                dispatch({type:GET_TRENDINGS,language, data:items, pageSize})
            }).catch(error => {
                alert(error)
                dispatch({type:ERROR_MESSAGE, data:'Load data failed'})
        })
    }
}