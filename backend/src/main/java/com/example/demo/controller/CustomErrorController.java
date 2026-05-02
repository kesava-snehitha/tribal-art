package com.example.demo.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
        String uri = (String) request.getAttribute("jakarta.servlet.error.request_uri");
        if (uri != null && uri.startsWith("/api/")) {
            // Let API errors be handled naturally (or return a generic JSON error if you prefer)
            return null; // Spring will return standard 404 JSON response
        }
        return "forward:/index.html";
    }
}
