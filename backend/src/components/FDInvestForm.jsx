// src/components/FDInvestForm.jsx

import React, { useState } from 'react';

const FDInvestForm = () => {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [tenureInMonths, setTenureInMonths] = useState('');
    const [investment, setInvestment] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInvest = async (e) => {
        e.preventDefault();
        setError('');
        setInvestment(null);

        if (
            principal === '' ||
            rate === '' ||
            tenureInMonths === '' ||
            isNaN(principal) ||
            isNaN(rate) ||
            isNaN(tenureInMonths) ||
            principal <= 0 ||
            rate <= 0 ||
            tenureInMonths <= 0
        ) {
            setError('Please enter valid positive numbers for all fields.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to invest in a fixed deposit.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/fd/invest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    principal: parseFloat(principal),
                    rate: parseFloat(rate),
                    tenureInMonths: parseInt(tenureInMonths, 10),
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Unauthorized. Please login again.');
                } else {
                    const errorText = await response.text();
                    setError(errorText || 'Failed to invest in fixed deposit.');
                }
                setLoading(false);
                return;
            }

            const data = await response.json();
            setInvestment(data);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'An error occurred while investing.');
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: 500,
        margin: '3rem auto',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        boxShadow: '0 0 12px rgba(0, 0, 0, 0.08)',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#212529',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: 6,
        fontWeight: '600',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        marginBottom: '1rem',
        borderRadius: 6,
        border: '2px solid #007bff',
        fontSize: '1em',
        fontFamily: 'inherit',
        outline: 'none',
    };

    const buttonStyle = {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: 6,
        cursor: loading ? 'not-allowed' : 'pointer',
        fontWeight: '600',
        fontSize: '1em',
        width: '100%',
    };

    const resultBoxStyle = {
        marginTop: '2rem',
        padding: '1rem 1.5rem',
        backgroundColor: '#e9ecef',
        borderRadius: 8,
        fontSize: '1.05em',
        fontWeight: '500',
        color: '#212529',
    };

    const errorStyle = {
        color: 'red',
        marginBottom: '1rem',
        textAlign: 'center',
        fontWeight: '500',
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '1.5rem' }}>
                Invest in Fixed Deposit
            </h2>

            <form onSubmit={handleInvest}>
                <label htmlFor="principal" style={labelStyle}>Principal Amount (₹)</label>
                <input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={e => setPrincipal(e.target.value)}
                    placeholder="Enter principal amount"
                    style={inputStyle}
                    min="0"
                    step="any"
                    required
                />

                <label htmlFor="rate" style={labelStyle}>Interest Rate (% per annum)</label>
                <input
                    id="rate"
                    type="number"
                    value={rate}
                    onChange={e => setRate(e.target.value)}
                    placeholder="Enter interest rate"
                    style={inputStyle}
                    min="0"
                    step="any"
                    required
                />

                <label htmlFor="tenure" style={labelStyle}>Tenure (Months)</label>
                <input
                    id="tenure"
                    type="number"
                    value={tenureInMonths}
                    onChange={e => setTenureInMonths(e.target.value)}
                    placeholder="Enter tenure in months"
                    style={inputStyle}
                    min="1"
                    required
                />

                {error && <div style={errorStyle}>{error}</div>}

                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? 'Investing...' : 'Invest'}
                </button>
            </form>

            {investment && (
                <div style={resultBoxStyle}>
                    <h3 style={{ color: '#28a745' }}>Investment Successful!</h3>
                    <p><strong>Principal:</strong> ₹{investment.principal.toFixed(2)}</p>
                    <p><strong>Interest Rate:</strong> {investment.rate.toFixed(2)}%</p>
                    <p><strong>Tenure:</strong> {investment.tenureInMonths} months</p>
                    <p><strong>Maturity Amount:</strong> ₹{investment.maturityAmount.toFixed(2)}</p>
                    <p><strong>Invested On:</strong> {new Date(investment.createdAt).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default FDInvestForm;
