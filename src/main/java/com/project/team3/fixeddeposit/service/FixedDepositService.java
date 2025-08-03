package com.project.team3.fixeddeposit.service;

import com.project.team3.fixeddeposit.model.FixedDepositRequest;
import com.project.team3.fixeddeposit.model.FixedDepositResult;
import com.project.team3.fixeddeposit.model.FixedDepositInvestment;
import com.project.team3.customer.model.Customer;

public interface FixedDepositService {
    // For public FD calculation (no persistence)
    FixedDepositResult calculateFixedDeposit(FixedDepositRequest request);

    // For logged-in customers investing in an FD (persists to DB)
    FixedDepositInvestment investFixedDeposit(FixedDepositRequest request, Customer customer);
}
