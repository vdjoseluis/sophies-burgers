import {
  AtSymbolIcon,
  KeyIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
  UserPlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import { ApiUrl } from "../../helpers/ApiUrl";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { deleteUser } from "../../helpers/ConfirmActions";

const ProfileForm = () => {
  const { auth, setAuth } = useAuth();
  const { form, changed, setForm } = useForm({});

  const navigate = useNavigate();
  const location = useLocation();
  const { action, userData } = location.state || { action: "profile" };

  useEffect(() => {
    if (userData) {
      setForm((prevForm) => ({
        ...prevForm,
        ...userData,
      }));
    } else if (auth && Object.keys(auth).length > 0 && action !== "register") {
      setForm((prevForm) => ({
        ...prevForm,
        ...auth,
      }));
    }
  }, [auth, setAuth, setForm, action, userData]);

  const handleCancel = () => {
    navigate("/");
  };
  const handleDelete = () => {
    Swal.fire({
      title: "¿ Estás seguro de eliminar tu cuenta ?",
      text: "Después no podrás recuperarla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userData ? userData.id : auth.id, navigate, auth);
      }
    });
  };

  const validateAddress = async (address) => {
    const response = await fetch(ApiUrl.url + "user/validate-address", {
      method: "POST",
      body: JSON.stringify({address}),     
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Dirección no válida");
    const data = await response.json();
    return data;
  };

  const confirmUserData = async (form, validatedAddress) => {
    return Swal.fire({
      title: "Revisa si tus datos son correctos",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
      html: `<ul>
               <li>Nombre: ${form.firstname} ${form.lastname}</li>
               <li>Correo: ${form.email}</li>
               <li>Teléfono: ${form.phone}</li>
               <li>Dirección: ${validatedAddress}</li>
             </ul>`,
    });
  };

  const registerOrUpdateUser = async (url, method, body, navigate) => {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    if (data.status === "success") {
      Swal.fire({
        title:
          method === "POST"
            ? `Bienvenid@, ${body.firstname}`
            : "Actualizado correctamente",
        text: method === "POST" ? "Ya puedes iniciar sesión" : "",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        navigate(method === "POST" ? "/login" : "/");
      });
    } else {
      Swal.fire({
        title: "Error en los datos del usuario. Por favor, intenta de nuevo",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedAddress = await validateAddress(form.address);
      console.log(form.address, validatedAddress);

      const confirmResult = await confirmUserData(form, validatedAddress.formattedAddress);
      if (!confirmResult.isConfirmed) return;

      form.address = validatedAddress.formattedAddress;
      if (validatedAddress.locality === "Colmenar" || validatedAddress.locality === "Málaga") {
        form.deliveryEnabled = true;
      }

      if (action === "register") {
        await registerOrUpdateUser(
          ApiUrl.url + "user/register",
          "POST",
          form,
          navigate
        );
      } else {
        const userId = userData ? userData.id : auth.id;
        await registerOrUpdateUser(
          ApiUrl.url + `user/update/${userId}`,
          "PUT",
          form,
          navigate
        );
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-md md:max-w-3xl mx-auto items-center">
      <div className=" flex justify-between items-center mb-6 pb-6 border-b-2 border-yellow-500">
        {action !== "register" && (
          <>
            {!userData && (
              <span
                className="flex gap-2 items-center rounded-lg px-4 text-red-500 text-lg hover:bg-red-500 hover:text-white cursor-pointer"
                onClick={() => {
                  navigate("/logout");
                }}
              >
                <XCircleIcon className="h-10 w-10" />
                Cerrar sesión
              </span>
            )}
          </>
        )}

        <h1 className="text-3xl font-semibold text-yellow-500 ">
          {action === "register"
            ? "Registro de nuevo socio"
            : "Datos del usuario"}
        </h1>
      </div>
      <form className="flex flex-col gap-10 px-6" onSubmit={handleSubmit}>
        <div className="flex w-full justify-between flex-col md:flex-row gap-6">
          <div className="flex w-full md:w-[55%] items-center">
            <AtSymbolIcon className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              value={form.email || ""}
              onChange={changed}
              autoFocus
              required
            />
          </div>
          <div className="flex w-full md:w-[45%] items-center">
            <KeyIcon className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              value={form.password || ""}
              onChange={changed}
              required
            />
          </div>
        </div>
        <div className="flex w-full justify-between flex-col md:flex-row gap-6">
          <div className="flex w-full items-center">
            <UserCircleIcon className="icon" />
            <input
              type="text"
              name="firstname"
              placeholder="Nombre"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              value={form.firstname || ""}
              onChange={changed}
              required
            />
          </div>
          <div className="flex w-full items-center">
            <UserPlusIcon className="icon" />
            <input
              type="text"
              name="lastname"
              placeholder="Apellidos"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              value={form.lastname || ""}
              onChange={changed}
              required
            />
          </div>
        </div>

        <div className="flex w-full items-center">
          <MapPinIcon className="icon" />
          <input
            type="text"
            name="address"
            placeholder="Dirección: Calle nombre, número, localidad"
            className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
            value={form.address || ""}
            onChange={changed}
            required
          />
        </div>
        <div className="flex w-full justify-between items-center flex-col md:flex-row gap-6">
          <div className="flex w-full md:w-[40%]">
            <PhoneIcon className="icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono móvil"
              className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
              value={form.phone || ""}
              onChange={changed}
              required
            />
          </div>
          {action !== "register" && (
            <button
              type="button"
              className="rounded-md text-amber-400 font-semibold text-lg hover:bg-red-400 hover:text-white hover:px-6"
              onClick={handleDelete}
            >
              {userData ? "Eliminar cuenta" : "Darse de baja"}
            </button>
          )}
        </div>

        <div className="flex justity-between gap-10 justify-center">
          {action === "register" ? (
            <>
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
            </>
          ) : (
            <input
              type="submit"
              value="Actualizar"
              className="w-32 py-2 rounded-xl bg-green-600 text-white hover:bg-green-400 hover:text-gray-900 font-semibold shadow-md shadow-gray-800 transition duration-300"
            />
          )}
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
