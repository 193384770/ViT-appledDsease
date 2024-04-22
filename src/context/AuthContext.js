import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // 检查 localStorage 中是否有 token 来决定用户是否认证
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
    }, []);

    const login = (token, email) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('userEmail', email);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userEmail');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
