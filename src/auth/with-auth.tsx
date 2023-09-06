import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom'
import AuthContext from './auth-provider'

interface Props{
    children: ReactNode
}

export const WithAuth: React.FC<Props> = ({children}) => {
    const {auth} = useContext(AuthContext);
    if (auth?.is_authentificated){
        return <>{ children }</>
    } 
    return <Navigate to="/login" replace />
};
