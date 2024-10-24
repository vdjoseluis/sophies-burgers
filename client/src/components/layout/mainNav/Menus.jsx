import imgMenu1 from "../../../assets/img/Menu1Burger.png";
import imgMenu2 from "../../../assets/img/Menu2Burger.png";
import imgMenu3 from "../../../assets/img/CheeseBurger.png";
import imgMenu4 from "../../../assets/img/BurgerEgg.png";
import TextArticle from "../../content/TextArticle";
import ImgsContainer from "../../content/ImgsContainer";

const Menus = () => {
  const imgsMenus = [
    { src: imgMenu1, caption: "Menú doble carne" },
    { src: imgMenu2, caption: "Menú vegetal completo" },
    { src: imgMenu3, caption: "Menú Cheeseburger" },
    { src: imgMenu4, caption: "Menú completo huevo-bacon" },
  ];

  return (
    <section className="p-8 flex flex-col items-center gap-6 mb-10">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800 text-shadow">
        Nuestros menús
      </h1>
      <ImgsContainer images={imgsMenus} />
      <TextArticle />
    </section>
  );
};

export default Menus;
