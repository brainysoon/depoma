import {combineReducers} from 'redux';
import {
    TOGGLE_MENU_STATUS,
    BOTTOM_NAV_CHECKED_INDEX_CHANGE,
    WECHAT_LOGIN_STATE_CHANGE,
    LOAD_WECHAT_GRANT_QR_SUCCESSFULLY
} from 'src/share/actionType/sharedActionTypes';
import {
    DEFAULT_BOTTOM_NAV_CHECKED_INDEX,
    DEFAULT_MENU_STATUS,
    DEFAULT_WECHAT_LOGIN_STATE,
    DEFAULT_WECHAT_GRANT_QR_URL,
} from 'src/share/constant/sharedConstants';

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

const wechatLoginState = (state = DEFAULT_WECHAT_LOGIN_STATE, action) => {

    switch (action.type) {
        case WECHAT_LOGIN_STATE_CHANGE:
            return action.wechatLoginState;
        default:
            return state;
    }
};

const wechatQRURL = (state = DEFAULT_WECHAT_GRANT_QR_URL, action) => {

    switch (action.type) {
        case LOAD_WECHAT_GRANT_QR_SUCCESSFULLY:
            return action.wechatGrantQRURL;
        default:
            return state;
    }
};

const appReducer = combineReducers({
    bottomNavCheckedIndex,
    menuStatus,
    wechatLoginState,
    wechatQRURL
});

export default appReducer;