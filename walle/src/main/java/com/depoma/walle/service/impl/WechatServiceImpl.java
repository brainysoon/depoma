package com.depoma.walle.service.impl;

import com.depoma.walle.dao.WechatMapper;
import com.depoma.walle.entity.Wechat;
import com.depoma.walle.service.WechatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WechatServiceImpl implements WechatService {

    @Autowired
    private WechatMapper wechatMapper;

    @Override
    public Wechat findByOpenid(String openid) {
        return wechatMapper.selectByOpenid(openid);
    }
}
