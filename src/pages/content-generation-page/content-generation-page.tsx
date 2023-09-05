import React from "react";
import {NavLink} from "react-router-dom"
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
                            <button className="photo__btn btn btn-2">
                                Изменить фото
                            </button>
                        </div>
                        <div className="product__properties_column properties">
                            <div className="properties__list">
                                <div className="properties__item property">
                                    <input type="text" placeholder="Характеристика" className="property__name input" />
                                    <input type="text" placeholder="Значение"  className="property__value input" />
                                    <button className="property__btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button className="properties__add-btn btn btn-2">
                                Добавить
                            </button>
                        </div>
                    </div>
                    <button className="main__generate-btn btn">
                        Сгенерерировать
                    </button>
                    <h3 className="main__subtitle">
                        Результат генерации
                    </h3>
                    <div className="content-generation-page__content content">
                        <p className="content__text">
                            Здесь будет сгенерированное описание...
                        </p>
                        <button className="content__copy-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}