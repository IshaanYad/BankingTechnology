// src/components/RegisterForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CUSTOMER'); // default role selected
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic client-side validation
        if (!username.trim() || !email.trim() || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Simple email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Registration failed');
            }

            // Assume JSON response on success
            await response.json();

            setSuccess('Registration successful! Redirecting to login...');
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('CUSTOMER'); // Reset to default

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div style={{
            maxWidth: 440,
            margin: '3rem auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
            borderRadius: 10,
            fontFamily: 'Segoe UI, sans-serif'
        }}>
            <h2 style={{ textAlign: 'center', color: '#343a40', marginBottom: '1.5rem' }}>Register</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="role-select" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Register As:</label>
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
                    <label htmlFor="email" style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: 4,
                            border: '1px solid #ced4da',
                            fontSize: 14
                        }}
                        required
                        autoComplete="email"
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
                        autoComplete="new-password"
                    />
                </div>

                {error && (
                    <div style={{ color: '#dc3545', marginBottom: 16 }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{ color: '#28a745', marginBottom: 16 }}>
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        fontSize: 16,
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                    disabled={!!success}
                >
                    Register
                </button>
            </form>

            <div style={{ marginTop: 20, textAlign: 'center' }}>
                <span>Already have an account?</span>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <button
                        style={{
                            marginTop: 8,
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginLeft: 10
                        }}
                    >
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
