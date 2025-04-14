import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import React from 'react';
import data from '../../utils/dataexample'

import './catalog.scss';
import PropertyImageSlider from '../propertyCard/propertyCard';
import TelegramFormCatalog from "../telegramFormCatalog/TelegramFormCatalog";
import Consultation from "../consultation/Consultation";

const Catalog = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollPosition = useRef(0);
    const bodyRef = useRef(document.body);

    useEffect(() => {
        if (isModalOpen) {
            scrollPosition.current = window.pageYOffset || document.documentElement.scrollTop;

            bodyRef.current.style.overflow = 'hidden';
            bodyRef.current.style.position = 'fixed';
            bodyRef.current.style.top = `-${scrollPosition.current}px`;
            bodyRef.current.style.width = '100%';
        } else {
            bodyRef.current.style.removeProperty('overflow');
            bodyRef.current.style.removeProperty('position');
            bodyRef.current.style.removeProperty('top');
            bodyRef.current.style.removeProperty('width');

            window.scrollTo(0, scrollPosition.current);
        }

        return () => {
            bodyRef.current.style.removeProperty('overflow');
            bodyRef.current.style.removeProperty('position');
            bodyRef.current.style.removeProperty('top');
            bodyRef.current.style.removeProperty('width');
            window.scrollTo(0, scrollPosition.current);
        };
    }, [isModalOpen]);

    const handleOpenModal = () => {
        scrollPosition.current = window.pageYOffset || document.documentElement.scrollTop;
        setIsModalOpen(true);
    };


    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('bodyNoScroll');
        } else {
            document.body.classList.remove('bodyNoScroll');
        }

        return () => {
            document.body.classList.remove('bodyNoScroll');
        };
    }, [isModalOpen]);

    const handleComplexClick = (complexId) => {
        navigate(`/complex/${complexId}`);
    };
    return (
        <div className="catalog">
            <div className="contAction">
                <div className="imageContAction">
                    <img src="https://cdn.esoft.digital/content/cluster/media/09/6c9577bd00aa158719aa2edb4d83da4c9e1fd709.svg" alt="#" />
                </div>
                <div className="textAndBtn">
                    <div className="text">
                        <h2 className="bold">Сделаем бесплатный подбор недвижимости</h2>
                        <p>Расскажите, что ищете. Мы подберем подходящие варианты</p>
                    </div>
                    <div className="buttonRequest">
                        <button onClick={handleOpenModal}>Заказать подбор</button>
                    </div>
                </div>
                {isModalOpen && (
                    <>
                        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}></div>
                        <div className="contModalWrapper">
                            <div className="modalWrapper">
                                <button className="cross" onClick={() => setIsModalOpen(false)}>
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
                                        <path d="m13.057 12 5.061 5.062a.747.747 0 1 1-1.056 1.056L12 13.056l-5.062 5.062a.747.747 0 0 1-1.056-1.056L10.944 12 5.882 6.938a.747.747 0 0 1 1.056-1.056L12 10.944l5.062-5.062a.747.747 0 1 1 1.056 1.056z"></path>
                                    </svg>
                                </button>
                                <div className="modalContent">
                                    {/* <h2>Заявка на бесплатный подбор недвижимости</h2>
                                    <h4>Специалист перезвонит для уточнения деталей</h4> */}
                                    <TelegramFormCatalog/>
                                    {/* <p>Нажимая на кнопку, вы даёте согласие на обработку <a href="l">персональных данных</a> </p> */}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="containerComplexes">
                <div className="complexes">
                    <h2>Новостройки</h2>
                    <p className='infoComplexes'>Клиент получает все услуги "CityGroup05" бепслатно</p>
                    <div className="complexesGrid">
                        {data.map(complex => {
                            const minPrice = Math.min(...complex.dataFlat.map(flat => flat.price));
                            const maxPrice = Math.max(...complex.dataFlat.map(flat => flat.price));
                            const minArea = Math.min(...complex.dataFlat.map(flat => flat.area));
                            const maxArea = Math.max(...complex.dataFlat.map(flat => flat.area));

                            return (
                                <div
                                    key={complex.id}
                                    className="complexCard"
                                >
                                    <div className="sliderImage">
                                        <PropertyImageSlider images={complex.images} />
                                    </div>
                                    <div className="infoAboutComplex" onClick={() => handleComplexClick(complex.id)}>
                                        <h3>{complex.nameComplex}</h3>
                                        <p className='relinquishment'>{complex.relinquishment}</p>
                                        <p className='price'>Цены: от {minPrice.toLocaleString()}₽ до {maxPrice.toLocaleString()}₽</p>
                                        <p className='area'>Площадь: от {minArea.toLocaleString()}м² до {maxArea.toLocaleString()}м²</p>
                                        <p className='amount'>{complex.dataFlat.length} предложений</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Consultation/>
        </div>
    );
}


export default Catalog;