package com.depoma.walle.dao;

import com.depoma.walle.entity.Wechat;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface WechatMapper {

    @Select("select * from wechat where openid=#{openid}")
    Wechat selectByOpenid(String openid);
}
