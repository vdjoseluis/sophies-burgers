import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Función para mostrar el botón si el usuario baja más de 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Función para ir al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Agregar el event listener cuando el usuario hace scroll
    window.addEventListener("scroll", toggleVisibility);

    // Limpiar el event listener cuando se desmonte el componente
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 p-3 bg-red-600 text-white shadow-gray-300 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-opacity duration-300"
        >
          <ArrowUpTrayIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
