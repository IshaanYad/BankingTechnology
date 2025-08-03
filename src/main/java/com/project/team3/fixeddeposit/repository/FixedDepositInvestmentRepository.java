package com.project.team3.fixeddeposit.repository;

import com.project.team3.fixeddeposit.model.FixedDepositInvestment;
import com.project.team3.customer.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FixedDepositInvestmentRepository extends JpaRepository<FixedDepositInvestment, Long> {
    List<FixedDepositInvestment> findByCustomer(Customer customer);
}
