// @flow
import axios from 'axios';

import {
    TOGGLE_MENU_STATUS,
    BOTTOM_NAV_CHECKED_INDEX_CHANGE,
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
        axios.get('/hello')
            .then(function (response) {
                dispatch(() => {
                    return {
                        type: WECHAT_LOGIN_STATE_CHANGE,
                        wechatLoginState: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};