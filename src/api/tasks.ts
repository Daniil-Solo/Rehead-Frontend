import {isAxiosError} from 'axios';
import axios from "./axios";

const GENERATE_CONTENT_URL = "/tasks/generate_content";
const CHECK_TASK_URL = "/tasks/check_status";
const GET_TASK_RESULT_URL = "/tasks/get_result";


interface TaskStatus{
    task_id: string,
    status: string
}
interface TaskResult{
    text: string,
    images: string[]
}


export const runGenerateContent = async (file: File, text: string, removeBackground: boolean, generateBackground: boolean): Promise<string> => {
    try {
        const params = new FormData();
        params.append('file', file);
        params.append('text', text);
        params.append('remove_background', removeBackground.toString());
        params.append('generate_background', generateBackground.toString());
        const response = await axios.post(
            GENERATE_CONTENT_URL,
            params,
            {
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                },
                withCredentials: true
            }
        )
        const task_id = response.data.task_id;
        return task_id;
    } catch (err){
        let message = "";
        if (!isAxiosError(err)) {
            message = "Нет ответа от сервера";
        } else if (err.response?.status === 422){
            message = "Заполнены не все обязательные поля";
        } else {
            message = "Возникла ошибка на сервере";
        }
        throw Error(message);
    }
}

export const runCheckingStatus = async (taskId: string): Promise<TaskStatus> => {
    try {
        const response = await axios.get(
            CHECK_TASK_URL,
            {
                params: {
                    task_id: taskId
                },
                withCredentials: true
            }
        )
        return response.data;
    } catch (err){
        let message = "";
        if (!isAxiosError(err)) {
            message = "Нет ответа от сервера";
        } else if (err.response?.status === 422){
            message = "Не передан идентификатор задачи";
        } else {
            message = "Возникла ошибка на сервере";
        }
        throw Error(message);
    }
}

export const runGetTaskResult = async (resultTaskId: string): Promise<TaskResult> => {
    try {
        const response = await axios.get(
            GET_TASK_RESULT_URL,
            {
                params: {
                    result_task_id: resultTaskId
                },
                withCredentials: true
            }
        )
        return response.data;
    } catch (err){
        let message = "";
        if (!isAxiosError(err)) {
            message = "Нет ответа от сервера";
        } else if (err.response?.status === 422){
            message = "Не передан идентификатор задачи";
        } else {
            message = "Возникла ошибка на сервере";
        }
        throw Error(message);
    }
}