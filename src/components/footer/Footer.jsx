import { FaVk, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, } from 'react-icons/fa';

import './footer.scss';

const Footer = () => {
    return (
        <footer className="siteFooter">
            <div className="footerContainer">
                <div className="footerLogo">
                    {/* <img src="logo.png" alt="Логотип компании" className="logo"> */}
                </div>

                <div className="footerNav">
                    <h3 className="navTitle">Навигация</h3>
                    <ul className="navLinks">
                        <a href='/'><li>Главная</li></a>
                        <a href='/catalog'><li>Каталог</li></a>
                        <a href='/contacts'><li>Контакты</li></a>
                    </ul>
                </div>

                <div className="footerContacts">
                    <h3 className="contactsTitle">Контакты</h3>
                    <ul className="contactInfo">
                        <a href="tel:+79883054545"><li><FaPhone style={{color: '#dba337'}}/><span>+7 (123) 456-78-90</span></li></a>
                        <a href="mailto:citygroup05@mail.ru"><li><FaEnvelope style={{color: '#dba337'}}/><span>CityGroup05@mail.ru</span></li></a>
                        <a href='https://yandex.ru/maps/28/makhachkala/house/1_y_sergokalinskiy_tupik_10k1/YE4YcwVgQUIOQFpofXV0dHpgYw==/?ll=47.522046%2C42.955205&z=18.77' ><li><FaMapMarkerAlt style={{color: '#dba337'}}/><span>Махачкала, 1-й Сергокалинский тупик</span></li></a>
                    </ul>
                </div>

                <div className="footerSocial">
                    <h3 className="socialTitle">Мы в соцсетях</h3>
                    <ul className="socialLinks">
                        <a href="#"><li><FaVk style={{color: '#dba337'}}/></li></a>
                        <a href="#"><li><FaInstagram style={{color: '#dba337'}}/></li></a>
                        <a href="#"><li><FaFacebook style={{color: '#dba337'}}/></li></a>
                    </ul>
                </div>
            </div>


            <div className="footerCopyright">
                <p>© 2023 CityGroup05. Все права защищены.</p>
            </div>
        </footer>
    )
}
export default Footer;