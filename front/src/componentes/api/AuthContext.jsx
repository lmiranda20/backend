import { createContext, useState, useContext, } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    return localStorage.getItem("isAuthenticaded") === "true";
    });
    
    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthentiqued", "true");
    };
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthentiqued", "false");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
