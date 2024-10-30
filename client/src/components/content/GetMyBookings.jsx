import { useState, useEffect } from "react";
import { ApiUrl } from "../../helpers/ApiUrl";
import {formatDate} from "../../helpers/FormatDateTime";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
const GetMyBookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyBookings = async () => {
      try {
        const response = await fetch(ApiUrl.url + "booking/mybookings", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error en el servidor");
        }
        const data = await response.json();
        setMyBookings(data.bookings);
      } catch (error) {
        console.log("Error al obtener mis reservas:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyBookings();
  }, []);
  if (loading) {
    return <div className="text-gray-100">Cargando tus reservas...</div>;
  }

  const changeStatus = async (bookingId) => {
    try {
      const response = await fetch(
        ApiUrl.url + `booking/changestatus/${bookingId}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "cancelled",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error en el servidor");
      }
      const data = await response.json();
      setMyBookings(data.bookings);
    } catch (error) {
      console.log("Error al cambiar el estado de la reserva:", error);
    }
  };

  return (
    <aside className="bg-gray-900 bg-opacity-75 p-4 sm:px-10 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl items-center">
      <h1 className="mb-6 text-3xl text-center font-semibold text-amber-500 border-b-2 pb-4">
        Mis reservas
      </h1>
      <table className="min-w-full border-collapse border border-gray-200 my-6 text-center">
        <thead className="bg-amber-600">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Hora</th>
            <th className="border border-gray-300 px-4 py-2">Personas</th>
          </tr>
        </thead>
        <tbody>
          {myBookings.length < 1 ? (
            <tr>
              <td colSpan="3" className="text-gray-100 text-xl py-2">
                No tienes reservas
              </td>
            </tr>
          ) : (
            myBookings.map((booking) => (
              <tr key={booking.id} className="text-gray-100 hover:bg-gray-600">
                <td className="border border-gray-300 px-2 py-2">
                  <MinusCircleIcon
                    className="w-6 h-6 inline-block bg-red-500 rounded-full cursor-pointer me-4"
                    onClick={() => changeStatus(booking.id)}
                  />
                  {formatDate(booking.date_booking)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {booking.time_booking}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {booking.people}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </aside>
  );
};

export default GetMyBookings;
