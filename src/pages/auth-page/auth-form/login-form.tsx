import React, {useRef, useEffect, useContext} from "react";
import {Link} from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import AuthContext from "../../../context/auth-provider";
import { runLogin } from "../../../api/auth";
import './auth-form.css';

export interface ILoginFields {
    login: string,
    password: string
}

export const LoginForm: React.FC = () => {
    const {register, handleSubmit, reset, formState: {errors}, setFocus} = useForm<ILoginFields>({mode: 'onChange'});
    const {setAuth} = useContext(AuthContext);

    useEffect(() => {
        setFocus('login');
    }, [])

    const onSubmit: SubmitHandler<ILoginFields> = async (data) => {
        try{
            const accessToken = await runLogin(data.login, data.password);
            if (setAuth !== undefined){
                setAuth({accessToken: accessToken});
            }
            reset();
        } catch (err){
            if (err instanceof Error){
                console.log(err.message)
            }
        }
    }

    return (
        <div className="login-form">
            <h2 className="login-form__title">Войдите</h2>
            <h4 className="login-form__subtitle">чтобы начать пользоваться</h4>
            <form className="login-form__form" onSubmit={handleSubmit(onSubmit)}>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="text" placeholder="Email" {...register('login', {
                        required: "Email является обязательным",
                        pattern: {
                            value:  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                            message: "Пожалуйста введите корректный email"
                        }
                    })}/>
                    <span className="form-input__error">{errors.login?.message}</span>
                </p>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="password" placeholder="Пароль" {...register('password', {
                        required: "Пароль является обязательным"
                    })}/>
                    <span className="form-input__error">{errors.password?.message}</span>
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