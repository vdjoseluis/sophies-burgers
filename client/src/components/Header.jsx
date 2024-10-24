import logo from "../assets/logoSophie.png";
import { NavLink } from "react-router-dom";
import NavBar from "./content/NavBar";
import SecondNav from "./content/SecondNav";

const Header = () => {

  return (
    <header className="px-4 bg-gray-900 text-white">
      <div className="flex items-center justify-between border-b-2 border-white ">
        {/* Contenedor del logo y título */}
          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-auto h-20 ps-4" />
          </NavLink>

          {/* Título alineado a la izquierda del logo */}
          {/* <div className="titleHeader text-emerald-400 text-2xl lg:text-5xl font-bold">
            Sophie&apos;s Burgers
          </div> */}

        {/* NavBar */}
        <NavBar />
      </div>
      
      {/* SecondNav */}
      <SecondNav />
    </header>
  );
};



export default Header;
