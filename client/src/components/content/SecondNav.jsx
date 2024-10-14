import { Link, NavLink } from "react-router-dom";

const SecondNav = () => {
  const navItems = [
    { text: "Conócenos", link: "/acerca" },
    { text: "Contacto", link: "/contacto" },
    { text: "Únete a nosotros", link: "/unete" },
  ];

  return (
    <nav className="flex items-center justify-between w-full px-6 py-2 text-emerald-400 ">
      <ul className="flex justify-center space-x-6 sm:text-lg xl:text-xl">
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
      <Link to="/login" className="px-4 sm:text-lg xl:text-xl hover:bg-emerald-400 rounded-xl m-2 duration-300 hover:text-gray-900">Login</Link>
    </nav>
  );
};

export default SecondNav;
