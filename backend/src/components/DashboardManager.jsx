// src/components/DashboardManager.jsx

import React, { useEffect, useState } from 'react';

const DashboardManager = () => {
    const [customersData, setCustomersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            setError('');

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User not authenticated. Please login.');
                    setLoading(false);
                    return;
                }

                const response = await fetch('/api/manager/customers', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError('Unauthorized. Please login again.');
                    } else {
                        setError('Failed to fetch customer data.');
                    }
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                setCustomersData(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data from server.');
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return <div style={{ padding: 20 }}>Loading customers and investments...</div>;
    }

    if (error) {
        return <div style={{ padding: 20, color: 'red' }}>{error}</div>;
    }

    return (
        <div style={{
            maxWidth: 1000,
            margin: '3rem auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: 10,
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Segoe UI, sans-serif'
        }}>
            <h2 style={{ textAlign: 'center', color: '#007bff' }}>Bank Manager Dashboard</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>List of Customers and their Fixed Deposit Investments</p>

            {customersData.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No customers found.</p>
            ) : (
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: 20,
                    backgroundColor: 'white',
                    borderRadius: 6,
                    overflow: 'hidden',
                    boxShadow: '0 0 5px rgba(0,0,0,0.05)'
                }}>
                    <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Username</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Total Investment</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Investments Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersData.map((customer) => (
                            <tr key={customer.username} style={{ borderBottom: '1px solid #dee2e6' }}>
                                <td style={{ padding: '10px' }}>{customer.username}</td>
                                <td style={{ padding: '10px' }}>{customer.email}</td>
                                <td style={{ padding: '10px' }}>₹{customer.totalInvestment.toFixed(2)}</td>
                                <td style={{ padding: '10px' }}>
                                    {customer.investments && customer.investments.length > 0 ? (
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            marginTop: '10px',
                                            fontSize: '0.95em'
                                        }}>
                                            <thead style={{ backgroundColor: '#28a745', color: 'white' }}>
                                                <tr>
                                                    <th style={{ padding: '8px' }}>Amount (₹)</th>
                                                    <th style={{ padding: '8px' }}>Rate (%)</th>
                                                    <th style={{ padding: '8px' }}>Tenure (months)</th>
                                                    <th style={{ padding: '8px' }}>Maturity Amount (₹)</th>
                                                    <th style={{ padding: '8px' }}>Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {customer.investments.map((invest, index) => (
                                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f3f5' : 'white' }}>
                                                        <td style={{ padding: '8px' }}>{invest.principal.toFixed(2)}</td>
                                                        <td style={{ padding: '8px' }}>{invest.rate.toFixed(2)}</td>
                                                        <td style={{ padding: '8px' }}>{invest.tenureInMonths}</td>
                                                        <td style={{ padding: '8px' }}>{invest.maturityAmount.toFixed(2)}</td>
                                                        <td style={{ padding: '8px' }}>{new Date(invest.createdAt).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <em>No investments found</em>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DashboardManager;
