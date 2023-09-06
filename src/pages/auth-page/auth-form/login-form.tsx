import React, {useEffect, useContext} from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import AuthContext from "../../../auth/auth-provider";
import { runLogin } from "../../../api/auth";
import './auth-form.css';

export interface ILoginFields {
    login: string,
    password: string
}

export const LoginForm: React.FC = () => {
    const {register, handleSubmit, reset, formState: {errors}, setFocus} = useForm<ILoginFields>({mode: 'onChange'});
    const {signin} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setFocus('login');
    }, [])

    const onSubmit: SubmitHandler<ILoginFields> = async (data) => {
        try{
            const accessToken = await runLogin(data.login, data.password);
            if (signin !== undefined){
                signin(accessToken);
                navigate("/");
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
                            value:  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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