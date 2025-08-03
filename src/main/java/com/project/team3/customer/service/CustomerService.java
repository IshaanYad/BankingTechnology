package com.project.team3.customer.service;

import com.project.team3.customer.model.Customer;

// com.project.team3.customer.service.CustomerService
public interface CustomerService {
    Customer register(Customer customer);
    String login(String username, String password);
    Customer getCurrentCustomer();
}