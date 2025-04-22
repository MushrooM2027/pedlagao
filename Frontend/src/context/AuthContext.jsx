import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null; // Check before parsing
    });

    const login = (userData) => {
        if (!userData) {
            console.error('Invalid user data:', userData);
            alert('Login failed: Invalid user data');
            return;
        }
        // console.log('User data being stored:', userData); // Debug log
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        alert('Successfully Logged out');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);