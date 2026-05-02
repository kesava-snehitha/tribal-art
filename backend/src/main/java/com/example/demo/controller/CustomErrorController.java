package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController {

    // Forward all paths that do not contain a period (like .js or .css) to index.html
    // Exclude /api paths so they return 404 instead of index.html
    @RequestMapping(value = {
        "/{path:[^\\.]*}", 
        "/**/{path:^(?!api|error).*$}/{subpath:[^\\.]*}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}

