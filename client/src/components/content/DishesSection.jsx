import dish1 from "../../assets/img/BaconBurger.png";
import dish2 from "../../assets/img/ChampisBurger.png";
import dish3 from "../../assets/img/CheeseBurger.png";
import dish4 from "../../assets/img/BurgerEgg.png";
import ImgsContainer from "./ImgsContainer";
import { useNavigate } from "react-router-dom";

const DishesSection = () => {
  const imgsDishes = [{src: dish1}, {src: dish2}, {src: dish3}, {src: dish4}];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/carta");
  };

  return (
    <section className="text-gray-600 p-8 flex flex-col items-center gap-8">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800 tracking-wide text-shadow">
        Descubre nuestra carta
      </h1>
      <button
        type="button"
        id="btnToCarta"
        className="w-56 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-900 transition duration-300"
        onClick={handleClick}
      >
        Todos nuestros platos &gt;&gt;
      </button>

      <ImgsContainer images={imgsDishes} />
    </section>
  );
};

export default DishesSection;
