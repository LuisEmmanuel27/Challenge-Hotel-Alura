import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setisAuthenticated(true);
        setUser(userData);
    }

    const logout = () => {
        setisAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}