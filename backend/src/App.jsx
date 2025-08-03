// src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DashboardCustomer from './components/DashboardCustomer';
import DashboardManager from './components/DashboardManager';
import FDCalculator from './components/FDCalculator';
import FDInvestForm from './components/FDInvestForm';

import { parseJwt, clearToken, getToken, isAuthenticated } from './services/auth';

const App = () => {
    const inactivityTimerRef = useRef(null);

    const resetInactivityTimer = () => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            logout(); // Auto logout after 2 minutes of inactivity
        }, 2 * 60 * 1000); // 2 minutes
    };
    const navigate = useNavigate();

    const [auth, setAuth] = useState({
        token: getToken(),
        role: null,
    });

    // On mount, decode token and set role
    useEffect(() => {
        if (auth.token) {
            const payload = parseJwt(auth.token);
            if (payload && payload.role) {
                setAuth((prev) => ({ ...prev, role: payload.role }));
            } else {
                logout();
            }
        }
    }, [auth.token]);

    useEffect(() => {
        if (auth.token) {
            const events = ['mousemove', 'keydown', 'click', 'scroll'];
            events.forEach(event =>
                window.addEventListener(event, resetInactivityTimer)
            );
            resetInactivityTimer();

            return () => {
                events.forEach(event =>
                    window.removeEventListener(event, resetInactivityTimer)
                );
                if (inactivityTimerRef.current) {
                    clearTimeout(inactivityTimerRef.current);
                }
            };
        }
    }, [auth.token]);

    const logout = () => {
        clearToken();
        setAuth({ token: null, role: null });
        navigate('/login');
    };

    const handleLogin = ({ token }) => {
        localStorage.setItem('token', token);
        const payload = parseJwt(token);
        const role = payload?.role ?? null;
        setAuth({ token, role });

        if (role === 'BANK_MANAGER') {
            navigate('/manager-dashboard');
        } else if (role === 'CUSTOMER') {
            navigate('/customer-dashboard');
        } else {
            logout();
        }
    };

    const ProtectedRoute = ({ children, allowedRoles }) => {
        if (!isAuthenticated() || !auth.role) {
            return <Navigate to="/login" replace />;
        }
        if (!allowedRoles.includes(auth.role)) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/fd-calculator" element={<FDCalculator />} />

                {/* Customer Routes */}
                <Route
                    path="/customer-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['CUSTOMER']}>
                            <DashboardCustomer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/fd-invest"
                    element={
                        <ProtectedRoute allowedRoles={['CUSTOMER']}>
                            <FDInvestForm />
                        </ProtectedRoute>
                    }
                />

                {/* Manager Routes */}
                <Route
                    path="/manager-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['BANK_MANAGER']}>
                            <DashboardManager />
                        </ProtectedRoute>
                    }
                />

                {/* Root Redirect */}
                <Route
                    path="/"
                    element={
                        isAuthenticated() && auth.role ? (
                            auth.role === 'BANK_MANAGER' ? (
                                <Navigate to="/manager-dashboard" replace />
                            ) : (
                                <Navigate to="/customer-dashboard" replace />
                            )
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            {/* Optional: Logout */}
            {auth.token && (
                <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
                    <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            )}
        </>
    );
};

export default App;