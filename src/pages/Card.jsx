import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import data from '../utils/dataexample';

import ButtonsActions from "../components/buttonsActions/ButtonsActions";

import './card.scss';
import TelegramFormRequest from "../components/telegramFormRequest/TelegramFormRequest";

const Card = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollPosition = useRef(0);
    const bodyRef = useRef(document.body);

    const { id } = useParams();
    const [currentImage, setCurrentImage] = useState(null);

    let card = null;
    if (data && Array.isArray(data)) {
        for (const group of data) {
            if (group.dataFlat && Array.isArray(group.dataFlat)) {
                card = group.dataFlat.find(item => item.id.toString() === id);
                if (card) break;
            }
        }
    }
    let complexInfo = null;
    if (data && Array.isArray(data)) {
        for (const group of data) {
            if (group.dataFlat && group.dataFlat.some(item => item.id.toString() === id)) {
                complexInfo = group;
                break;
            }
        }
    }

    useEffect(() => {
        if (card?.img) {
            setCurrentImage(card.img);
        }
    }, [card]);

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

    const allImages = [
        { id: 1, src: card.img, label: 'Квартира' },
        { id: 2, src: card.img2 ? card.img2 : complexInfo.img2, label: 'Этаж' },
    ].filter(item => item.src);

    if (!card) return <div>Товар не найден</div>

    const handleImageChange = (imgSrc) => {
        setCurrentImage(imgSrc);
    };

    const flatInfo = [
        { key: 'rooms', label: 'Комнатность', value: `${card.rooms}-комн.` },
        { key: 'area', label: 'Площадь', value: `${card.area} м²` },
        { key: 'floor', label: 'Этаж', value: card.floor },
        { key: 'renilquishmnet', label: 'Срок сдачи', value: complexInfo.relinquishment },
    ];
    return (
        <div className="wrapper">
            <div className="container">
                <p className="name">{card.rooms}-комн. квартира, {card.area} м²</p>
                <div className="containerForImage">
                    <div className="mainImage">
                        {currentImage ? (
                            <img src={currentImage} alt="Недвижимость" />
                        ) : (
                            <div className="noImage">Изображение не найдено</div>
                        )}
                    </div>
                    <div className="imageButtons">
                        {allImages.map((image) => (
                            <button
                                key={`img-btn-${image.id}`}
                                className={`imageButton ${currentImage === image.src ? 'active' : ''}`}
                                onClick={() => handleImageChange(image.src)}
                            >
                                {image.label}
                            </button>
                        ))}

                    </div>
                </div>
                <p className="littleTitle">Планировка</p>
            </div>
            <div className='callAndRequest'>
                <div className="contCallAndRequest">
                    <a href="tel:+79882285517"><button className='callTo' >Позвонить</button></a>
                    <button className="request" onClick={handleOpenModal}>Оставить заявку</button>
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
                                    <TelegramFormRequest />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="containerInfo">
                <div className="titleWithPrice">
                    <p className="title">Общая информация</p>
                    <div className="contPrice">
                        <p className="price">{(complexInfo.price * card.area).toLocaleString()}₽</p>
                        <p className="priceForOne">{(complexInfo.price).toLocaleString()}₽ за м²</p>
                    </div>
                </div>
                <div className="infoAboutFlat">
                    {flatInfo.map(info => (
                        <div key={info.key} className="infoItem">
                            <span>{info.label}</span>
                            <span className="value">{info.value}</span>
                        </div>
                    ))}
                </div>
                <div className="adress">
                    <p className="title">Расположение</p>
                    <p>{card.adress}</p>
                    <iframe src={`https://yandex.ru/map-widget/v1/?um=constructor%${complexInfo.map}&amp;source=constructor`}></iframe>
                </div>
            </div>
            <ButtonsActions />
        </div>
    )
};

export default Card;