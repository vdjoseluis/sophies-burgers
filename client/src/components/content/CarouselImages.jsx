import { useState, useEffect } from "react";
import carouselImg1 from "../../assets/img/3BurgersFire.png";
import carouselImg2 from "../../assets/img/3BurgersLine.png";

const CarouselImages = () => {
  const images = [carouselImg1, carouselImg2];
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  // Cambiar de imagen automáticamente cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 3000); // Cambiar de imagen cada 3 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="flex justify-center mx-auto bg-gray-900">
      <div
        className="overflow-hidden rounded-lg shadow-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="object-cover transition duration-500 ease-in-out h-64 md:h-70 lg:h-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        />
      </div>

      {/* Botón Anterior */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-r-lg focus:outline-none"
        onClick={prevSlide}
      >
        &#8249;
      </button>

      {/* Botón Siguiente */}
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-l-lg focus:outline-none"
        onClick={nextSlide}
      >
        &#8250;
      </button>
    </div>
  );
};

export default CarouselImages;
