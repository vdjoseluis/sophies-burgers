import { useState } from "react";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { ApiUrl } from "../../helpers/ApiUrl";

const Login = () => {
  const { form, changed } = useForm({});
  const [logged, setLogged] = useState("not_logged");
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const previousUrl = location.state?.previousUrl || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const userToLogin = form;

    const request = await fetch(ApiUrl.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    if (data.status === "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuth(data.user);
      setLogged("login");
      setTimeout(() => {
        navigate(previousUrl, { replace: true });
        window.location.reload();
      }, 2000);
    } else {
      setLogged("error");
    }
  };
  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto items-center">
      <h1 className="mb-6 text-3xl font-semibold text-center text-yellow-500">
        Inicia sesión
      </h1>
      {logged === "login" ? (
        <p className="bg-green-500 border border-green-600 text-white mb-6 p-2">
          ¡ Usuario identificado correctamente !
        </p>
      ) : (
        ""
      )}

      {logged === "error" ? (
        <p className="bg-red-500 border border-red-600 text-white mb-6 p-2">
          ¡ Usuario o contraseña incorrectos !
        </p>
      ) : (
        ""
      )}

      <form className="flex flex-col gap-10 px-6" onSubmit={handleLogin}>
        <div className="input-group flex gap-10 justify-center">
          <AtSymbolIcon className="icon" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Escribe tu email"
            className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
            onChange={changed}
            autoFocus
          />
        </div>
        <div className="input-group flex gap-10 justify-center">
          <KeyIcon className="icon" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
            onChange={changed}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="p-2 bg-green-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-green-400 hover:text-gray-900 transition duration-300"
        />
      </form>
      <p className="mt-8 mx-6 text-amber-300 text-lg">
        ¿ No tienes cuenta ?&nbsp;
        <Link
          to="/perfil"
          state={{ action: "register" }}
          className="text-green-400 font-semibold text-lg hover:text-green-300"
        >
          Regístrate
        </Link>
      </p>
      <p className="text-right mx-6 mt-4">
        <Link
          to="/perfil/recordar"
          className="text-red-400 text-lg font-semibold hover:text-red-300"
        >
          ¿ Has olvidado tu contraseña ?
        </Link>
      </p>
    </section>
  );
};

export default Login;
