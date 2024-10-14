import { useNavigate } from "react-router-dom";
import imgDiscover1 from "../../assets/img/Menu1Burger.png";
import imgDiscover2 from "../../assets/img/Menu2Burger.png";
import ImgsContainer from "./ImgsContainer";

const DiscoverSection = () => {
  const images = [imgDiscover1, imgDiscover2];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menus");
  };

  return (
    <section className="text-gray-600 p-8 flex flex-col items-center gap-8 mb-20">
    <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800">Nuestros menús</h1>
    <button type="button" id="btnToMenu" className="bg-red-600 border border-red-500 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200 shadow-lg shadow-gray-800" onClick={handleClick}>
        VER MÁS &gt;&gt;
    </button>
    
    <ImgsContainer images={images} />
</section>
  )
}

export default DiscoverSection
