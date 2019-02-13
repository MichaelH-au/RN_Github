export default class Utils {
    static checkFavorite(item, items = []) {
        if (!items) return false
        for (let i = 0, len = items.length; i < len; i++) {
            let id = item.id ? item.id : item.fullName;
            if (id.toString() === items[i]) {
                return true
            }
        }
        return false
    }

    static onFavorite(favoriteDao, item, isFavorite, flag) {
        console.log(item)
        let key = flag === 'popular' ? item.id.toString() : item.fullName
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
        } else {
            favoriteDao.removeFavoriteItem(key)
        }
    }
}