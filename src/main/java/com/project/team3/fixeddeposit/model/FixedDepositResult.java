package com.project.team3.fixeddeposit.model;

public class FixedDepositResult {
    private double maturityAmount;
    private double interestEarned;

    public FixedDepositResult() {
    }

    public FixedDepositResult(double maturityAmount, double interestEarned) {
        this.maturityAmount = maturityAmount;
        this.interestEarned = interestEarned;
    }

    public double getMaturityAmount() {
        return maturityAmount;
    }

    public void setMaturityAmount(double maturityAmount) {
        this.maturityAmount = maturityAmount;
    }

    public double getInterestEarned() {
        return interestEarned;
    }

    public void setInterestEarned(double interestEarned) {
        this.interestEarned = interestEarned;
    }
}
