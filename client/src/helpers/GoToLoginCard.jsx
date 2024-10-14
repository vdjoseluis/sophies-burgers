import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const GoToLoginCard = ({ title, text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousUrl = location.pathname || "/";

  const handleClick = () => {
    navigate("/login", { state: { previousUrl } });
  };

  return (
    <div className="bg-gray-300 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto opacity-85 items-center">
      <div className="flex justify-center items-center p-6 gap-20 border-b-4">
        <h1 className="text-center text-3xl lg:text-4xl font-semibold my-4 text-gray-800">
          {title}
        </h1>
        <button
          className="p-2 bg-emerald-400 rounded-xl text-gray-900 font-semibold shadow-md shadow-gray-800 hover:bg-emerald-500 hover:text-gray-100 transition duration-300"
          name="btnLoginOrder"
          onClick={handleClick}
        >
          Iniciar sesión
        </button>
      </div>

      <p className="p-4 text-center text-xl">{text}</p>
    </div>
  );
};

GoToLoginCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default GoToLoginCard;
