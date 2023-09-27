import React, {useEffect, useContext, useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import AuthContext from "../../../auth/auth-provider";
import { runLogin } from "../../../api/auth";
import { Loader } from "../../../components/loader/loader";
import './auth-form.css';
import { Button } from "../../../components/button/button";

export interface ILoginFields {
    login: string,
    password: string
}

export const LoginForm: React.FC = () => {
    const {register, handleSubmit, formState: {errors}, setFocus} = useForm<ILoginFields>({mode: 'onChange'});
    const {signin} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFocus('login');
    }, [])

    const onSubmit: SubmitHandler<ILoginFields> = async (data) => {
        setIsLoading(true);
        try{
            const accessToken = await runLogin(data.login, data.password);
            if (signin !== undefined){
                signin(accessToken);
                toast.success("Вход выполнен успешно");
                navigate("/");
            }
        } catch (err){
            if (err instanceof Error){
                toast.error(err.message);
            }
        }
        setIsLoading(false);
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
                <div className="login-form__submit submit">
                    {
                        isLoading
                        ? <Loader/>
                        : <Button title="Войти" className="submit__btn" isSubmit={true} />
                    }
                </div>
                <p className="login-form__text">
                    <span>Нет аккаунта? </span>
                    <Link to="/register" className="login-form__link">Зарегистрироваться</Link>
                </p>
            </form>
        </div>
    )
}