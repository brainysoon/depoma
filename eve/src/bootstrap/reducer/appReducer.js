import {combineReducers} from 'redux';
import {
    TOGGLE_MENU_STATUS,
    BOTTOM_NAV_CHECKED_INDEX_CHANGE,
    LOAD_WECHAT_LOGIN_PAYLOAD_SUCCESS,
    LOAD_WECHAT_LOGIN_STATE_SUCCESS,
    LOAD_WECHAT_INFO_SUCCESS,
    LOAD_CHAT_RECORDS_SUCCESS,
    LOAD_WECHAT_SAMPLES_SUCCESS,
    LOAD_WECHAT_ROBOTS_SUCCESS,
    LOAD_SERVICE_LOGS_SUCCESS,
    TOGGLE_SETTING
} from 'src/share/actionType/sharedActionTypes';
import {
    DEFAULT_BOTTOM_NAV_CHECKED_INDEX,
    DEFAULT_MENU_STATUS,
    DEFAULT_WECHAT_LOGIN_STATE,
    DEFAULT_WECHAT_LOGIN_PAYLOAD,
    DEFAULT_WECHAT_INFO,
    DEFAULT_CHAT_RECORDS,
    DEFAULT_WECHAT_SAMPLES,
    DEFAULT_WECHAT_ROBOTS,
    DEFAULT_SERVICE_LOGS,
    DEFAULT_TOGGLES
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
        case LOAD_WECHAT_LOGIN_STATE_SUCCESS:
            return action.payload.data.loginStatus > 0;
        default:
            return state;
    }
};

const wechatLoginPayload = (state = DEFAULT_WECHAT_LOGIN_PAYLOAD, action) => {

    switch (action.type) {
        case LOAD_WECHAT_LOGIN_PAYLOAD_SUCCESS:
            return action.payload.data;
        default:
            return state;
    }
};

const wechatInfo = (state = DEFAULT_WECHAT_INFO, action) => {
    switch (action.type) {
        case LOAD_WECHAT_INFO_SUCCESS:
            return action.payload.data.wechatInfo;
        default:
            return state;
    }
};

const chatRecords = (state = DEFAULT_CHAT_RECORDS, action) => {
    switch (action.type) {
        case LOAD_CHAT_RECORDS_SUCCESS:
            return action.payload.data.records;
        default:
            return state;
    }
};

const wechatSamples = (state = DEFAULT_WECHAT_SAMPLES, action) => {
    switch (action.type) {
        case LOAD_WECHAT_SAMPLES_SUCCESS:
            return action.payload.data.samples;
        default:
            return state;
    }
};

const wechatRobots = (state = DEFAULT_WECHAT_ROBOTS, action) => {
    switch (action.type) {
        case LOAD_WECHAT_ROBOTS_SUCCESS:
            return action.payload.data.robots;
        default:
            return state;
    }
};

const serviceLogs = (state = DEFAULT_SERVICE_LOGS, action) => {
    switch (action.type) {
        case LOAD_SERVICE_LOGS_SUCCESS:
            return action.payload.data.serviceLogs;
        default:
            return state;
    }
};

const toggles = (state = DEFAULT_TOGGLES, action) => {
    switch (action.type) {
        case TOGGLE_SETTING:
            const newState = {...state};
            return _.merge(newState, action.toggles);
        default:
            return state;
    }
};

const appReducer = combineReducers({
    bottomNavCheckedIndex,
    menuStatus,
    wechatLoginState,
    wechatLoginPayload,
    wechatInfo,
    chatRecords,
    wechatSamples,
    wechatRobots,
    serviceLogs,
    toggles
});

export default appReducer;