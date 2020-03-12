package com.testTask.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping({"/{pageName}"})
@Slf4j
public class PageController {

    private Map<String,String> mapping;

    @PostConstruct
    private void init() {
        mapping = new HashMap<>();

        mapping.put("main", "index");
        mapping.put("gre", "greeting");
    }

    @GetMapping
    public String getPage(@PathVariable("pageName") String pageName){
        log.info("return page "+pageName);
        return mapping.getOrDefault(pageName,"error");
    }

}
