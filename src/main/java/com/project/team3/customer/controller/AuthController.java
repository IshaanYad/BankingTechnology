package com.project.team3.customer.controller;

import com.project.team3.customer.model.Customer;
import com.project.team3.customer.model.LoginRequest;
import com.project.team3.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// com.project.team3.customer.controller.AuthController
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public Customer register(@RequestBody Customer customer) {
        return customerService.register(customer);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest login) {
        return customerService.login(login.getUsername(), login.getPassword());
    }
}


