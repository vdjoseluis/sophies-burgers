import carta from "../../../assets/img/carta.png";
import TextArticle from "../../content/TextArticle";
const MenuOffer = () => {
  return (
    <section className="flex flex-col items-center mt-5 mb-20">
      <img
        src={carta}
        className="w-full max-w-sm sm:max-w-xl rounded-3xl shadow-lg shadow-gray-600"
        alt="carta"
      />
      <TextArticle />
    </section>
  );
};

export default MenuOffer;
