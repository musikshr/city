import { useState } from 'react';

import '../../pages/card.scss';

const TelegramFormRequest = () => {
    const [formData, setFormData] = useState({
        phone: '',
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
            const text = `Новая заявка с просьбой перезвонить\nТелефон: ${formData.phone}`;

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
                setFormData({ phone: '' });

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
        <div className="requestForm">
            {isSubmitted ? (
                <div className="successMessage">
                    <p>Форма успешно отправлена!</p>
                    <p className='thanks'>Спасибо за обращение! Мы вам перезвоним.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Оставьте номер телефона, и мы вам перезвоним</h2>
                    <p>Телефон:</p>
                    <div className="formGroup">
                        <input
                            placeholder='Ваш номер телефона'
                            type='tel'
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            style={{
                                borderBottom: '2px solid #dba337',
                                color: 'rgba(36, 32, 29)'
                            }}
                        />
                    </div>

                    <button className='callMe' type="submit" disabled={isLoading}>
                        {isLoading ? 'Отправка...' : 'Перезвонить мне'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default TelegramFormRequest;