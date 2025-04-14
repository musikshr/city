import { useState } from 'react';

import '../contacts/contacts.scss';

const TelegramFormContacts = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const botToken = '7824090133:AAEmt-S8BCtvdx2nNMUmt-5Cm4AoiWOl6sU';
            const chatId = '997192150';
            const text = `Новая заявка со страницы Контакты\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nПочта: ${formData.mail}`;

            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', mail: '', phone: '' });

                // Сбрасываем сообщение об успехе через 3 секунды
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 3000);
            } else {
                alert('Ошибка при отправке');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contactForm">
            <h2 style={{ color: 'rgba(36, 32, 29)' }}>Напишите нам</h2>
            {isSubmitted ? (
                <div className="successMessage">
                    <p>Форма успешно отправлена!</p>
                    <p className='thanks'>Спасибо за обращение! Мы вам перезвоним.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <input
                            placeholder='Ваше имя'
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                                borderBottom: '2px solid #dba337',
                                color: 'rgba(36, 32, 29)'
                            }}
                        />
                    </div>

                    <div className="formGroup">
                        <input
                            placeholder='Ваша почта'
                            type="email"
                            name="mail"
                            value={formData.mail}
                            onChange={handleChange}
                            required
                            style={{
                                borderBottom: '2px solid #dba337',
                                color: 'rgba(36, 32, 29)'
                            }}
                        />
                    </div>

                    <div className="formGroup">
                        <input
                            placeholder='Ваш номер телефона'
                            type='tel'
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{
                                borderBottom: '2px solid #dba337',
                                color: 'rgba(36, 32, 29)'
                            }}
                        />
                    </div>

                    <button className='submitOfContacts' type="submit" disabled={isLoading}>
                        {isLoading ? 'Отправка...' : 'Отправить'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default TelegramFormContacts;