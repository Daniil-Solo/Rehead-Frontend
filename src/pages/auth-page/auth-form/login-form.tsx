import React, {useRef, useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import './auth-form.css';

export const LoginForm: React.FC = () => {
    const loginRef = useRef<HTMLInputElement>(null);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (loginRef !== null && loginRef.current !== null){
            loginRef.current.focus();
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className="login-form">
            <h2 className="login-form__title">Войдите</h2>
            <h4 className="login-form__subtitle">чтобы начать пользоваться</h4>
            <form className="login-form__form" onSubmit={handleSubmit}>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="text" placeholder="Email" required ref={loginRef} value={login} onChange={(e) => setLogin(e.target.value)}/>
                    <span className="form-input__error"></span>
                </p>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="password" placeholder="Пароль" required value={password} onChange={(e) => setPassword(e.target.value)}/>
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