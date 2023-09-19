import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/auth-provider";
import { runLogout } from "../../api/auth";
import Carousel from "nuka-carousel";
import { toast } from 'react-toastify';
import { runGenerateContent, runCheckingStatus, runGetDescriptionResult, runGetImagesResult, TaskInfo } from './../../api/tasks'
import { Loader } from "../../components/loader/loader";
import './content-generation-page.css';

export const ContentGenerationPage: React.FC = () => {
    const { signout, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const textInput = useRef<HTMLTextAreaElement>(null); 
    const fileInput = useRef<HTMLInputElement>(null); 
    const [imageSrc, setImageSrc] = useState('images/placeholder.jpg');
    const [text, setText] = useState("");
    const [removeBackground, setRemoveBackground] = useState(false);
    const [generateBackground, setGenerateBackground] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [taskInfo, setTaskInfo] = useState<TaskInfo|null>(null);
    const [imagesRetryNumber, setImagesRetryNumber] = useState(0);
    const [descriptionRetryNumber, setDescriptionRetryNumber] = useState(0);
    const [isReadyResult, setIsReadyResult] = useState(false);
    const [generatedText, setGeneratedText] = useState("");
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);

    useEffect(() => {
        textInput.current?.focus();
    }, [])

    const handleLogout = async () => {
        try{
            if (auth?.accessToken){
                await runLogout(auth.accessToken);
                if (signout !== undefined){
                    signout();
                    toast.success("Выход выполнен успешно");
                    navigate("/");
                }
            }
        } catch (err){
            if (err instanceof Error){
                toast.error(err.message);
            }
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        toast.info("Текст скопирован")
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        try{
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        } catch(err){
            console.log(err);
        }
    }

    const selectImage = () => {
        fileInput.current?.click()
    }

    const startGeneration = async () => {
        if (fileInput.current === null || fileInput.current.files === null || fileInput.current.files.length === 0){
            toast.warning("Пожалуйста загрузите изображение товара");
            return;
        }
        if (text === ""){
            toast.warning("Пожалуйста заполните поле характеристик товара");
            return;
        }
        if (text.length > 1000){
            toast.warning("Текст характеристик должен быть меньше 1000 символов");
            return;
        }
        const file = fileInput.current?.files[0];
        try{
            setIsLoading(true);
            const currentTaskInfo = await runGenerateContent(file, text, removeBackground, generateBackground);
            setTaskInfo(currentTaskInfo);
            toast.success("Генерация началась. Пожалуйста подождите");
        } catch(err){
            if (err instanceof Error){
                toast.error(err.message);
            }
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (taskInfo !== null){
            const timer = setTimeout(() => {
                runCheckingStatus(taskInfo.celery_description_task_id)
                .then((taskStatus) => {
                    if (taskStatus.status === "FAILURE"){
                        toast.error("Во время выполнения генерации описания произошла ошибка");
                        return;
                    }
                    if (taskStatus.status !== "SUCCESS"){
                        setDescriptionRetryNumber(descriptionRetryNumber+1);
                        return;
                    }
                    runGetDescriptionResult(taskInfo.db_task_id)
                    .then((taskResult) => {
                        setGeneratedText(taskResult.text);
                        toast.success("Генерация описания успешно завершена");
                    })
                    .catch((err)=>{
                        if (err instanceof Error){
                            toast.error(err.message);
                        }
                    })
                })
                .catch((err)=>{
                    if (err instanceof Error){
                        toast.error(err.message);
                    }
                })
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [taskInfo, descriptionRetryNumber]);

    useEffect(() => {
        if (taskInfo !== null){
            setIsReadyResult(false);
            const timer = setTimeout(() => {
                runCheckingStatus(taskInfo.celery_image_task_id)
                .then((taskStatus) => {
                    if (taskStatus.status === "FAILURE"){
                        toast.error("Во время выполнения генерации изображений произошла ошибка");
                        setIsLoading(false);
                        return;
                    }
                    if (taskStatus.status !== "SUCCESS"){
                        setImagesRetryNumber(imagesRetryNumber+1);
                        return;
                    }
                    runGetImagesResult(taskInfo.db_task_id)
                    .then((taskResult) => {
                        setGeneratedImages(taskResult.images);
                        setIsReadyResult(true);
                        setIsLoading(false);
                        toast.success("Генерация изображений успешно завершена");
                    })
                    .catch((err)=>{
                        if (err instanceof Error){
                            setIsLoading(false);
                            toast.error(err.message);
                        }
                    })
                })
                .catch((err)=>{
                    if (err instanceof Error){
                        setIsLoading(false);
                        toast.error(err.message);
                    }
                })
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [taskInfo, imagesRetryNumber]);

    return (
        <div className="background">
            <div className="background-image" style={{backgroundImage: 'url(images/stars.jpg)'}}></div>
            <header className="header">
                <div className="header__container">
                    <p className="header__logo">
                        ReHead
                    </p>
                    <NavLink to="/content" className="header__link">Контент</NavLink>
                    <NavLink to="/analytics" className="header__link">Аналитика</NavLink>
                    <button className="exit-btn header__link " onClick={handleLogout}>Выйти</button>
                </div>
            </header>
            <main className="main">
                <div className="main__container">
                    <h2 className="main__title">
                        Генерация контента
                    </h2>
                    <div className="content-generation-page__product product">
                        <div className="product__photo_column photo">
                            <img className="photo__img" src={imageSrc} alt="Изображение товара" />
                            <input style={{display: "none"}} type="file" accept="image/*" ref={fileInput} onChange={handleImage}/>
                            <button className="photo__btn btn" onClick={selectImage}>
                                Загрузить изображение
                            </button>
                            <div className="photo__check check-item">
                                <input type="checkbox" className="check-item__checkbox" id="remove-back-check" checked={removeBackground} onChange={(e) => setRemoveBackground(e.target.checked)}/>
                                <label className="check-item__label" htmlFor="remove-back-check">Удалить фон</label>
                            </div>
                            <div className="photo__check check-item">
                                <input type="checkbox" className="check-item__checkbox" id="generate-back-check" checked={generateBackground} onChange={(e) => setGenerateBackground(e.target.checked)}/>
                                <label className="check-item__label" htmlFor="generate-back-check">Сгенерировать фон</label>
                            </div>
                            {
                                isLoading
                                ? (
                                    <div className="main__generate-btn" style={{width: "232px", display: "flex", justifyContent: "center"}}><Loader/></div>
                                )
                                : (
                                    <button className="main__generate-btn btn btn-2" onClick={startGeneration}>
                                        Сгенерерировать
                                    </button>
                                )
                            }
                        </div>
                        <div className="product__properties_column property">
                            <textarea placeholder="Введите характеристики товара.." className="property__text" maxLength={1000} spellCheck={false} ref={textInput} value={text} onChange={(e) => setText(e.target.value)}></textarea>
                            <button className="property__remove-btn" onClick={(_) => setText("")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {
                        !isReadyResult
                        ? null
                        : (
                            <>  
                                <h3 className="main__subtitle">
                                    Результат генерации
                                </h3>
                                <div className="content-generation-page__result result">
                                    <div className="result__small-column content">
                                        <p className="content__text">
                                            {generatedText}
                                        </p>
                                        <button className="content__copy-btn" onClick={handleCopy}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="result__big-column carousel">
                                        <Carousel cellAlign="center">
                                            {
                                                generatedImages.map(generatedImage => (
                                                    <div className="carousel__image-container">
                                                        <img className="carousel__image" src={generatedImage} alt="Изображение для примера" />
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </main>
        </div>
    )
}