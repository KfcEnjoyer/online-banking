import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        token: localStorage.getItem('token') || null,
        user: null,
    });

    // On initial load, check if token is valid and fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    // Decode the token and check expiration
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000; // Current time in seconds

                    // If token is expired, remove from localStorage and set authData to null
                    if (decodedToken.exp < currentTime) {
                        console.log('Token expired');
                        localStorage.removeItem('token');
                        setAuthData({ token: null, user: null });
                        return;
                    }

                    // If token is still valid, fetch user data
                    const response = await fetch('http://localhost:3001/profile', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const user = await response.json();
                        setAuthData({ token, user });
                    } else {
                        console.log('Failed to fetch user data, invalid token');
                        localStorage.removeItem('token');
                        setAuthData({ token: null, user: null });
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                    setAuthData({ token: null, user: null });
                }
            }
        };

        fetchUserData();
    }, []); // Empty dependency array ensures this runs only on page load

    // Login function
    const login = (token, user) => {
        localStorage.setItem('token', token);
        setAuthData({ token, user });
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setAuthData({ token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
