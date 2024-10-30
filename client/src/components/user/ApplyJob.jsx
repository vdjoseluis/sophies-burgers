import {
  AtSymbolIcon,
  MapPinIcon,
  PaperClipIcon,
  PhoneIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { ApiUrl } from "../../helpers/ApiUrl";
import Swal from "sweetalert2";

const ApplyJob = () => {
  const { form, changed } = useForm();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    const fileInput = document.getElementById("file0");
    const file = fileInput.files[0];
  
    if (file) {
      formData.append("file0", file); 
    }
  
    const emailPromise = fetch(ApiUrl.url + "contact/job", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const filePromise = file
      ? fetch(ApiUrl.url + "user/upload-cv", {
          method: "POST",
          body: formData,
        })
      : Promise.resolve({ status: "success" }); 
  
    try {
      const [emailResponse, fileResponse] = await Promise.all([
        emailPromise,
        filePromise,
      ]);
  
      const emailData = await emailResponse.json();
      if (emailData.status !== "success") {
        Swal.fire({
          title: "Error al enviar el correo",
          text: emailData.message || "Por favor, intenta de nuevo.",
          icon: "error",
        });
        return; 
      }
  
      if (file) {
        const fileData = await fileResponse.json();
        if (fileData.status !== "success") {
          Swal.fire({
            title: "Error al cargar el archivo",
            text: fileData.message || "Por favor, intenta de nuevo.",
            icon: "error",
          });
        }
      }
  
      Swal.fire({
        title: "Gracias por contactarnos",
        text: "Te hemos enviado un correo de confirmación." + (file ? " Tu CV ha sido recibido." : ""),
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        navigate("/"); 
      });
    } catch (error) {
      console.log("Error al enviar los datos -", error);
      Swal.fire({
        title: "Archivo no válido",
        text: "Por favor, intenta de nuevo.",
        icon: "error",
      });
    }
  };
  

  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-md md:max-w-3xl mx-auto items-center">
      <h1 className="mb-6 text-3xl font-semibold text-center text-yellow-500">
        Únete a nuestra gran familia
      </h1>
      <p className="text-center text-lg mb-6 text-gray-100">
        Rellena este formulario de inscripción y contactaremos contigo lo antes
        posible.
      </p>
      <form className="flex flex-col gap-6 px-6" onSubmit={handleSubmit}>
        <div className="flex w-full justify-between flex-col md:flex-row gap-6">
          <div className="flex w-full">
            <UserCircleIcon className="icon" />
            <input
              type="text"
              name="firstname"
              placeholder="Nombre"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              onChange={changed}
              autoFocus
              required
            />
          </div>
          <div className="flex w-full">
            <UserPlusIcon className="icon" />
            <input
              type="text"
              name="lastname"
              placeholder="Apellidos"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              onChange={changed}
              required
            />
          </div>
        </div>
        <div className="flex w-full">
          <MapPinIcon className="icon" />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
            onChange={changed}
            required
          />
        </div>
        <div className="flex w-full justify-between flex-col md:flex-row gap-6">
          <div className="flex w-full md:w-[40%]">
            <PhoneIcon className="icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono móvil"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              onChange={changed}
              required
            />
          </div>
          <div className="flex w-full md:w-[60%]">
            <AtSymbolIcon className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              onChange={changed}
              required
            />
          </div>
        </div>
        <div className="flex w-full">
          <PaperClipIcon className="icon" />
          <input
            type="file"
            name="file0"
            id="file0"
            className="w-full border rounded-lg p-2 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
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

export default ApplyJob;
