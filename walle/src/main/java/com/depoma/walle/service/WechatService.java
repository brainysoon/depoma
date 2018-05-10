package com.depoma.walle.service;

import com.depoma.walle.entity.Wechat;

public interface WechatService {

    Wechat findByOpenid(String openid);
}
