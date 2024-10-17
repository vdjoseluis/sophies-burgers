import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const previousUrl = location.state?.previousUrl || "/";

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate(previousUrl);
  };
  return (
    <section className="bg-gray-300 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto opacity-85 items-center">
      <h1 className="mb-6 text-3xl font-semibold text-center">Inicia sesión</h1>
      <form
        className="flex flex-col gap-6 px-6 border-b-2"
        onSubmit={handleLogin}
      >
        <div className="input-group flex gap-10 justify-center">
          <AtSymbolIcon className="h-6 w-6" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Escribe tu email"
            className="w-full rounded-lg px-2 shadow-md shadow-gray-800 focus:outline-none focus:bg-emerald-100"
            autoFocus
          />
        </div>
        <div className="input-group flex gap-10 justify-center">
          <KeyIcon className="h-6 w-6" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            className="w-full rounded-lg px-2 shadow-md shadow-gray-800  focus:outline-none focus:bg-emerald-100"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="p-2 bg-emerald-400 rounded-xl text-gray-900 font-semibold shadow-md shadow-gray-800 hover:bg-emerald-500 hover:text-gray-100 transition duration-300"
        />
      </form>
      <p className="mt-8 mx-6">
        ¿ No tienes cuenta ?
        <Link to="/register" className="text-red-800 font-semibold hover:text-red-600">
          Regístrate
        </Link>
      </p>
      <p className="text-right mx-6">
        <Link to="/recordar" className="text-red-800 font-semibold hover:text-red-600">
          ¿ Has olvidado tu contraseña ?
        </Link>
      </p>
    </section>
  );
};

export default Login;
