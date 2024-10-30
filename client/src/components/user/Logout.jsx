import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Logout = () => {
  const { setAuth, authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "Cerrando sesión...",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      localStorage.clear();
      setAuth({});
      authUser();
      navigate("/");
    });
  }, [setAuth, authUser, navigate]);
  return null;
};

export default Logout;
