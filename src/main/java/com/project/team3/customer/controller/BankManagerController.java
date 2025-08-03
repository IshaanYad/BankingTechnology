package com.project.team3.customer.controller;

import com.project.team3.customer.model.Customer;
import com.project.team3.customer.repository.CustomerRepository;
import com.project.team3.fixeddeposit.model.FixedDepositInvestment;
import com.project.team3.fixeddeposit.repository.FixedDepositInvestmentRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manager")
@PreAuthorize("hasRole('BANK_MANAGER')")
public class BankManagerController {

    private final CustomerRepository customerRepository;
    private final FixedDepositInvestmentRepository fdInvestmentRepository;

    public BankManagerController(CustomerRepository customerRepository, FixedDepositInvestmentRepository fdInvestmentRepository) {
        this.customerRepository = customerRepository;
        this.fdInvestmentRepository = fdInvestmentRepository;
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Map<String, Object>>> getCustomersWithInvestments() {
        List<Customer> customers = customerRepository.findAll();

        List<Map<String, Object>> customersData = customers.stream().map(customer -> {
            List<FixedDepositInvestment> investments = fdInvestmentRepository.findByCustomer(customer);

            double totalInvestment = investments.stream()
                    .mapToDouble(FixedDepositInvestment::getPrincipal)
                    .sum();

            Map<String, Object> map = new HashMap<>();
            map.put("username", customer.getUsername());
            map.put("email", customer.getEmail());
            map.put("totalInvestment", totalInvestment);
            map.put("investments", investments);
            return map;
        }).toList();

        return ResponseEntity.ok(customersData);
    }
}
