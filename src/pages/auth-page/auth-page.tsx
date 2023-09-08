import React, {ReactNode} from "react";
import './auth-page.css';

interface AuxProps {
    children: ReactNode
  }

export const AuthPage: React.FC<AuxProps> = ({children}) => {
    return (
        <div className="auth-page background">
            <div className="background-image" style={{backgroundImage: 'url(images/stars.jpg)'}}></div>
            <div className="auth-page__form">
                {children}
            </div>
        </div>
    )
}