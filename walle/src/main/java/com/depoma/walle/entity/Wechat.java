package com.depoma.walle.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Wechat {

    private Integer id;
    private String openid;
    private String nickname;
    private Byte sex;
    private String lang;
    private String city;
    private String country;
    private String province;
    private String avatar;
    private Date gmtCreate;
    private Date gmtModified;
    private Byte state;
}
