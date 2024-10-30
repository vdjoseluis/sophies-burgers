import useAuth from "../../../hooks/useAuth";
import PlaceBooking from "../public/PlaceBooking";
import GetAllBookings from "../private/GetAllBookings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Bookings = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const showAlert = (navigate) => {
    Swal.fire({
      title: "Reservas:",
      text: "Debes estar registrado para poder realizarla",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Inicia sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login', { state: { previousUrl: "/reservas" } });
      } else if (result.isDismissed) {
        navigate('/');
      }
    });
  };
  return (
    <>
      {auth.id ? (
        auth.role === "admin" ? (
          <GetAllBookings />
        ) : (
          <PlaceBooking />
        )
      ) : (
        showAlert(navigate)
      )}
    </>
  );
};

export default Bookings;
