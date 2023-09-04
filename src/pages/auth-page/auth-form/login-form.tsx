import React from "react";
import {Link} from 'react-router-dom'
import './auth-form.css';

export const LoginForm: React.FC = () => {
    return (
        <div className="login-form">
            <h2 className="login-form__title">Войдите</h2>
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
                <button type="submit" className="login-form__submit btn">
                    Войти
                </button>
                <p className="login-form__text">
                    <span>Нет аккаунта? </span>
                    <Link to="/register">Зарегистрироваться</Link>
                </p>
            </form>
        </div>
    )
}