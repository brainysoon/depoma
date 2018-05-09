import {combineReducers} from 'redux';
import {TOGGLE_MENU_STATUS, BOTTOM_NAV_CHECKED_INDEX_CHANGE} from 'src/share/actionType/sharedActionTypes';
import {DEFAULT_BOTTOM_NAV_CHECKED_INDEX, DEFAULT_MENU_STATUS} from 'src/share/constant/sharedConstants';

const menuStatus = (state = DEFAULT_MENU_STATUS, action) => {

    switch (action.type) {
        case TOGGLE_MENU_STATUS:
            return !state;
        default:
            return state;
    }
};

const bottomNavCheckedIndex = (state = DEFAULT_BOTTOM_NAV_CHECKED_INDEX, action) => {

    switch (action.type) {
        case BOTTOM_NAV_CHECKED_INDEX_CHANGE:
            return action.bottomNavCheckedIndex;
        default:
            return state;
    }
};

const appReducer = combineReducers({
    bottomNavCheckedIndex,
    menuStatus
});

export default appReducer;