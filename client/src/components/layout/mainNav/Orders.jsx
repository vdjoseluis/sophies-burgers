import GoToLoginCard from "../../content/GoToLoginCard";
import PlaceOrder from "../public/PlaceOrder";
import useAuth from "../../../hooks/useAuth";
import AllOrdersAdmin from "../private/AllOrdersAdmin";

const Orders = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.id ? (
        auth.role === "admin" ? (
          <AllOrdersAdmin />
        ) : (
          <PlaceOrder />
        )
      ) : (
        <GoToLoginCard
          title="Tu pedido:"
          text="Debes iniciar sesión para poder realizarlo."
        />
      )}
    </>
  );
};

export default Orders;
