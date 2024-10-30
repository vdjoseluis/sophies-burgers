import { useEffect, useState, useCallback } from "react";
import { ApiUrl } from "../../../helpers/ApiUrl";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { formatDateTime } from "../../../helpers/FormatDateTime";

const GetAllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("active");

  const getAllBookings = useCallback(async () => {
    try {
      const response = await fetch(ApiUrl.url + "booking/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        const bookingsWithUser = await Promise.all(
          data.bookings.map(async (booking) => {
            const user = await getUserById(booking.user_id);
            return { ...booking, user };
          })
        );
        setBookings(bookingsWithUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

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

  const changeStatus = async (bookingId) => {
    try {
      await fetch(ApiUrl.url + `booking/changestatus/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          status: "done",
        }),
      });
      getAllBookings();
    } catch (error) {
      console.log("Error al cambiar es estado:", error);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filterBookings =
    selectedOption === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === selectedOption);

  return (
    <section className="bg-gray-900 bg-opacity-85 p-4 md:p-6 mt-6 mb-20 rounded-xl shadow-md shadow-gray-800 max-w-[80%] xl:max-w-[60%] mx-auto items-center text-center">
      <div className="flex md:flex-row flex-col items-center justify-between mb-6 border-b-2 pb-4">
        <h1 className="text-2xl text-yellow-600">Todos los Reservas</h1>
        <div className="flex mt-2 md:mt-0 items-center">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="options"
              value="active"
              checked={selectedOption === "active"}
              className="form-radio h-5 w-5"
              onChange={handleOptionChange}
            />
            <span className="mx-2 text-gray-100">Activas</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="options"
              value="cancelled"
              checked={selectedOption === "cancelled"}
              className="form-radio h-5 w-5"
              onChange={handleOptionChange}
            />
            <span className="mx-2 text-gray-100">Canceladas</span>
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
            <span className="mx-2 text-gray-100">Finalizadas</span>
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
            <span className="mx-2 text-gray-100">Todas</span>
          </label>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-200 my-6 cursor-default">
        <thead className="bg-amber-600">
          <tr>
            <th className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
              Mesa
            </th>
            <th className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
              Cliente
            </th>
            <th className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
              Fecha - Hora
            </th>
            <th className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
              Personas
            </th>
            <th className="border border-gray-300 py-2 text-xs xl:text-lg">
              Estado
            </th>
          </tr>
        </thead>

        <tbody>
        {filterBookings.length === 0 && <tr className="text-gray-100 text-lg"><td>No hay reservas</td></tr>}
          {filterBookings.map((booking) => (
            <tr key={booking.id} className="text-gray-100 hover:bg-gray-700">
              <td className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
                {booking.table_id}
              </td>
              <td className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
                {booking.user?.firstname + " " + booking.user?.lastname}
              </td>
              <td className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
                {formatDateTime(
                  `${booking.date_booking} ${booking.time_booking}`
                )}
              </td>
              <td className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
                {booking.people}
              </td>
              <td
                className={`${
                  booking.status === "active" &&
                  "text-yellow-400 text-xs xl:text-lg"
                } border border-gray-300 py-2`}
              >
                {booking.status === "active" && (
                  <>
                    Confirmada
                    <CheckCircleIcon
                      className="w-5 xl:w-6 h-5 xl:h-6 inline-block xl:ml-4 text-green-500 cursor-pointer"
                      onClick={() => changeStatus(booking.id)}
                    />
                  </>
                )}
                {booking.status === "cancelled" && "Cancelada"}
                {booking.status === "done" && "Finalizada"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default GetAllBookings;
