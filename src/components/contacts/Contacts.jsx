import { Component } from 'react';

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './contacts.scss';
import TelegramFormContacts from '../telegramFormContacts/TelegramFormContacts';

class Contacts extends Component {
    render() {
        return (
            <div className="contactsPage" style={{ backgroundColor: '#fff' }}>
                <div className="contactsHeader" style={{ backgroundColor: 'rgba(36, 32, 29)' }}>
                    <h1 style={{ color: '#dba337' }}>Наши контакты</h1>
                    <p style={{ color: '#fff' }}>Мы всегда рады вашему обращению</p>
                </div>

                <div className="contactsContainer">
                    <div className="contactInfo" style={{ borderTop: '4px solid #dba337' }}>
                        <div className="contactCard">
                            <div className="iconCircle" style={{ backgroundColor: 'rgba(219, 163, 55, 0.1)' }}>
                                <FaMapMarkerAlt style={{ color: '#dba337' }} />
                            </div>
                            <h3 style={{ color: 'rgba(36, 32, 29)' }}>Адрес</h3>
                            <p style={{ color: 'rgba(36, 32, 29, 0.8)' }}>г. Махачкала, 1-ый Сергокалинский тупик 10К1</p>
                        </div>

                        <div className="contactCard">
                            <div className="iconCircle" style={{ backgroundColor: 'rgba(219, 163, 55, 0.1)' }}>
                                <FaPhone style={{ color: '#dba337' }} />
                            </div>
                            <h3 style={{ color: 'rgba(36, 32, 29)' }}>Телефон</h3>
                            <p style={{ color: 'rgba(36, 32, 29, 0.8)' }}>+7 (988) 305 45 45</p>
                        </div>

                        <div className="contactCard">
                            <div className="iconCircle" style={{ backgroundColor: 'rgba(219, 163, 55, 0.1)' }}>
                                <FaEnvelope style={{ color: '#dba337' }} />
                            </div>
                            <h3 style={{ color: 'rgba(36, 32, 29)' }}>Email</h3>
                            <p style={{ color: 'rgba(36, 32, 29, 0.8)' }}>CityGroup05@mail.ru</p>
                        </div>

                        <div className="contactCard">
                            <div className="iconCircle" style={{ backgroundColor: 'rgba(219, 163, 55, 0.1)' }}>
                                <FaClock style={{ color: '#dba337' }} />
                            </div>
                            <h3 style={{ color: 'rgba(36, 32, 29)' }}>Часы работы</h3>
                            <p style={{ color: 'rgba(36, 32, 29, 0.8)' }}>Пн-Пт: 9:00 - 19:00</p>
                            <p style={{ color: 'rgba(36, 32, 29, 0.8)' }}>Сб-Вс: 10:00 - 17:00</p>
                        </div>
                    </div>
                    {/* <WhatsAppForm/> */}
                    <TelegramFormContacts/>
                    {/* <div className="contactForm">
                        <h2 style={{ color: 'rgba(36, 32, 29)' }}>Напишите нам</h2>
                        <form>
                            <div className="formGroup">
                                <input
                                    required
                                    type="text"
                                    placeholder="Ваше имя"
                                    style={{borderBottom: '2px solid #dba337',
                                    color: 'rgba(36, 32, 29)'}}
                                />
                            </div>
                            <div className="formGroup">
                                <input
                                    type="email"
                                    placeholder="Ваш email"
                                    style={{borderBottom: '2px solid #dba337',
                                    color: 'rgba(36, 32, 29)'}}
                                />
                            </div>
                            <div className="formGroup">
                                <input
                                    type='tel'
                                    placeholder="Ваш номер телефона"
                                    style={{borderBottom: '2px solid #dba337',
                                    color: 'rgba(36, 32, 29)'}}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{backgroundColor: '#dba337',
                                color: '#fff'}}> Отправить сообщение
                            </button>
                        </form>
                    </div> */}
                </div>

                <div className="contactsFooter">
                    <div className="mapContainer">
                        <iframe
                            title="officeMap"
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A2daa6eca8cba398705b478655e49dee4d670983011af7fcd708e2b0a7328dc09&amp;source=constructor" 
                            style={{ border: 'none' }}
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="socialLinks">
                        <h3 style={{ color: 'rgba(36, 32, 29)' }}>Мы в соцсетях</h3>
                        <div className="socialIcons">
                            <a href="#" style={{ color: '#dba337' }}><FaFacebook /></a>
                            <a href="#" style={{ color: '#dba337' }}><FaInstagram /></a>
                            <a href="#" style={{ color: '#dba337' }}><FaTwitter /></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Contacts;