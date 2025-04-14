import { NavLink } from 'react-router';

import AboutUs from '../aboutUs/AboutUs';
import ValuesSection from '../valuesSection/ValuesSection';

// import imgPerspective from '../../images/img4.jpg'

import './content.scss';

const Image = () => {
    return (
        <>
            <div className="content">
                {/* <img src={imgPerspective} alt="" /> */}
                <div className='nameAndBtn'>
                    <p>Квартиры от</p>
                    <p className='nameCompany'>CITY GROUP</p>
                </div>
                <NavLink to="/catalog"><button className='findFlat'>Найти квартиру</button></NavLink>
            </div>
            <AboutUs/>
            <ValuesSection/>
        </>
    );
};

export default Image;