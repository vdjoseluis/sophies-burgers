import {
  AtSymbolIcon,
  DocumentTextIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/");
    }

  return (
    <section className="bg-gray-300 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-md md:max-w-2xl mx-auto opacity-85 items-center">
      <h1 className="mb-6 text-3xl font-semibold text-center">
        Contacta con nosotros
      </h1>
      <form className="flex flex-col gap-6 px-6">
        <div className="flex w-full">
          <UserCircleIcon className="h-6 w-6 me-2" />
          <input
            type="text"
            name="name"
            placeholder="Escribe tu nombre completo"
            className="w-full rounded-lg px-2 shadow-md shadow-gray-800 focus:outline-none focus:bg-emerald-100"
            autoFocus
          />
        </div>
        <div className="flex w-full justify-between flex-col md:flex-row gap-6">
          <div className="flex w-full md:w-[40%]">
            <PhoneIcon className="h-6 w-6 me-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono móvil"
              className="w-full rounded-lg px-2 shadow-md shadow-gray-800 focus:outline-none focus:bg-emerald-100"
            />
          </div>
          <div className="flex w-full md:w-[60%]">
            <AtSymbolIcon className="h-6 w-6 me-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-lg px-2 shadow-md shadow-gray-800 focus:outline-none focus:bg-emerald-100"
            />
          </div>
        </div>
        <div className="flex w-full">
          <DocumentTextIcon className="h-6 w-6 me-2" />
          <textarea
            type="text"
            name="message"
            placeholder="Mensaje"
            className="w-full rounded-lg px-2 shadow-md shadow-gray-800 focus:outline-none focus:bg-emerald-100 h-48"
          />
        </div>
        <div className="flex justity-between gap-10 justify-center">
          <input
            type="submit"
            value="Enviar"
            className="px-6 py-2 bg-emerald-400 rounded-xl text-gray-900 font-semibold shadow-md shadow-gray-800 hover:bg-emerald-500 hover:text-gray-100 transition duration-300"
          />
          <input
            type="reset"
            value="Cancelar"
            className="px-6 py-2 bg-red-400 rounded-xl text-gray-900 font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-100 transition duration-300"
            onClick={handleClick}
          />
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
