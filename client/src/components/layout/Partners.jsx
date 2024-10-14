import { useNavigate } from "react-router-dom";
import imgPartner1 from "../../assets/img/partner1.jpg";
import imgPartner2 from "../../assets/img/partner2.jpg";
import imgPartner3 from "../../assets/img/partner3.jpg";
import ImgsContainer from "../content/ImgsContainer";

const Partners = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  }
  const images = [imgPartner1, imgPartner2, imgPartner3];

  return (
    <section className="text-gray-700 p-8 flex flex-col items-center gap-4 mb-20">
      <h1 className="text-center text-4xl lg:text-5xl font-semibold text-gray-800">
        Nuestros socios
      </h1>

      <ImgsContainer images={images} />
      <h3 className="text-gray-800 font-semibold text-md md:text-xl lg:text-3xl">
        ¡ Formar parte de esta gran familia marca la diferencia !
      </h3>

      <form action="index.php?content=login" method="post">
        <div className="flex flex-wrap justify-center bg-gray-800 p-8 gap-8 rounded-2xl shadow-md shadow-gray-300">
          <input
            type="hidden"
            name="previousUrl"
            value="index.php?content=formUser"
          />
          <div className="w-full sm:w-auto">
            <button
              type="button"
              id="btnCreate"
              className="w-full py-2 px-4 border text-xl rounded-xl border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300 shadow-md shadow-gray-300"
              onClick={handleClick}
            >
              Regístrate
            </button>
          </div>
          <div className="w-full sm:w-auto">
            <button
              type="submit"
              name="btnUpdateUser"
              className="w-full py-2 px-4 border text-xl rounded-xl border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition duration-300 shadow-md shadow-gray-300"
            >
              Modificar datos
            </button>
          </div>
          <div className="w-full sm:w-auto">
            <button
              type="submit"
              name="btnDeleteUser"
              className="w-full py-2 px-4 border text-xl rounded-xl border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 shadow-md shadow-gray-300"
            >
              Darme de baja
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Partners;
