import { useState } from 'react';
import './complexCard.scss';

const ComplexImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);


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

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Свайп влево
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Свайп вправо
      prevSlide();
    }
  };

  return (
    <div className="complexImageSlider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      >
      <div
        className="blurredBackground"
        style={{ backgroundImage: `url(${validImages[currentIndex]})` }}
        key={currentIndex} // 🔥 Важно: заставляем React пересоздать элемент
      ></div>
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

export default ComplexImageSlider;