// @flow

import {
    BOTTOM_NAV_CHECKED_INDEX_CHANGE,
    LOAD_WECHAT_GRANT_QR,
    LOAD_WECHAT_GRANT_QR_FAILED,
    LOAD_WECHAT_GRANT_QR_SUCCEED,
    TOGGLE_MENU_STATUS
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
                    url: '/hello',
                    method: 'GET'
                }
            }
        })
            .then((response) => {
                dispatch({
                    type: LOAD_WECHAT_GRANT_QR_SUCCEED,
                    wechatLoginState: response.url
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: LOAD_WECHAT_GRANT_QR_FAILED,
                })
            });
    };
};