// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || ''; // e.g., http://localhost:8080

// Helper to get JWT token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Helper to build headers with optional authorization
function getHeaders(withAuth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (withAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return headers;
}

// Register a new user (Customer)
export async function register({ username, email, password }) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed');
    }
    return response.json();
}

// Login user (Customer or Bank Manager)
export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
    }

    // Return JWT token as plain text (per your backend)
    const token = await response.text();
    return token;
}

// Fetch authenticated customer's dashboard data
export async function fetchCustomerDashboard() {
    const response = await fetch(`${API_BASE_URL}/api/customer/dashboard`, {
        method: 'GET',
        headers: getHeaders(true),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch customer dashboard');
    }
    return response.json();
}

// Fetch bank manager's customers and investments
export async function fetchManagerCustomers() {
    const response = await fetch(`${API_BASE_URL}/api/manager/customers`, {
        method: 'GET',
        headers: getHeaders(true),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch customers for manager');
    }
    return response.json();
}

// Public fixed deposit calculator call (no auth required)
export async function calculateFD({ principal, rate, tenureInMonths }) {
    const response = await fetch(`${API_BASE_URL}/api/fd/calculate`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ principal, rate, tenureInMonths }),
    });
    if (!response.ok) {
        throw new Error('FD calculation failed');
    }
    return response.json();
}

// Invest in fixed deposit (authenticated customer only)
export async function investFD({ principal, rate, tenureInMonths }) {
    const response = await fetch(`${API_BASE_URL}/api/fd/invest`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ principal, rate, tenureInMonths }),
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized - please login');
        }
        const errorText = await response.text();
        throw new Error(errorText || 'FD investment failed');
    }
    return response.json();
}

// Optional: helper to logout user (clear token)
export function logout() {
    localStorage.removeItem('token');
}

