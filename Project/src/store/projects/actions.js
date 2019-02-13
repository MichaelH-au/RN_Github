import axios from 'axios'
import {GET_PROJECTS} from "./constants";
import {REFREASH_PROJECTS} from "./constants";
import {ERROR_MESSAGE} from "./constants";
import {LOAD_MORE_PROJECTS} from "./constants";
import {LOAD_MORE_PROJECTS_FAILED} from "./constants";
import ProjectModel from '../../model/ProjectModel'
import Utils from '../../utils/Favorite'

export function loadMoreProjects(language, pageIndex, pageSize, dataArray, favoriteDao) {
    if ((pageIndex - 1) * pageSize >= dataArray.length) {
        return {type:LOAD_MORE_PROJECTS_FAILED,language, errorMsg:'No more projects',dataArray}
    } else {
        let index = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        _projectModels(dataArray.slice(0, max), favoriteDao, projectModels => {
            return {type:LOAD_MORE_PROJECTS,language, index, pageIndex, dataArray, projectModels}
        })
    }
}

export function getProject(language, pageSize,favoriteDao) {
    return dispatch => {
        // alert(`https://api.github.com/search/repositories?q=${language}`)
        dispatch({type:REFREASH_PROJECTS,language})
        axios.get(`https://api.github.com/search/repositories?q=${language}`)
            .then(result=>{
                // alert(result.data.items)
                let showItems = pageSize > result.data.items.length ? result.data.items : result.data.items.slice(0, pageSize)
                _projectModels(showItems, favoriteDao, projectModels => {
                    dispatch({type:GET_PROJECTS,language, data:result.data.items, pageSize,projectModels})
                })
            }).catch(error=>{
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