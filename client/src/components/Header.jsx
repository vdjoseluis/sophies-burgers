import logo from "../assets/svgs/logoSophie.svg";
import { NavLink } from "react-router-dom";
import NavBar from "./content/NavBar";
import SecondNav from "./content/SecondNav";

const Header = () => {
  return (
    <header className="px-4 bg-gray-900 text-emerald-100">
      <div className="flex items-center justify-between border-b-2 border-emerald-400">
        {/* Contenedor del logo y título */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-auto rounded-full" />
          </NavLink>

          {/* Título alineado a la izquierda del logo */}
          <div className="titleHeader text-emerald-400 text-2xl lg:text-5xl font-bold">
            Sophie&apos;s Burgers
          </div>
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
