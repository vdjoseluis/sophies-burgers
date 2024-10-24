import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    setAuth(null);
    navigate("/");
    window.location.reload();
  });
  return <h1>Cerrando sesión...</h1>;
};

export default Logout;
