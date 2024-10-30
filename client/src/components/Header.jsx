import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import NavBar from "./content/NavBar";
import SecondNav from "./content/SecondNav";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const {auth} = useAuth();
  return (
    <header className="px-4 bg-gray-900 text-white">
      <div className="flex items-center justify-between border-b-2 border-white ">
        <div className="flex items-center">
          {/* Logo */}
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              className="w-auto h-20 ps-4"
            />
          </NavLink>
          {/* Título alineado a la izquierda del logo */}
          {/* <div className="text-green-600 text-2xl lg:text-5xl font-bold ms-4">
            Sophie&apos;s Burgers
          </div> */}
          <h1 className="text-white">{auth?.name}</h1>
        </div>
        {/* NavBar */}
        <NavBar />
      </div>

      {/* SecondNav */}
      <SecondNav />
    </header>
  );
};

export default Header;
