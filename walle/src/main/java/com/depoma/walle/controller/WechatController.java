package com.depoma.walle.controller;

import com.depoma.walle.constant.UriConstants;
import com.depoma.walle.entity.Wechat;
import com.depoma.walle.service.WechatService;
import com.depoma.walle.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UriConstants.WECHAT)
public class WechatController {

    @Autowired
    private WechatService wechatService;

    @RequestMapping(value = UriConstants.WECAHT_PROFILE, method = RequestMethod.GET)
    public Result<Wechat> wechatProfile(@RequestParam String openid) {

        Wechat wechat = wechatService.findByOpenid(openid);
        return Result.wrapSuccessfulResult(wechat);
    }
}