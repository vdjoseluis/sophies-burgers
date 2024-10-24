import { useEffect, useState, useCallback } from "react";
import { ApiUrl } from "../../../helpers/ApiUrl";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import FormatDateTime from "../../../helpers/FormatDateTime";

const AllOrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("pending");

  const getAllOrders = useCallback(async () => {
    try {
      const response = await fetch(ApiUrl.url + "ticket/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        const ordersWithUser = await Promise.all(
          data.tickets.map(async (order) => {
            const user = await getUserById(order.user_id);
            return { ...order, user };
          })
        );
        setOrders(ordersWithUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const getUserById = async (userId) => {
    try {
      const response = await fetch(ApiUrl.url + `user/search?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Cargando pedidos...</div>;
  }

  const changeStatus = async (orderId) => {
    try {
      await fetch(ApiUrl.url + `ticket/update/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          status: "done",
        }),
      });
      getAllOrders();
    } catch (error) {
      console.log("Error al cambiar es estado:", error);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filterOrders =
    selectedOption === "all"
      ? orders
      : orders.filter((order) => order.status === selectedOption);

  return (
    <section className="bg-gray-900 bg-opacity-85 p-4 md:p-6 mt-6 mb-20 rounded-xl shadow-md shadow-gray-800 max-w-[80%] xl:max-w-[60%] mx-auto items-center text-center">
      <div className="flex md:flex-row flex-col items-center justify-between mb-6 border-b-2 pb-4">
        <h1 className="text-2xl text-yellow-600">Todos los pedidos</h1>
        <div className="flex items-center">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="options"
              value="pending"
              checked={selectedOption === "pending"}
              className="form-radio h-5 w-5"
              onChange={handleOptionChange}
            />
            <span className="mx-2 text-gray-100">Pendientes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="options"
              value="done"
              checked={selectedOption === "done"}
              className="form-radio h-5 w-5"
              onChange={handleOptionChange}
            />
            <span className="mx-2 text-gray-100">Completados</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="options"
              value="all"
              checked={selectedOption === "all"}
              className="form-radio h-5 w-5"
              onChange={handleOptionChange}
            />
            <span className="mx-2 text-gray-100">Todos</span>
          </label>
        </div>
      </div>
      <table className="min-w-full border-collapse border border-gray-200 my-6">
        <thead className="bg-amber-600">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Cliente</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Entrega</th>
            <th className="border border-gray-300 px-4 py-2">Fecha-Hora</th>
            <th className="border border-gray-300 py-2">Estado</th>
          </tr>
        </thead>

        <tbody>
          {filterOrders.map((order) => (
            <tr key={order.id} className="text-gray-100 hover:bg-gray-700">
              <td className="border border-gray-300 px-4 py-2">
                {order.user?.firstname + " " + order.user?.lastname}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.total} €
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.delivery_option === "pickup"
                  ? "Recogida"
                  : "A domicilio"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {FormatDateTime(order.createdAt)}
              </td>
              <td
                className={`${
                  order.status === "pending" && "text-yellow-400"
                } border border-gray-300 py-2`}
              >
                {order.status === "pending" ? (
                  <>
                    ¡ Pendiente !
                    <CheckCircleIcon
                      className="w-6 h-6 inline-block ml-4 text-green-500 cursor-pointer"
                      onClick={() => changeStatus(order.id)}
                    />
                  </>
                ) : (
                  "Completado"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AllOrdersAdmin;
