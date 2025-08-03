package com.project.team3.customer.service;

import com.project.team3.customer.model.Customer;
import com.project.team3.customer.model.Customer.Role;
import com.project.team3.customer.repository.CustomerRepository;
import com.project.team3.customer.config.JwtProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Customer register(Customer customer) {
        // Check if username or email already exists
        if (customerRepository.findByUsername(customer.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken");
        }
        if (customerRepository.findAll()
                .stream()
                .anyMatch(c -> c.getEmail().equalsIgnoreCase(customer.getEmail()))) {
            throw new RuntimeException("Email is already taken");
        }

        // Set default role if not provided (prevents null role)
        if (customer.getRole() == null) {
            customer.setRole(Role.CUSTOMER);
        }

        // Hash the password before saving
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));

        return customerRepository.save(customer);
    }

    @Override
    public String login(String username, String password) {
        try {
            // Authenticate user credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Fetch the user's role
            Optional<Customer> customerOpt = customerRepository.findByUsername(username);
            if (customerOpt.isEmpty()) {
                throw new RuntimeException("User not found");
            }
            Role role = customerOpt.get().getRole();

            // Generate JWT token with username and role
            return jwtProvider.generateToken(username, role.name());

        } catch (Exception e) {
            throw new RuntimeException("Invalid username or password");
        }
    }

    @Override
    public Customer getCurrentCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authenticated user found");
        }

        String username = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByUsername(username);
        if (customerOpt.isPresent()) {
            return customerOpt.get();
        } else {
            throw new RuntimeException("User not found");
        }
    }
}