import GoToLoginCard from "../../content/GoToLoginCard";
import useAuth from "../../../hooks/useAuth";
import PlaceBooking from "../public/PlaceBooking";

const Bookings = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth.id ? (
        <PlaceBooking />
      ) : (
        <GoToLoginCard
          title="¡ Haz tu reserva !"
          text="Debes estar registrado para poder realizarla"
        />
      )}
    </>
  );
};

export default Bookings;
