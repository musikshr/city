import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router'; 

import PropertyImageSlider from '../propertyCard/propertyCard'

import './complexFlats.scss';
import ButtonsActions from '../buttonsActions/ButtonsActions';

const ComplexFlats = ({ data }) => {
    const { complexId } = useParams();
    const complex = data.find(c => c.id === parseInt(complexId));

    const [visibleFlats, setVisibleFlats] = useState(9);
    const flatsPerLoad = 9;

    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        minArea: '',
        maxArea: '',
        rooms: []
    });

    const [filteredFlats, setFilteredFlats] = useState(complex?.dataFlat || []);
    const [isFiltered, setIsFiltered] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Загрузка избранного из localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteFlats')) || [];
        setFavorites(savedFavorites);
        // Загрузка видимых квартир
        const savedVisible = localStorage.getItem('visibleFlats');
        if (savedVisible) setVisibleFlats(parseInt(savedVisible));
    }, []);

    useEffect(() => {
        localStorage.setItem('visibleFlats', visibleFlats.toString());
    }, [visibleFlats]);

    if (!complex) {
        return <div>Комплекс не найден</div>;
    }

    const toggleFavorite = (flat) => {
        const isFavorite = favorites.some(fav => fav.id === flat.id);
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = favorites.filter(fav => fav.id !== flat.id);
        } else {
            updatedFavorites = [...favorites, flat];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteFlats', JSON.stringify(updatedFavorites));
    };

    const calculateFilteredCount = () => {
        let count = complex.dataFlat;

        if (filters.minPrice) {
            count = count.filter(flat => flat.price >= Number(filters.minPrice));
        }

        if (filters.maxPrice) {
            count = count.filter(flat => flat.price <= Number(filters.maxPrice));
        }

        if (filters.minArea) {
            count = count.filter(flat => flat.area >= Number(filters.minArea));
        }

        if (filters.maxArea) {
            count = count.filter(flat => flat.area <= Number(filters.maxArea));
        }

        if (filters.rooms.length > 0) {
            count = count.filter(flat => filters.rooms.includes(flat.rooms));
        }

        return count.length;
    };

    const applyFilters = () => {
        const result = complex.dataFlat.filter(flat => {
            if (filters.minPrice && flat.price < Number(filters.minPrice)) return false;
            if (filters.maxPrice && flat.price > Number(filters.maxPrice)) return false;
            if (filters.minArea && flat.area < Number(filters.minArea)) return false;
            if (filters.maxArea && flat.area > Number(filters.maxArea)) return false;
            if (filters.rooms.length > 0 && !filters.rooms.includes(flat.rooms)) return false;
            return true;
        });

        setFilteredFlats(result);
        setVisibleFlats(flatsPerLoad);
        setIsFiltered(true);
    };

    const resetFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            minArea: '',
            maxArea: '',
            rooms: []
        });
        setFilteredFlats(complex.dataFlat);
        setVisibleFlats(flatsPerLoad);
        setIsFiltered(false);
    };

    const loadMoreFlats = () => {
        setVisibleFlats(prev => prev + 9);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoomChange = (e) => {
        const { value, checked } = e.target;
        setFilters(prev => {
            if (checked) {
                return { ...prev, rooms: [...prev.rooms, parseInt(value)] };
            } else {
                return { ...prev, rooms: prev.rooms.filter(room => room !== parseInt(value)) };
            }
        });
    };

    const filteredCount = calculateFilteredCount();
    const currentFlats = filteredFlats.slice(0, visibleFlats);
    const hasMoreFlats = visibleFlats < filteredFlats.length;

    return (
        <div className="complexFlats">
            <div className="filtersContainer">
                <div className="filterGroup">
                    <p>Стоимость, ₽</p>
                    <div className="input">
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="От"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="До"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="filterGroup">
                    <p>Площадь, м²</p>
                    <div className="input">
                        <input
                            type="number"
                            name="minArea"
                            placeholder="От"
                            value={filters.minArea}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="maxArea"
                            placeholder="До"
                            value={filters.maxArea}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="filterGroup">
                    <p>Комнатность</p>
                    <div className="contCheckbox">
                        {[1, 2, 3, 4].map(room => (
                            <div key={room} className="checkbox">
                                <input
                                    type="checkbox"
                                    key={room}
                                    value={room}
                                    checked={filters.rooms.includes(room)}
                                    onChange={handleRoomChange}
                                />
                                {room}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filterButtons">
                    <div className="flexCont">
                        <button onClick={applyFilters} className="applyButton">
                            Показать ({filteredCount}) предложений
                        </button>
                        <button onClick={resetFilters} className="resetButton">
                            Сбросить фильтры
                        </button>
                    </div>
                </div>
            </div>
            <div className="contFlatsGrid">
                <div className="flatsGrid">
                    {currentFlats.map(flat => {
                        const isFavorite = favorites.some(fav => fav.id === flat.id);
                        return (
                            <div key={flat.id} className="flatCard">
                                <div className="flatImage">
                                    <PropertyImageSlider images={[flat.img, flat.img2]} />
                                </div>
                                <div className="flatInfo">
                                    <div className="priceAndButton">
                                        <div className="priceAndPriceForOne">
                                            <p className="price">{flat.price.toLocaleString() ?? 'Цена не указана'}₽</p>
                                            <p className='priceForOne'>{(flat.price && flat.area) ? (flat.price / flat.area).toFixed(0).toLocaleString() : '—'}₽/м²</p>
                                        </div>
                                        <div className="buttonFavorite">
                                            <div onClick={() => toggleFavorite(flat)}
                                                className={`favoriteBtn ${isFavorite ? 'active' : ''}`}>
                                                <svg viewBox='0 0 24 24' width='25' height='25' fill='currentColor'>
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
                                    <p className='complex'>{flat.street}</p>
                                    <p className="adress">{flat.adress}</p>
                                </div>
                                <div className='propertyButton'>
                                    <Link to={`/card/${flat.id}`} target="_blank" rel="noopener noreferrer">
                                        <button>Подробнее</button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {hasMoreFlats && (
                <div className="loadMoreContainer">
                    <button onClick={loadMoreFlats} className="loadMoreButton">
                        Ещё {Math.min(flatsPerLoad, filteredFlats.length - visibleFlats)} предложений из {filteredFlats.length - visibleFlats}
                    </button>
                </div>
            )}
            <ButtonsActions />
        </div>
    );
};

export default ComplexFlats;