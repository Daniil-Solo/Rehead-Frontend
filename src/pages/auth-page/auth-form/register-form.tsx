import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import AuthContext from "../../../auth/auth-provider";
import { runRegister } from "../../../api/auth";
import { Loader } from "../../../components/loader/loader";
import { Button } from "../../../components/button/button";
import './auth-form.css';

export interface IRegisterFields {
    email: string,
    password: string,
    confirmPassword: string
}

export const RegisterForm: React.FC = () => {
    const {register, handleSubmit, formState: {errors}, setFocus, watch} = useForm<IRegisterFields>({mode: 'onChange'});
    const {signin} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFocus('email');
    }, [])

    const onSubmit: SubmitHandler<IRegisterFields> = async (data) => {
        setIsLoading(true);
        try{
            const accessToken = await runRegister(data.email, data.password);
            if (signin !== undefined){
                signin(accessToken);
                toast.success("Регистрация выполнена успешно");
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
            <h2 className="login-form__title">Создайте аккаунт</h2>
            <h4 className="login-form__subtitle">чтобы получить доступ</h4>
            <form className="login-form__form" onSubmit={handleSubmit(onSubmit)}>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="text" placeholder="Email" {...register('email', {
                        required: "Email является обязательным",
                        pattern: {
                            value:  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Пожалуйста введите корректный email"
                        }})} />
                    <span className="form-input__error">{errors.email?.message}</span>
                </p>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="password" placeholder="Пароль" {...register('password', {
                        required: "Пароль является обязательным"
                    })}/>
                    <span className="form-input__error">{errors.password?.message}</span>
                </p>
                <p className="login-form__item form-input">
                    <input className="form-input__input input" type="password" placeholder="Повтор пароля" {...register('confirmPassword', {
                        required: "Пароль является обязательным",
                        validate: (val: string) => {
                            if (watch('password') != val) {
                              return "Пароли должны совпадать";
                            }
                          },
                    })}/>
                    <span className="form-input__error">{errors.confirmPassword?.message}</span>
                </p>
                <div className="login-form__submit submit">
                    {
                        isLoading
                        ? <Loader/>
                        : <Button title="Создать аккаунт" className="submit__btn" isSubmit={true} />
                    }
                </div>
                <p className="login-form__text">
                    <span>Уже есть аккаунт? </span> 
                    <Link to="/login" className="login-form__link">Войти</Link>
                </p>
            </form>
        </div>
    )
}