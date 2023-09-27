import React from 'react';
import { CheckboxProps } from './types';
import './checkbox.css';


export const Checkbox: React.FC<CheckboxProps>  = ({title, isChecked, changeChecked, className=''}) => {
    return (
        <div className={"check-item " + className}>
            <input type="checkbox" className="check-item__checkbox" id={title} checked={isChecked} onChange={changeChecked}/>
            <label className="check-item__label" htmlFor={title}>{title}</label>
        </div>
    )
}