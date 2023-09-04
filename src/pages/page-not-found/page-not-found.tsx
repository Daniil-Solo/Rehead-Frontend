import React from "react";
import './page-not-found.css';

export const PageNotFound: React.FC = () => {
    return (
        <div className="page-not-found">
            <h2 className="page-not-found__title">404</h2>
            <h4 className="page-not-found__subtitle">страница не найдена</h4>
        </div>
    )
}