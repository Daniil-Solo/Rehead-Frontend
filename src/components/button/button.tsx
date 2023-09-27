import React from 'react';
import { ButtonProps } from './types';
import './button.css';


export const Button: React.FC<ButtonProps>  = ({title, onClick, isSubmit=false, className=''}) => {
    return (
        <button type={isSubmit? 'submit': 'button'} className={'btn ' + className} onClick={onClick}>
            {title}
        </button>
    )
}