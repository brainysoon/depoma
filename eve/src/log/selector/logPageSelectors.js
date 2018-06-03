import _ from 'lodash'

export const getWechatId = (state) => _.get(state, 'app.wechatInfo.wechatId');