import {isAxiosError} from 'axios';
import axios from "./axios";

const LOGIN_URL = "/users/auth/login";
const LOGOUT_URL = "/users/auth/logout";
const REGISTER_URL = "/users/register";


export const runLogin = async (login: string, password: string): Promise<string> => {
    try {
        const params = new URLSearchParams();
        params.append('username', login);
        params.append('password', password);
        const response = await axios.post(
            LOGIN_URL,
            params,
            {
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded' 
                },
                withCredentials: true
            }
        )
        const accesToken = response.data.access_token;
        return accesToken;
    } catch (err){
        let message = "";
        if (!isAxiosError(err)) {
            message = "Нет ответа от сервера";
        } else if (err.response?.status === 400){
            if (err.response.data.detail === "LOGIN_BAD_CREDENTIALS"){
                message = "Неправильный логин или пароль"
            } else {
                message = "Пользователь заблокирован"
            }
        } else if (err.response?.status === 422){
            message = "Одно из полей не заполнено";
        } else {
            message = "Возникла ошибка на сервере";
        }
        throw Error(message);
    }
}

export const runRegister = async (login: string, password: string): Promise<string> => {
    try {
        await axios.post(
            REGISTER_URL,
            {
                email: login,
                password: password
            },
            {
                headers: { 
                    'Content-Type': 'application/json' 
                },
                withCredentials: true
            }
        )
        const accesToken = await runLogin(login, password);
        return accesToken;
    } catch (err){
        let message = "";
        if (!isAxiosError(err)) {
            message = "Нет ответа от сервера";
        } else if (err.response?.status === 400){
            if (err.response.data.detail === "REGISTER_USER_ALREADY_EXISTS"){
                message = "Пользователь с таким email уже существует"
            } else {
                message = "Слишком простой пароль"
            }
        } else if (err.response?.status === 422){
            message = "Одно из полей не заполнено";
        } else {
            message = "Возникла ошибка на сервере";
        }
        throw Error(message);
    }
}