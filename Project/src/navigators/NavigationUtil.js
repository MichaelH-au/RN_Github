export default class NavigationUtil {
    /**
     * Go back to previous page
      * @param params
     */
    static resetTohomePage(params) {
        const {navigation} = params;
        navigation.navigate('HomePage')
    }

    /**
     * redirect to HomePage
     * @param params
     */
    static resetTohomePage(params) {
        const {navigation} = params;
        navigation.navigate('HomePage')
    }
}