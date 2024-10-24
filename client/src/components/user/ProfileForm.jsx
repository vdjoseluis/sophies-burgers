import {
  AtSymbolIcon,
  KeyIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import { ApiUrl } from "../../helpers/ApiUrl";
import { useEffect, useState } from "react";

const ProfileForm = () => {
  const { auth } = useAuth();
  const { form, changed, setForm } = useForm({});
  const [saved, setSaved] = useState("not_saved");

  const navigate = useNavigate();
  const location = useLocation();
  const { action } = location.state || { action: "profile" };

  useEffect(() => {
    if (auth && action !== "register") {
      setForm((prevForm) => ({
        ...prevForm,
        ...auth,
      }));
    }
  }, [auth, setForm, action]);

  const handleCancel = () => {
    navigate("/");
  };
  const handleDelete = () => {
    navigate("/confirmar", {
      state: {
        textTitle: "¿Estas seguro de eliminar tu cuenta?",
        action: "delete",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "register") {
      const request = await fetch(ApiUrl.url + "user/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.status === "success") {
        setSaved("saved");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setSaved("error");
      }
    } else {
      const request = await fetch(ApiUrl.url + "user/update/" + auth.id, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await request.json();
      if (data.status === "success") {
        setSaved("updated");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setSaved("error");
      }
    }
  };

  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-md md:max-w-3xl mx-auto items-center">
      {saved === "saved" && (
        <p className="bg-green-500 border border-green-600 text-white mb-6 p-2">
          ¡ Bienvenid@, {form.firstname}, registrado correctamente !
        </p>
      )}
      {saved === "updated" && (
        <p className="bg-green-500 border border-green-600 text-white mb-6 p-2">
          ¡ Actualizado correctamente !
        </p>
      )}
      <h1 className="mb-6 text-3xl font-semibold text-center text-yellow-500 pb-6 border-b-2 border-yellow-500">
        {action === "register"
          ? "Registro de nuevo socio"
          : "Datos del usuario"}
      </h1>
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
            placeholder="Dirección"
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
              Darse de baja
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
            <>
              <input
                type="submit"
                value="Actualizar"
                className="w-32 py-2 rounded-xl bg-green-600 text-white hover:bg-green-400 hover:text-gray-900 font-semibold shadow-md shadow-gray-800 transition duration-300"
              />
              <input
                type="reset"
                value="Cerrar sesión"
                className="w-32 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-900 transition duration-300"
                onClick={() => {
                  navigate("/logout");
                }}
              />
            </>
          )}
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
