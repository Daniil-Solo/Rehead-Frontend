import React from "react";
import {Link} from 'react-router-dom'
import './auth-form.css';

export const RegisterForm: React.FC = () => {
    return (
        <div className="login-form">
            <h2 className="login-form__title">Создайте аккаунт</h2>
            <h4 className="login-form__subtitle">чтобы получить доступ</h4>
            <form className="login-form__form">
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="text" placeholder="Логин" />
                    <span className="form-input__error"></span>
                </p>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="password" placeholder="Пароль" />
                    <span className="form-input__error"></span>
                </p>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="password" placeholder="Повтор пароля" />
                    <span className="form-input__error"></span>
                </p>
                <button type="submit" className="login-form__submit btn">
                    Создать аккаунт
                </button>
                <p className="login-form__text">
                    <span>Уже есть аккаунт? </span> 
                    <Link to="/login">Войти</Link>
                </p>
            </form>
        </div>
    )
}