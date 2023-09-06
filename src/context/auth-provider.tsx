import { createContext, useState } from "react";

export interface IAuthProvider  { 
    children: React.ReactNode
 }

interface Auth {
    accessToken: string
};

const AuthContext = createContext<{ auth?: Auth, setAuth?: (auth: Auth) => void }>({ });
 
export const AuthProvider = ({ children }: IAuthProvider) => {
     const [auth, setAuth] = useState({accessToken: ""});
 
     return (
         <AuthContext.Provider value={{ auth, setAuth }}>
             {children}
         </AuthContext.Provider>
     )
 }
 
 export default AuthContext;