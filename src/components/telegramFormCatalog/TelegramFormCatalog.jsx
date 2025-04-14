import { useState } from 'react';

import '../catalog/catalog.scss';

const TelegramFormCatalog = () => {
    const [formData, setFormData] = useState({
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
            const text = `Новая заявка "Подбор" со страницы Каталог (каталог комплексов)\nТелефон: ${formData.phone}\nПожелания: ${formData.message}`;

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
                setFormData({ phone: '', message: '', });

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
        <div className="catalogForm">
            {isSubmitted ? (
                <div className="successMessage">
                    <p>Форма успешно отправлена!</p>
                    <p className='thanks'>Спасибо за обращение! Мы вам перезвоним.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Заявка на бесплатный подбор недвижимости</h2>
                    <h4>Специалист перезвонит для уточнения деталей</h4>
                    <div className="formGroup">
                        <p>Телефон:</p>
                        <input
                            placeholder='123 456 78 90'
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={{
                                borderBottom: '2px solid #dba337',
                                color: 'rgba(36, 32, 29)'
                            }}
                        />
                    </div>
                    <div className="formGroup">
                        <p>Комментарий:</p>
                        <textarea
                            placeholder='Напишите, что для вас важно: комнатность, квадратура, этаж, расположение и др. параметры'
                            type=''
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            style={{
                                borderBottom: '2px solid #dba337',
                                color: 'rgba(36, 32, 29)'
                            }}
                        />
                    </div>

                    <button className='sendRequest' type="submit" disabled={isLoading}>
                        {isLoading ? 'Отправка...' : 'Заказать подбор'}
                    </button>
                    <p>Нажимая на кнопку, вы даёте согласие на обработку <a href="l">персональных данных</a> </p>
                </form>
            )}
        </div>
    );
};

export default TelegramFormCatalog;