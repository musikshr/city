import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import data from '../utils/dataexample';

import PropertyImageSlider from '../components/propertyCard/propertyCard';

import './favoritesPage.scss';
const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteFlats')) || [];
        setFavorites(savedFavorites);
    }, []);

    const getComplexInfo = (flatId) => {
        if (data && Array.isArray(data)) {
            for (const group of data) {
                if (group.dataFlat && group.dataFlat.some(item => item.id.toString() === flatId.toString())) {
                    return group;
                }
            }
        }
        return null;
    };

    const removeFavorite = (flatId) => {
        const updatedFavorites = favorites.filter(flat => flat.id !== flatId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteFlats', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="contComplexFlats">
            <div className="flats">
                {favorites.length === 0 ? (
                    <div className="emptyContainer">
                        <div className="action">
                            <p className="bigText">Сохраняйте объявления,</p>
                            <p className="smallText">чтобы не искать понравившиеся объявления заново</p>
                            <div className='contButtons'>
                                <NavLink to="/catalog"><button className='action'>Начать поиск</button></NavLink>
                            </div>
                        </div>
                        <div className='image'><img src="https://cdn.esoft.digital/content/cluster/media/3c/e1b054b22aea1ae9ede518517374f2d2edf88c3c.svg" alt="" /></div>
                    </div>
                ) : (
                    <>
                        <p className='title'>Избранное</p>
                        <div className="flatsGrid">
                            {favorites.map(flat => {
                                const complexInfo = getComplexInfo(flat.id);
                                return(
                                <div key={flat.id} className="flatCard">
                                    <div className="flatImage">
                                        <PropertyImageSlider
                                            images={[
                                                flat.img,
                                                flat.img2 || complexInfo.img2
                                            ].filter(Boolean)}
                                        />
                                    </div>
                                    <div className="flatInfo">
                                        <div className="priceAndButton">
                                            <div className="priceAndPriceForOne">
                                                <p className="price">{(complexInfo.price * flat.area).toLocaleString()}₽</p>
                                                <p className='priceForOne'>{(complexInfo.price).toLocaleString()}₽/м²</p>
                                            </div>
                                            <div className="buttonFavorite">
                                                <div onClick={() => removeFavorite(flat.id)} className='favoriteBtn active'>
                                                    <svg viewBox='0 0 24 24' width='25' height='25' fill='red'>
                                                        <path d="M10.72 19.84c-2.58-2.33-4.7-4.26-6.18-6.07-1.48-1.8-2.29-3.46-2.29-5.27A5.2 5.2 0 017.5 3.25c1.57 0 3.08.69 4.12 1.8.2.21.55.21.76 0a5.74 5.74 0 014.12-1.8 5.2 5.2 0 015.25 5.25c0 1.8-.81 3.47-2.29 5.27-1.47 1.8-3.58 3.73-6.15 6.06l-.03.02-.77.7a.75.75 0 01-1.01 0l-.78-.7z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='roomsAreaFloor'>
                                            <p>{flat.rooms}-комн. кв.</p>
                                            <span>/</span>
                                            <p>{flat.area} м²</p>
                                            <span>/</span>
                                            <p>{flat.floor}</p>
                                        </div>
                                        <p className='relinquishment'>Срок сдачи: {complexInfo.relinquishment}</p>
                                    </div>
                                    <div className='propertyButton'>
                                        {/* <a href={`/card/${flat.id}`} target="_blank" rel="noopener noreferrer">
                                            <button>Подробнее</button>
                                        </a> */}
                                        <Link to={`/card/${flat.id}`} target="_blank" rel="noopener noreferrer">
                                            <button>Подробнее</button>
                                        </Link>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;