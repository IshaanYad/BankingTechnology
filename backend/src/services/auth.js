// src/services/auth.js

// --- TOKEN MANAGEMENT ---

// Key used in localStorage
const TOKEN_KEY = 'token';

/**
 * Save JWT token to localStorage
 * @param {string} token
 */
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Get JWT token from localStorage
 * @returns {string|null} JWT token or null if none found
 */
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove JWT token from storage (logout)
 */
export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

// --- AUTHENTICATION CHECK ---

/**
 * Checks if user is logged in (token present and not expired)
 * @returns {boolean}
 */
export function isAuthenticated() {
    const token = getToken();
    if (!token) return false;

    const payload = parseJwt(token);
    if (!payload) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    // Token exp is in seconds since epoch
    return payload.exp && payload.exp > currentTime;
}

// --- JWT PARSING & UTILITIES ---

/**
 * Parses JWT token payload
 * @param {string} token - JWT token string
 * @returns {Object|null} Decoded JSON payload or null if error
 */
export function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1];
        const jsonPayload = atob(base64Payload);
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

/**
 * Get user role from JWT token
 * @returns {string|null} Role string (e.g. "CUSTOMER", "BANK_MANAGER") or null if unavailable
 */
export function getUserRole() {
    const token = getToken();
    const payload = token ? parseJwt(token) : null;

    if (payload && payload.role) {
        return payload.role;
    }

    // If your JWT does not include role claim, fetch from user profile API or decode differently
    return null;
}

// --- HEADER HELPERS ---

/**
 * Returns headers object with JSON content-type and Authorization header if token exists
 * @param {boolean} withAuth - If true, adds Authorization header
 * @returns {Object} Headers object
 */
export function getAuthHeaders(withAuth = false) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (withAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
}

// --- LOGOUT FUNCTION ---

/**
 * Logs out the user by clearing local storage token and optionally other cleanup
 */
export function logout() {
    clearToken();
    // Additional cleanup can be done here (e.g., clear app state)
}

