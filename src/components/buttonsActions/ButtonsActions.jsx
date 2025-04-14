import { useState, useEffect, useRef } from 'react';

import TelegramFormRequest from '../telegramFormRequest/TelegramFormRequest'

import './buttonsActions.scss'

const ButtonsActions = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollPosition = useRef(0);
    const bodyRef = useRef(document.body);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    return (
        <div className='wrapperButtonsActions'>
            {isVisible && (
                <div className='fixedContainer'>
                    <div className="buttonsFixed">
                        <a href="tel:+79893054545"><button className='call'>Позвонить</button></a>
                        <button className='request' onClick={handleOpenModal}>Оставить заявку</button>
                    </div>
                </div>
            )}
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
    )
}
export default ButtonsActions;
