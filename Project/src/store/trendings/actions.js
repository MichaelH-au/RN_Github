import axios from 'axios'
import Trending from 'GitHubTrending'
import {GET_TRENDINGS} from "./constants";
import {REFREASH_TRENDINGS} from "./constants";
import {ERROR_MESSAGE} from "./constants";
import {LOAD_MORE_TRENDINGS} from "./constants";
import {LOAD_MORE_TRENDINGS_FAILED} from "./constants";
import ProjectModel from '../../model/ProjectModel'
import Utils from '../../utils/Favorite'

export function loadMoreTredings(language, pageIndex, pageSize, dataArray, favoriteDao) {
    if ((pageIndex - 1) * pageSize >= dataArray.length) {
        return {type:LOAD_MORE_TRENDINGS_FAILED,language, errorMsg:'No more projects',dataArray}
    } else {
        let index = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        // return {type:LOAD_MORE_TRENDINGS,language, index, pageIndex, dataArray}
        _projectModels(dataArray.slice(0, max), favoriteDao, projectModels => {
            return {type:LOAD_MORE_TRENDINGS,language, index, pageIndex, dataArray, projectModels}
        })
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

export function getTrending(language, pageSize, timeSpan, favoriteDao) {
    return dispatch => {
        dispatch({type:REFREASH_TRENDINGS,language})
        new Trending().fetchTrending(`https://github.com/trending/${language}?${timeSpan}`)
            .then(items => {
                if (!items) {
                    throw new Error('empty data')
                }
                // dispatch({type:GET_TRENDINGS,language, data:items, pageSize})
                let showItems = pageSize > items.length ? items : items.slice(0, pageSize)
                _projectModels(showItems, favoriteDao, projectModels => {
                    dispatch({type:GET_TRENDINGS,language, data:items, pageSize,projectModels})
                })
            }).catch(error => {
                alert(error)
                dispatch({type:ERROR_MESSAGE, data:'Load data failed'})
        })
    }
}

async function _projectModels(showItems, favoriteDao, callBack) {
    let keys = [];
    try {
        keys = await favoriteDao.getFavoriteKeys();
    } catch (e) {
        alert(e)
    }
    let projectModels = []
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModels.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)))
    }
    if (typeof callBack === "function") {
        callBack(projectModels);
    }
}