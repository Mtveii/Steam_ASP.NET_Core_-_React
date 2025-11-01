/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const BACKEND_URL = 'https://localhost:7129';
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
                credentials: 'include'
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.user) {
                    const user = {
                        ...result.user,
                        isAdmin: result.user.isAdmin === true || result.user.isAdmin === "True" || result.user.isAdmin === "true"
                    };
                    setCurrentUser(user);
                }
            }
        } catch (error) {
            console.log('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success && result.user) {
                const user = {
                    ...result.user,
                    isAdmin: result.user.isAdmin === true || result.user.isAdmin === "True" || result.user.isAdmin === "true"
                };
                setCurrentUser(user);
                return { success: true, user };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    };

    const register = async (username, email, password, photo = "User.png") => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, photo }),
                credentials: 'include'
            });

            const data = await res.json();

            if (data.success && data.user) {
                const user = {
                    ...data.user,
                    isAdmin: data.user.isAdmin === true || data.user.isAdmin === "True" || data.user.isAdmin === "true"
                };
                setCurrentUser(user);
                return { success: true, user };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    };

    const logout = async () => {
        try {
            await fetch(`${BACKEND_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.log('Logout error:', error);
        } finally {
            setCurrentUser(null);
        }
    };

    const isAdmin = () => currentUser?.isAdmin === true;

    const value = { currentUser, login, register, logout, isAdmin };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
