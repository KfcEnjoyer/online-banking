import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        token: localStorage.getItem('token') || null,
        user: null,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const response = await axios.get('http://127.0.0.1:3001/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.status === 200) {
                        setAuthData({token, user: response.data});
                    } else {
                        console.log('Failed to fetch user data, invalid token');
                        localStorage.removeItem('token');
                        setAuthData({token: null, user: null});
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    localStorage.removeItem('token');
                    setAuthData({token: null, user: null});
                }
            }
        };

        fetchUserData();
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        setAuthData({ token, user });
    };

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
