import imgMenu1 from "../../assets/img/Menu1Burger.png";
import imgMenu2 from "../../assets/img/Menu2Burger.png";
import imgMenu3 from "../../assets/img/CheeseBurger.png";
import imgMenu4 from "../../assets/img/BurgerEgg.png";
import TextArticle from "../content/TextArticle";

const Menus = () => {
  const imgsMenus = [
    { key: 1, src: imgMenu1, text: "Menú doble carne" },
    { key: 2, src: imgMenu2, text: "Menú vegetal completo" },
    { key: 3, src: imgMenu3, text: "Menú Cheeseburger" },
    { key: 4, src: imgMenu4, text: "Menú completo huevo-bacon" },
  ];

  return (
    <section className="p-8 flex flex-col items-center gap-6 mb-10">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800">
        Nuestros menús
      </h1>
      <div className="flex justify-center flex-wrap gap-6 bg-gray-800 text-gray-300 p-6 rounded-2xl shadow-md shadow-gray-400">
        {imgsMenus.map((item) => (
          <div key={item.key} className="text-center">
            <img
              src={item.src}
              alt={item.text}
              className="w-[350px] h-[400px] object-cover rounded-2xl shadow-md shadow-gray-400 mb-4"
            />
            <h5 className="text-center lh-lg">{item.text}</h5>
          </div>
        ))}
      </div>
      <TextArticle />
    </section>
  );
};

export default Menus;
