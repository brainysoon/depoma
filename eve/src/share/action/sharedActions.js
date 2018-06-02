// @flow

import {
    BOTTOM_NAV_CHECKED_INDEX_CHANGE,
    LOAD_WECHAT_LOGIN_PAYLOAD,
    TOGGLE_MENU_STATUS,
    LOAD_WECHAT_LOGIN_STATE,
    LOAD_WECHAT_INFO,
    LOAD_CHAT_RECORDS
} from 'src/share/actionType/sharedActionTypes';

export const toggleMenuStatus = () => {

    return {
        type: TOGGLE_MENU_STATUS
    }
};

export const handleBottomNavClick = (bottomNavCheckedIndex: number) => {

    return {
        type: BOTTOM_NAV_CHECKED_INDEX_CHANGE,
        bottomNavCheckedIndex: bottomNavCheckedIndex
    }
};

export const loadWechatLoginPayload = () => {

    return (dispatch) => {
        dispatch({
            type: LOAD_WECHAT_LOGIN_PAYLOAD,
            payload: {
                request: {
                    url: '/login',
                    method: 'POST'
                }
            }
        }).then((response) => {
        }).catch(function (error) {
            console.log(error);
        });
    };
};

export const checkWechatLoginState = (serviceId) => {

    return (dispatch) => {
        dispatch({
            type: LOAD_WECHAT_LOGIN_STATE,
            payload: {
                request: {
                    url: '/login/status/' + serviceId,
                    method: 'GET'
                }
            }
        }).then((response) => {
        }).catch(function (error) {
            console.log(error);
        });
    };
};

export const loadWechatInfo = (serviceId) => {

    return (dispatch) => {
        dispatch({
            type: LOAD_WECHAT_INFO,
            payload: {
                request: {
                    url: '/wechat/info/' + serviceId,
                    method: 'GET'
                }
            }
        }).then((response) => {
        }).catch((error) => {
            console.log(error);
        })
    }
};

export const loadChatRecords = (wechatId) => {

    return (dispatch) => {
        dispatch({
            type: LOAD_CHAT_RECORDS,
            payload: {
                request: {
                    url: '/chat/records/' + wechatId,
                    method: 'GET'
                }
            }
        }).then((response) => {
        }).catch((error) => {
            console.log(error);
        });
    }
};