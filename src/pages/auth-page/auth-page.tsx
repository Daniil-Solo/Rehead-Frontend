import React, {ReactNode} from "react";
import './auth-page.css';

interface AuxProps {
    children: ReactNode
  }

export const AuthPage: React.FC<AuxProps> = ({children}) => {
    return (
        <div className="auth-page">
            <div className="auth-page__big_column">
            </div>
            <div className="auth-page__small_column auth-background">
                {children}
            </div>
        </div>
    )
}