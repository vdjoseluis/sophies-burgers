import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import NavBar from "./content/NavBar";
import SecondNav from "./content/SecondNav";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { auth } = useAuth();
  return (
    <header className="px-4 bg-gray-900 text-white">
      <div className="flex items-center justify-between border-b-2 border-white ">
        <div className="flex items-center">
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-auto h-20 ps-4" />
          </NavLink>
          <h1 className="text-white">{auth?.name}</h1>
        </div>
        <NavBar />
      </div>

      <SecondNav />
    </header>
  );
};

export default Header;
