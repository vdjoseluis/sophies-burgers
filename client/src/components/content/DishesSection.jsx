import dish1 from "../../assets/img/BaconBurger.png";
import dish2 from "../../assets/img/ChampisBurger.png";
import dish3 from "../../assets/img/CheeseBurger.png";
import dish4 from "../../assets/img/BurgerEgg.png";
import ImgsContainer from "./ImgsContainer";
import { useNavigate } from "react-router-dom";

const DishesSection = () => {
  const images = [dish1, dish2, dish3, dish4];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/carta");
  };

  return (
    <section className="text-gray-600 p-8 flex flex-col items-center gap-8">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800">
        Descubre nuestra carta
      </h1>
      <button
        type="button"
        id="btnToCarta"
        className="bg-red-600 border border-red-500 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200 shadow-lg shadow-gray-800"
        onClick={handleClick}
      >
        Todos nuestros platos &gt;&gt;
      </button>

      <ImgsContainer images={images} />
    </section>
  );
};

export default DishesSection;
