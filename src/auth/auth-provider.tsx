import { createContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { getToken, removeToken, setToken, isExpired } from "./token";

export interface IAuthProvider  { 
    children: React.ReactNode
 }

interface Auth {
    accessToken: string,
    is_authentificated: boolean
};

const AuthContext = createContext<{ auth?: Auth, signin?: (accessToken: string) => void, signout?: () => void }>({});
 
export const AuthProvider = ({ children }: IAuthProvider) => {
    const [auth, setAuth] = useState({accessToken: "", is_authentificated: false});
    
    useEffect(() => {
        const token = getToken();
        if (token !== null && isExpired(token.timeStamp)){
            setAuth({...auth, accessToken: token.value, is_authentificated: true});
        }
    }, [])
    
    const signin = (accessToken: string) => {
        setToken(accessToken);
        setAuth({...auth, accessToken: accessToken, is_authentificated: true});
    }

    const signout = () => {
        removeToken();
        setAuth({...auth, accessToken: '', is_authentificated: false});
        <Navigate to="/login" replace/>;
    }

    return (
        <AuthContext.Provider value={{ auth, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
 }
 
 export default AuthContext;