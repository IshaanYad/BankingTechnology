package com.project.team3.fixeddeposit.service;

import com.project.team3.fixeddeposit.model.FixedDepositRequest;
import com.project.team3.fixeddeposit.model.FixedDepositResult;
import com.project.team3.fixeddeposit.model.FixedDepositInvestment;
import com.project.team3.fixeddeposit.repository.FixedDepositInvestmentRepository;
import com.project.team3.customer.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FixedDepositServiceImpl implements FixedDepositService {

    @Autowired
    private FixedDepositInvestmentRepository fdInvestmentRepository;

    @Override
    public FixedDepositResult calculateFixedDeposit(FixedDepositRequest request) {
        double principal = request.getPrincipal();
        double rate = request.getRate();
        int months = request.getTenureInMonths();
        double n = 12.0;
        double year = months / 12.0;
        double maturity = principal * Math.pow(1 + (rate / (100 * n)), n * year);
        double interest = maturity - principal;
        return new FixedDepositResult(maturity, interest);
    }

    @Override
    public FixedDepositInvestment investFixedDeposit(FixedDepositRequest request, Customer customer) {
        // Calculate maturity and interest
        FixedDepositResult result = calculateFixedDeposit(request);

        // Create and populate the FD Investment entity
        FixedDepositInvestment investment = new FixedDepositInvestment();
        investment.setPrincipal(request.getPrincipal());
        investment.setRate(request.getRate());
        investment.setTenureInMonths(request.getTenureInMonths());
        investment.setMaturityAmount(result.getMaturityAmount());
        investment.setCreatedAt(LocalDateTime.now());
        investment.setCustomer(customer);

        // Save to DB
        return fdInvestmentRepository.save(investment);
    }
}
