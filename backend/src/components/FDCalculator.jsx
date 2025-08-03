// src/components/FDCalculator.jsx

import React, { useState } from 'react';

const FDCalculator = () => {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [tenureInMonths, setTenureInMonths] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCalculate = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);

        // Basic validation
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

        setLoading(true);

        try {
            const response = await fetch('/api/fd/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    principal: parseFloat(principal),
                    rate: parseFloat(rate),
                    tenureInMonths: parseInt(tenureInMonths, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to calculate fixed deposit.');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'Error occurred during calculation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: 400,
                margin: '2rem auto',
                padding: '1.5rem 2rem',
                border: '2px solid #007bff',
                borderRadius: 10,
                backgroundColor: '#f9faff',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#333',
                boxShadow: '0 4px 8px rgba(0, 123, 255, 0.1)',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: 24, fontWeight: '600', color: '#007bff' }}>Fixed Deposit Calculator</h2>

            <form onSubmit={handleCalculate}>
                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="principal" style={{ display: 'block', marginBottom: 6, fontWeight: '500' }}>
                        Principal Amount (₹):
                    </label>
                    <input
                        id="principal"
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="Enter principal amount"
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            boxSizing: 'border-box',
                            border: '1.5px solid #007bff',
                            borderRadius: 6,
                            fontSize: 16,
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            color: '#333',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        min="0"
                        step="any"
                        required
                        onFocus={e => e.target.style.borderColor = '#0056b3'}
                        onBlur={e => e.target.style.borderColor = '#007bff'}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="rate" style={{ display: 'block', marginBottom: 6, fontWeight: '500' }}>
                        Interest Rate (% per annum):
                    </label>
                    <input
                        id="rate"
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="Enter interest rate"
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            boxSizing: 'border-box',
                            border: '1.5px solid #007bff',
                            borderRadius: 6,
                            fontSize: 16,
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            color: '#333',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        min="0"
                        step="any"
                        required
                        onFocus={e => e.target.style.borderColor = '#0056b3'}
                        onBlur={e => e.target.style.borderColor = '#007bff'}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="tenure" style={{ display: 'block', marginBottom: 6, fontWeight: '500' }}>
                        Tenure (Months):
                    </label>
                    <input
                        id="tenure"
                        type="number"
                        value={tenureInMonths}
                        onChange={(e) => setTenureInMonths(e.target.value)}
                        placeholder="Enter tenure in months"
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            boxSizing: 'border-box',
                            border: '1.5px solid #007bff',
                            borderRadius: 6,
                            fontSize: 16,
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            color: '#333',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        min="1"
                        required
                        onFocus={e => e.target.style.borderColor = '#0056b3'}
                        onBlur={e => e.target.style.borderColor = '#007bff'}
                    />
                </div>

                {error && (
                    <div style={{ color: '#dc3545', marginBottom: 16, fontWeight: '600', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px 0',
                        backgroundColor: '#007bff',
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '600',
                        border: 'none',
                        borderRadius: 6,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: loading ? 'none' : '0 4px 8px rgba(0,123,255,0.3)',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={e => !loading && (e.target.style.backgroundColor = '#0056b3')}
                    onMouseLeave={e => !loading && (e.target.style.backgroundColor = '#007bff')}
                >
                    {loading ? 'Calculating...' : 'Calculate'}
                </button>
            </form>

            {result && (
                <div
                    style={{
                        marginTop: 24,
                        padding: 16,
                        backgroundColor: '#e2f0ff',
                        borderRadius: 8,
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        color: '#004085',
                        boxShadow: '0 2px 6px rgba(0, 123, 255, 0.15)',
                        textAlign: 'center',
                    }}
                >
                    <h3 style={{ marginBottom: 12, fontWeight: '600' }}>Results</h3>
                    <p style={{ margin: '8px 0', fontSize: 18 }}>
                        <strong>Maturity Amount:</strong> ₹{result.maturityAmount.toFixed(2)}
                    </p>
                    <p style={{ margin: '8px 0', fontSize: 18 }}>
                        <strong>Interest Earned:</strong> ₹{result.interestEarned.toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FDCalculator;
