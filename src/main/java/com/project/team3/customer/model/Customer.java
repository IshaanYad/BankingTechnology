// com.project.team3.customer.model.Customer.java
package com.project.team3.customer.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer {

    public enum Role {
        CUSTOMER, BANK_MANAGER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.CUSTOMER; // Default role is CUSTOMER

    // Optional: To fetch this customer's FDs if you want (bidirectional)
    // Uncomment if you add mappedBy in FixedDepositInvestment.customer
    // @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // private List<FixedDepositInvestment> investments;

    public Customer() {}

    public Customer(String username, String password, String email, Role role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    // Optional: Getter and Setter for investments (if you later want it)
    // public List<FixedDepositInvestment> getInvestments() {
    //     return investments;
    // }
    // public void setInvestments(List<FixedDepositInvestment> investments) {
    //     this.investments = investments;
    // }
}
