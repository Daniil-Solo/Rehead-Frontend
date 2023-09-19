import {isAxiosError} from 'axios';
import axios from "./axios";

const GENERATE_CONTENT_URL = "/tasks/generate_content";
const CHECK_TASK_URL = "/tasks/check_status";
const GET_DESCRIPTION_RESULT_URL = "/tasks/get_description_result";
const GET_IMAGES_RESULT_URL = "/tasks/get_images_result";

export interface TaskInfo{
    celery_image_task_id: string,
    celery_description_task_id: string,
    db_task_id: string
}
interface TaskStatus{
    status: string
}
interface TaskDescriptionResult{
    text: string
}
interface TaskImagesResult{
    images: string[]
}


export const runGenerateContent = async (file: File, text: string, removeBackground: boolean, generateBackground: boolean): Promise<TaskInfo> => {
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
        return response.data;
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

export const runGetDescriptionResult = async (resultTaskId: string): Promise<TaskDescriptionResult> => {
    try {
        const response = await axios.get(
            GET_DESCRIPTION_RESULT_URL,
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

export const runGetImagesResult = async (resultTaskId: string): Promise<TaskImagesResult> => {
    try {
        const response = await axios.get(
            GET_IMAGES_RESULT_URL,
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