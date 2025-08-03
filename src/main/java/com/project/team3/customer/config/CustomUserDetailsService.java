package com.project.team3.customer.config;

import com.project.team3.customer.model.Customer;
import com.project.team3.customer.repository.CustomerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final CustomerRepository customerRepository;

    public CustomUserDetailsService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Map the customer's role to a Spring Security authority (e.g. ROLE_CUSTOMER or ROLE_BANK_MANAGER)
        String authority = "ROLE_" + customer.getRole().name();

        // Return a User object with authorities
        return new User(
                customer.getUsername(),
                customer.getPassword(),
                List.of(new SimpleGrantedAuthority(authority))
        );
    }
}
