import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SecondNav = () => {
  const { auth } = useAuth();

  const navItems = [
    { text: "Conócenos", link: "/acerca" },
    { text: "Contacto", link: "/contacto" },
    { text: "Únete a nosotros", link: "/unete" },
  ];

  return (
    <nav
      className="flex items-center justify-between w-full sm:px-6 py-2 text-yellow-600"
      key={auth ? auth.id : "guest"}
    >
      <ul className="flex justify-center space-x-3 sm:space-x-6 sm:text-md md:text-lg">
        {navItems.map((item) => (
          <li key={item.text}>
            <NavLink
              className="inline-block hover:text-red-600 transform hover:scale-110 transition duration-200"
              to={item.link}
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        <Link
          to={auth.id ? "/perfil" : "/login"}
          state={auth.id ? { action: "profile" } : {}}
          className="px-2 sm:px-4 sm:text-lg xl:text-xl font-semibold hover:bg-yellow-600 rounded-xl sm:m-2 duration-300 hover:text-gray-900"
        >
          {auth.firstname ? `${auth.role}: ${auth.firstname}` : "Login"}
        </Link>
      </div>
    </nav>
  );
};

export default SecondNav;
