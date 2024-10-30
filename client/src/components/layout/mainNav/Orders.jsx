import PlaceOrder from "../public/PlaceOrder";
import useAuth from "../../../hooks/useAuth";
import GetAllOrders from "../private/GetAllOrders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const showAlert = (navigate) => {
    Swal.fire({
      title: "Pedidos:",
      text: "Debes estar registrado para poder realizarlo",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Inicia sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login", { state: { previousUrl: "/pedidos" } });
      } else if (result.isDismissed) {
        navigate('/');
      }
    });
  };

  return (
    <>
      {auth.id ? (
        auth.role === "admin" ? (
          <GetAllOrders />
        ) : (
          <PlaceOrder />
        )
      ) : (
        showAlert(navigate)
      )}
    </>
  );
};

export default Orders;
