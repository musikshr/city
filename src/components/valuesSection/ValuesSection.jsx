import './valuesSection.scss';

const ValuesSection = () => {
    return (
        <section className="valuesSection">
            <div className="container">
                <h2>Наши ценности</h2>
                <div className="values">
                    <div className="valueCard">
                        <h3>Честность</h3>
                        <p>Мы отдаем приоритет честности и прозрачности во всех наших отношениях.</p>
                    </div>
                    <div className="valueCard">
                        <h3>Превосходство</h3>
                        <p>Стремление предоставлять нашим клиентам первоклассные услуги.</p>
                    </div>
                    <div className="valueCard">
                        <h3>Преданность</h3>
                        <p>Наша главная цель — ваше удовлетворение.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValuesSection;