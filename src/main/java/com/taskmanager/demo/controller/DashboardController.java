package com.taskmanager.demo.controller;

import com.taskmanager.demo.dto.DashboardResponse;
import com.taskmanager.demo.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboard() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return dashboardService.getDashboard(email);
    }
}
