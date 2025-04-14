import { useState } from 'react';
import './propertyCard.scss';

const PropertyImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Фильтруем пустые изображения
  const validImages = images.filter(img => img);

  if (validImages.length === 0) {
    return <div className="noImage">Нет изображений</div>;
  }

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  return (
    <div className="propertyImageSlider">
      <div className="mainImage">
        <img 
          src={validImages[currentIndex]} 
          alt={`Недвижимость ${currentIndex + 1}`}
          loading="lazy"
        />
      </div>

      {validImages.length > 1 && (
        <>
          <button className="sliderBtn prev" onClick={prevSlide}>
            &lt;
          </button>
          <button className="sliderBtn next" onClick={nextSlide}>
            &gt;
          </button>
          
          <div className="sliderDots">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyImageSlider;