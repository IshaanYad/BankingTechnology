package com.project.team3.customer.repository;

import com.project.team3.customer.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// com.project.team3.customer.repository.CustomerRepository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUsername(String username);
}
