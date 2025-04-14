import './aboutUs.scss';

const AboutUs = () => {
    return (
        <section className="aboutSection">
            <div className="container">
                <h2>Кто мы</h2>
                <p>
                    В <strong>CITYGROUP</strong> мы с энтузиазмом помогаем вам найти идеальное место, которое вы сможете назвать домом.
                    Обладая более чем десятилетним опытом, наша команда специализируется на предоставлении индивидуальных решений в сфере недвижимости, соответствующих вашим потребностям.
                </p>
                <div className="stats">
                    <div className="statItem">
                        <h3>10+</h3>
                        <p>Многолетний опыт</p>
                    </div>
                    <div className="statItem">
                        <h3>2000+</h3>
                        <p>Счастливые клиенты</p>
                    </div>
                    <div className="statItem">
                        <h3>2000+</h3>
                        <p>Проданная недвижимость</p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AboutUs;