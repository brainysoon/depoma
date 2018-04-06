package com.icusin.walle.controller;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class HomeControllerTest {

    private HomeController homeController;

    public void setHomeController(HomeController homeController) {
        this.homeController = homeController;
    }

    @Before
    public void before() {

        this.setHomeController(new HomeController());
    }

    @Test
    public void homeTest() {

        Assert.assertEquals("Hello Walle!", homeController.home());
    }
}
