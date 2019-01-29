import {CHANGE_THEME_COLOR} from "./constants";

export function changThemeColor(color) {
    return {type:CHANGE_THEME_COLOR, data:color}
}