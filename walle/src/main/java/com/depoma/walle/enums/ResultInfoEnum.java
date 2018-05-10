package com.depoma.walle.enums;

import lombok.Getter;

@Getter
public enum ResultInfoEnum {
    REQUEST_SUCCESSFULLY(200, "请求成功"),
    SERVER_INTERNAL_ERROR(500, "服务器内部错误");

    private Integer code;
    private String message;

    ResultInfoEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
