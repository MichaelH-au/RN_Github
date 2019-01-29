import {CHANGE_THEME_COLOR} from "./constants";

const initState = {
    theme:'red'
}

export default function onThemeChange(state = initState, action) {
    switch (action.type) {
        case CHANGE_THEME_COLOR:
            return {...state, theme:action.data}
        default:
            return state
    }
}