import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { pathname } = useLocation();

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { text: "Carta", link: "/carta" },
    { text: "Menús", link: "/menus" },
    { text: "Pedidos", link: "/pedidos" },
    { text: "Reservas", link: "/reservas" },
    { text: "Socios", link: "/socios" },
  ];

  return (
    <nav>
      {/* Menú de navegación */}
      <ul className="hidden md:flex">
        {navItems
          .filter((item) => item.link !== pathname)
          .map((item, index) => (
            <li key={index}>
              <NavLink
                className="p-4 hover:bg-yellow-600 sm:text-md xl:text-lg rounded-xl m-2 duration-300 hover:text-gray-900"
                to={item.link}
              >
                {item.text}
              </NavLink>
            </li>
          ))}
      </ul>

      {/* Botón para abrir/cerrar el menú móvil */}
      <div onClick={handleNav} className="block md:hidden p-4">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Overlay para fondo oscuro al abrir el menú móvil */}
      {nav && (
        <div
          className="fixed inset-0 bg-gray-900 opacity-80 z-10"
          onClick={handleNav} 
        ></div>
      )}

      {/* Menú móvil */}
      <ul
        className={`${
          nav
            ? "fixed left-0 top-0 w-[80%] h-full border-r border-gray-900 bg-gray-900 ease-in-out duration-500 z-20"
            : "fixed top-0 bottom-0 left-[-100%] w-[80%] ease-in-out duration-500"
        } md:hidden`}
      >
        <NavLink to="/">
          <img src={logo} alt="logo" className="h-20 rounded-full" />
        </NavLink>

        {navItems.map((item, index) => (
          <li
            key={index}
            className="p-4 border-b rounded-xl text-lg tracking-wider hover:bg-yellow-600 duration-300 hover:text-gray-900 cursor-pointer border-gray-600"
          >
            <NavLink className="ms-4" to={item.link} onClick={handleNav}>
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
