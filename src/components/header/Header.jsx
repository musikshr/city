import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './header.scss';

const Header = () => {
    const [isOpen, setOpen] = useState();
    const menuRef = useRef(null);
    const burgerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('bodyNoScroll');
        } else {
            document.body.classList.remove('bodyNoScroll');
        }
    
        return () => {
            document.body.classList.remove('bodyNoScroll');
        };
    }, [isOpen]);

    useEffect(() => {
        setOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                burgerRef.current && !burgerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);


    return (
        <>
            <div className="wrapperHeaderHigh">
                <div className="headerHigh">
                    <div className="flexCont">
                        <a href='#' className="logoImage">CitiGroup</a>
                        <a href='https://yandex.ru/maps/28/makhachkala/house/1_y_sergokalinskiy_tupik_10k1/YE4YcwVgQUIOQFpofXV0dHpgYw==/?ll=47.522046%2C42.955205&z=18.77' className='locationHeaderHigh'>
                            <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: 'rgba(36,32,29, 0.6)' }} class="arrow">
                                <path d="M12.906 20.18a1 1 0 0 1-1.796.1L8.5 15.595a.25.25 0 0 0-.096-.097L3.72 12.89a1 1 0 0 1 .1-1.796L17.192 5.5c.825-.345 1.653.483 1.308 1.308L12.906 20.18z"></path>
                            </svg>
                            <span>Махачкала</span>
                        </a>
                        <a href='tel:+79883054545' className="numberPhone">+79893054545</a>
                    </div>
                    <div className="favoriteSvg">
                        <svg viewBox='0 0 24 24' width='25' height='25' style={{ fill: 'rgba(36,32,29, 0.2)' }}>
                            <NavLink to="/favorites">
                                <path d="M10.72 19.84c-2.58-2.33-4.7-4.26-6.18-6.07-1.48-1.8-2.29-3.46-2.29-5.27A5.2 5.2 0 017.5 3.25c1.57 0 3.08.69 4.12 1.8.2.21.55.21.76 0a5.74 5.74 0 014.12-1.8 5.2 5.2 0 015.25 5.25c0 1.8-.81 3.47-2.29 5.27-1.47 1.8-3.58 3.73-6.15 6.06l-.03.02-.77.7a.75.75 0 01-1.01 0l-.78-.7z"></path>
                            </NavLink>
                        </svg>
                    </div>
                </div>
            </div>
            <div className='header' ref={menuRef}>
                <Link to="/">
                    <div className='logo'>
                        <p>City Group</p>
                    </div>
                </Link>
                <nav className={`navHeader ${isOpen ? 'active' : ''}`}>
                    <ul className="navHeaderList">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={() => setOpen(false)}><li className='navItem'>Главная</li></NavLink>
                        <NavLink to="/catalog" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={() => setOpen(false)}><li className='navItem'>Каталог</li></NavLink>
                        <NavLink to="/contacts" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={() => setOpen(false)}><li className='navItem'>Контакты</li></NavLink>
                    </ul>
                </nav>
                <div className={`burger ${isOpen ? 'activated' : ''}`} onClick={() => setOpen(!isOpen)} ref={burgerRef}>
                    <span></span>
                </div>
            </div>
        </>
    )
};

export default Header;