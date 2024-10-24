import { useNavigate } from "react-router-dom";
import imgDiscover1 from "../../assets/img/Menu1Burger.png";
import imgDiscover2 from "../../assets/img/Menu2Burger.png";
import ImgsContainer from "./ImgsContainer";

const DiscoverSection = () => {
  const imgsDiscover = [{ src: imgDiscover1 }, { src: imgDiscover2 }];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menus");
  };

  return (
    <section className="text-gray-600 p-8 flex flex-col items-center gap-8 mb-20">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800 tracking-wide text-shadow">
        Nuestros menús
      </h1>
      <button
        type="button"
        id="btnToMenu"
        className="w-56 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-900 transition duration-300"
        onClick={handleClick}
      >
        VER MÁS &gt;&gt;
      </button>

      <ImgsContainer images={imgsDiscover} />
    </section>
  );
};

export default DiscoverSection;
