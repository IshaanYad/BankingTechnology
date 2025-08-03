package com.project.team3.fixeddeposit.model;

public class FixedDepositRequest {
    private double principal;
    private double rate;
    private int tenureInMonths;

    public FixedDepositRequest() {
    }

    public FixedDepositRequest(double principal, double rate, int tenureInMonths) {
        this.principal = principal;
        this.rate = rate;
        this.tenureInMonths = tenureInMonths;
    }

    public double getPrincipal() {
        return principal;
    }

    public void setPrincipal(double principal) {
        this.principal = principal;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public int getTenureInMonths() {
        return tenureInMonths;
    }

    public void setTenureInMonths(int tenureInMonths) {
        this.tenureInMonths = tenureInMonths;
    }
}
