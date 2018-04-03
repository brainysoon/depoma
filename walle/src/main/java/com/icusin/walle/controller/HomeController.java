package com.icusin.walle.controller;

import com.icusin.walle.constant.UriConstants;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HomeController {

    @RequestMapping(UriConstants.HOME_RUI)
    public String home() {

        return "Hello Walle!";
    }
}
