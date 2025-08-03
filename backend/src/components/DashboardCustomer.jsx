// src/components/DashboardCustomer.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardCustomer = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            setError('');

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User not authenticated. Please login.');
                    setLoading(false);
                    return;
                }

                const response = await fetch('/api/customer/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError('Unauthorized. Please login again.');
                    } else {
                        setError('Failed to fetch dashboard data.');
                    }
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                setDashboardData(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching dashboard data.');
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const handleNavigateCalculator = () => {
        navigate('/fd-calculator');
    };

    const handleNavigateInvestment = () => {
        navigate('/fd-invest');
    };

    if (loading) {
        return <div style={{ padding: 20 }}>Loading dashboard...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: 20, color: 'red' }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: 600,
            margin: '3rem auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.08)',
            borderRadius: 10,
            fontFamily: 'Segoe UI, sans-serif',
        }}>
            <h2 style={{ textAlign: 'center', color: '#343a40', marginBottom: '1.5rem' }}>Customer Dashboard</h2>

            <div style={{ lineHeight: 1.6, color: '#212529', fontSize: 15 }}>
                <p><strong>Username:</strong> {dashboardData.username}</p>
                <p><strong>Email:</strong> {dashboardData.email}</p>
                <p>{dashboardData.welcomeMessage}</p>
            </div>

            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <button
                    onClick={handleNavigateCalculator}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: 5,
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: 14
                    }}
                >
                    Fixed Deposit Calculator
                </button>

                <button
                    onClick={handleNavigateInvestment}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: 5,
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: 14
                    }}
                >
                    Invest in Fixed Deposit
                </button>
            </div>
        </div>
    );
};

export default DashboardCustomer;