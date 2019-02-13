import {AsyncStorage} from 'react-native'

const FAVORITE_KEY_PREFIX = 'favorite_'
export default class FavoriteDao {

    constructor(flag) {
        this.favoriteKey = FAVORITE_KEY_PREFIX + flag
    }

    /**
     * save project
     * @param key project key
     * @param value     project
     * @param callback
     */
    saveFavoriteItem(key, value, callback) {
        console.log(this.favoriteKey)
        console.log(key)
        console.log(value)
        AsyncStorage.setItem(key, value, (error, result) => {
            if (!error) {
                console.log('success')
                this.updateFavoriteKeys(key, true)
            }
        })
    }

    /**
     * modify storage
     * @param key   project key
     * @param added     remove or add
     */
    updateFavoriteKeys(key, added) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if (!error) {
                let favoriteKeys = []
                if (result) {
                    favoriteKeys = JSON.parse(result)
                }
                let index = favoriteKeys.indexOf(key)
                if (added) {
                    if (index === -1) {
                        favoriteKeys.push(key)
                    }
                } else {
                    if (index !== -1) {
                        favoriteKeys.splice(index, 1)
                    }
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
            }
        })
    }

    /**
     * get all Favorite project
     * @returns {Promise<any> | Promise}
     */
    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(error)
                }
            })
        })
    }

    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error, result) => {
            if (!error) {
                this.updateFavoriteKeys(key, false)
            }
        })
    }

    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getFavoriteKeys().then((keys) => {
                let items = []
                if (keys) {
                    AsyncStorage.multiGet(keys, (error, stores) => {
                        try {
                            stores.map((item, i, stores) => {
                                let key = stores[i][0]
                                let value = stores[i][1]
                                if (value) items.push(JSON.parse(value))
                            })
                            resolve(item)
                        } catch (e) {
                            reject(e)
                        }
                    })
                } else {
                    resolve(items)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }
}