import {
  AtSymbolIcon,
  DocumentTextIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { ApiUrl } from "../../../helpers/ApiUrl";
import Swal from "sweetalert2";

const ContactUs = () => {
  const { form, changed } = useForm({});

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(ApiUrl.url + "contact/submit", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.status === "success") {
        Swal.fire({
          title: "Gracias por contactarnos",
          text: "Te hemos enviado un correo de confirmación.",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Por favor, intenta de nuevo.",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log("Error al enviar el mensaje -", error);
    }
  };

  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-md md:max-w-2xl mx-auto items-center">
      <h1 className="mb-6 text-3xl font-semibold text-center text-yellow-500">
        Contacta con nosotros
      </h1>
      <form className="flex flex-col gap-6 px-6" onSubmit={handleSubmit}>
        <div className="flex w-full">
          <UserCircleIcon className="icon" />
          <input
            type="text"
            name="name"
            placeholder="* Escribe tu nombre completo"
            className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
            onChange={changed}
            required
            autoFocus
          />
        </div>
        <div className="flex w-full justify-between flex-col md:flex-row gap-6">
          <div className="flex w-full md:w-[45%]">
            <PhoneIcon className="icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono móvil (opcional)"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              onChange={changed}
            />
          </div>
          <div className="flex w-full md:w-[55%]">
            <AtSymbolIcon className="icon" />
            <input
              type="email"
              name="email"
              placeholder="* Email"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              onChange={changed}
              required
            />
          </div>
        </div>
        <div className="flex w-full">
          <DocumentTextIcon className="icon" />
          <textarea
            type="text"
            name="message"
            placeholder="* Mensaje"
            className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100 h-48"
            onChange={changed}
            required
          />
        </div>
        <div className="flex justity-between gap-10 justify-center">
          <input
            type="submit"
            value="Enviar"
            className="w-32 py-2 rounded-xl bg-green-600 text-white hover:bg-green-400 hover:text-gray-900 font-semibold shadow-md shadow-gray-800 transition duration-300"
          />
          <input
            type="reset"
            value="Cancelar"
            className="w-32 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-900 transition duration-300"
            onClick={handleCancel}
          />
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
