export default class NavigationUtil {
    /**
     * Go back to previous page
      * @param params
     */
    static goBack(navigation) {
        navigation.goBack()
    }

    /**
     * redirect to HomePage
     * @param params
     */
    static resetTohomePage(navigation) {
        navigation.navigate('HomePage')
    }

    static redirectPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('navigation should not be null!')
            return
        }
        navigation.navigate(page, {...params})
    }
}