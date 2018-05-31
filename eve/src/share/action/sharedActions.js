// @flow

import {
    BOTTOM_NAV_CHECKED_INDEX_CHANGE,
    LOAD_WECHAT_GRANT_QR,
    TOGGLE_MENU_STATUS,
    LOAD_WECHAT_LOGIN_STATE,
    WECHAT_LOGIN_STATE_CHANGE
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

export const loadQR = () => {

    return (dispatch) => {
        dispatch({
            type: LOAD_WECHAT_GRANT_QR,
            payload: {
                request: {
                    url: '/login',
                    method: 'POST'
                }
            }
        })
            .then((response) => {
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const checkWechatLoginState = () => {

    return (dispatch) => {
        dispatch({
            type: LOAD_WECHAT_LOGIN_STATE,
            payload: {
                request: {
                    url: '/login/state',
                    method: 'GET'
                }
            }
        })
            .then((response) => {

                if (!response.state) {
                    dispatch({
                        type: WECHAT_LOGIN_STATE_CHANGE,
                        wechatLoginState: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};