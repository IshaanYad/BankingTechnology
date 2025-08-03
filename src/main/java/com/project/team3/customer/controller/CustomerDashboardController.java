package com.project.team3.customer.controller;

import com.project.team3.customer.model.Customer;
import com.project.team3.customer.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

// Controller for customer dashboard endpoints
@RestController
@RequestMapping("/api/customer")
public class CustomerDashboardController {

    private final CustomerService customerService;

    @Autowired
    public CustomerDashboardController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        // Get currently authenticated customer details
        Customer currentCustomer = customerService.getCurrentCustomer();

        // Prepare some sample dashboard data
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("username", currentCustomer.getUsername());
        dashboardData.put("email", currentCustomer.getEmail());
        dashboardData.put("welcomeMessage", "Welcome to your dashboard, " + currentCustomer.getUsername() + "!");
        dashboardData.put("fixedDepositCalculatorUrl", "/api/fd/calculate");

        // You can add other dashboard data/cards here as needed

        return ResponseEntity.ok(dashboardData);
    }
}
