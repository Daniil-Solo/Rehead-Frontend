import React from "react";
import {NavLink} from "react-router-dom"
import Carousel from "nuka-carousel"
import './content-generation-page.css';

export const ContentGenerationPage: React.FC = () => {
    return (
        <>
            <header className="header">
                <div className="header__container">
                    <p className="header__logo">
                        ReHead
                    </p>
                    <NavLink to="/content" className="header__link">Контент</NavLink>
                    <NavLink to="/analytics" className="header__link">Аналитика</NavLink>
                    <button className="header__exit-btn exit-btn">
                        <svg className="exit-btn__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <span className="exit-btn__text">
                            Выйти
                        </span>
                    </button>
                </div>
            </header>
            <main className="main">
                <div className="main__container">
                    <h2 className="main__title">
                        Генерация контента
                    </h2>
                    <div className="content-generation-page__product product">
                        <div className="product__photo_column photo">
                            <img className="photo__img" src="https://placehold.co/600x400" alt="Изображение товара" />
                            <button className="photo__btn btn">
                                Изменить фото
                            </button>
                            <div className="photo__check check-item">
                                <input type="checkbox" className="check-item__checkbox" id="remove-back-check"/>
                                <label className="check-item__label" htmlFor="remove-back-check">Удалить фон</label>
                            </div>
                            <div className="photo__check check-item">
                                <input type="checkbox" className="check-item__checkbox" id="generate-back-check"/>
                                <label className="check-item__label" htmlFor="generate-back-check">Сгенерировать фон</label>
                            </div>
                        </div>
                        <div className="product__properties_column property">
                            <textarea placeholder="Введите здесь характеристики продукта" className="property__text"></textarea>
                            <button className="property__remove-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button className="main__generate-btn btn btn-2">
                        Сгенерерировать
                    </button>
                    <h3 className="main__subtitle">
                        Результат генерации
                    </h3>
                    <div className="content-generation-page__result result">
                        <div className="result__small-column content">
                            <p className="content__text">
                                Здесь будет сгенерированное описание...
                            </p>
                            <button className="content__copy-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="result__big-column carousel">
                            <Carousel cellAlign="center">
                                <div className="carousel__image-container">
                                    <img className="carousel__image" src="https://placehold.co/1000x2000" />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                    
                </div>
            </main>
        </>
    )
}