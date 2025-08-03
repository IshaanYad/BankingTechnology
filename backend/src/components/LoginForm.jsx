// src/components/LoginForm.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CUSTOMER');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role }),
            });

            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const token = await response.text();

            if (!token || token.length < 20) {
                throw new Error('No valid token received');
            }

            localStorage.setItem('token', token);
            onLogin({ token, role });

        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div style={{
            maxWidth: 420,
            margin: '3rem auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
            borderRadius: 10,
            fontFamily: 'Segoe UI, sans-serif'
        }}>
            <h2 style={{ textAlign: 'center', color: '#343a40', marginBottom: '1.5rem' }}>Login</h2>

            <form onSubmit={handleSubmit}>

                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="role-select" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>User Type:</label>
                    <select
                        id="role-select"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: 4,
                            border: '1px solid #ced4da',
                            fontSize: 14
                        }}
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="BANK_MANAGER">Bank Manager</option>
                    </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter username"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: 4,
                            border: '1px solid #ced4da',
                            fontSize: 14
                        }}
                        required
                        autoComplete="username"
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: 4,
                            border: '1px solid #ced4da',
                            fontSize: 14
                        }}
                        required
                        autoComplete="current-password"
                    />
                </div>

                {error && (
                    <div style={{ color: '#dc3545', marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        fontSize: 16,
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Login
                </button>
            </form>

            <div style={{ marginTop: 20, textAlign: 'center' }}>
                <span>New customer? </span>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <button
                        style={{
                            marginTop: 8,
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Register
                    </button>
                </Link>
            </div>

            <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Link to="/fd-calculator" style={{ textDecoration: 'none' }}>
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#6f42c1',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Public FD Calculator
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;