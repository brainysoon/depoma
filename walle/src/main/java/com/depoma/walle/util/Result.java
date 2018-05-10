package com.depoma.walle.util;

import com.depoma.walle.enums.ResultInfoEnum;
import lombok.Data;

import java.io.Serializable;

@Data
public class Result<T> implements Serializable {

    private static final long serialVersionUID = 6110065893706471853L;

    private Integer code;

    private String message;

    private T data;

    public static <T> Result<T> wrapSuccessfulResult(T data) {
        return wrapResult(ResultInfoEnum.REQUEST_SUCCESSFULLY, data);
    }

    public static <T> Result<T> wrapResult(Integer code, String message, T data) {
        Result<T> result = new Result<>();
        result.code = code;
        result.message = message;
        result.data = data;
        return result;
    }

    public static <T> Result<T> wrapResult(Integer code, String message) {
        Result<T> result = new Result<>();
        result.code = code;
        result.message = message;
        return result;
    }

    public static <S> Result<S> wrapResult(Result<?> otherResult) {
        Result<S> result = new Result<>();
        result.code = otherResult.getCode();
        result.message = otherResult.getMessage();
        return result;
    }

    public static <T> Result<T> wrapResult(ResultInfoEnum resultInfoEnum) {
        Result<T> result = new Result<>();
        result.code = resultInfoEnum.getCode();
        result.message = resultInfoEnum.getMessage();
        return result;
    }

    public static <T> Result<T> wrapResult(ResultInfoEnum resultInfoEnum, T data) {
        Result<T> result = new Result<>();
        result.code = resultInfoEnum.getCode();
        result.message = resultInfoEnum.getMessage();
        result.data = data;
        return result;
    }

}