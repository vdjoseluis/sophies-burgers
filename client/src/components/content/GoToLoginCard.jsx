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
    <div className="bg-gray-900 bg-opacity-75 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto items-center">
      <div className="flex justify-center items-center p-6 gap-20 border-b-4">
        <h1 className="text-center text-2xl lg:text-4xl font-semibold my-4 text-yellow-500">
          {title}
        </h1>
        <button
          className="px-2 py-2 bg-green-600 rounded-xl text-white shadow-md font-semibold shadow-gray-800 hover:bg-green-500 hover:text-gray-900 transition duration-300"
          onClick={handleClick}
        >
          Iniciar sesión
        </button>
      </div>

      <p className="p-4 text-center text-xl text-gray-100">{text}</p>
    </div>
  );
};

GoToLoginCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default GoToLoginCard;
