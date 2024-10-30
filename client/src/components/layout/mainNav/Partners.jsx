import { useNavigate } from "react-router-dom";
import imgPartner1 from "../../../assets/img/partner1.jpg";
import imgPartner2 from "../../../assets/img/partner2.jpg";
import imgPartner3 from "../../../assets/img/partner3.jpg";
import ImgsContainer from "../../content/ImgsContainer";
import TextArticle from "../../content/TextArticle";
import useAuth from "../../../hooks/useAuth";
import GetAllUsers from "../private/GetAllUsers";

const Partners = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const handleClick = () => {
    navigate("/login");
  };
  const images = [
    { src: imgPartner1 },
    { src: imgPartner2 },
    { src: imgPartner3 },
  ];

  return (
    <>
      {auth && auth.role === "admin" ? (
        <GetAllUsers />
      ) : (
        <section className="text-gray-700 p-8 flex flex-col items-center gap-4 mb-20">
          <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800 text-shadow">
            Nuestros socios
          </h1>

          <ImgsContainer images={images} />
          <h3 className="text-gray-800 font-semibold text-md md:text-xl lg:text-3xl">
            ¡ Formar parte de esta gran familia marca la diferencia !
          </h3>

          <TextArticle />
          {!auth.id && (
            <button
              type="submit"
              name="btnUpdateUser"
              className="w-56 py-2 bg-green-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-green-500 hover:text-gray-900 transition duration-300"
              onClick={handleClick}
            >
              Iniciar sesión
            </button>
          )}
        </section>
      )}
    </>
  );
};

export default Partners;
