package com.project.team3.fixeddeposit.controller;

import com.project.team3.fixeddeposit.model.FixedDepositInvestment;
import com.project.team3.fixeddeposit.model.FixedDepositRequest;
import com.project.team3.fixeddeposit.model.FixedDepositResult;
import com.project.team3.fixeddeposit.service.FixedDepositService;
import com.project.team3.customer.model.Customer;
import com.project.team3.customer.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fd")
public class FixedDepositController {

    @Autowired
    private FixedDepositService fixedDepositService;

    @Autowired
    private CustomerService customerService;

    @PostMapping("/calculate")
    public FixedDepositResult calculateFD(@RequestBody FixedDepositRequest request) {
        return fixedDepositService.calculateFixedDeposit(request);
    }

    @PostMapping("/invest")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<FixedDepositInvestment> investFD(@RequestBody FixedDepositRequest request) {
        Customer currentCustomer = customerService.getCurrentCustomer();
        FixedDepositInvestment investment = fixedDepositService.investFixedDeposit(request, currentCustomer);
        return ResponseEntity.ok(investment);
    }
}
