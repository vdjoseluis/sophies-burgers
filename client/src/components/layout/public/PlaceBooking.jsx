import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetMyBookings from "../../content/GetMyBookings";
import Swal from "sweetalert2";
import { formatDate } from "../../../helpers/FormatDateTime";
import { placeBooking } from "../../../helpers/ConfirmActions";

const PlaceBooking = () => {
  const navigate = useNavigate();
  const getMinTime = () => {
    const now = new Date();
    const minutes = now.getMinutes();

    if (minutes < 30) {
      now.setMinutes(30);
      now.setHours(now.getHours() + 1);
    } else {
      now.getHours() <= 8
        ? now.setHours(now.getHours() + 3)
        : now.setHours(now.getHours() + 2);
      now.setMinutes(0);
    }

    const adjustedHours = now.getHours().toString().padStart(2, "0");
    const adjustedMinutes = now.getMinutes().toString().padStart(2, "0");
    return `${adjustedHours}:${adjustedMinutes}`;
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(getMinTime());
  const [people, setPeople] = useState(2);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handlePeopleChange = ({ target: { value } }) => {
    setPeople(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.people.value);
    Swal.fire({
      title: "Confirma tu reserva para:",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      html: `
      <ul class="text-center">
            <li>Fecha: ${formatDate(selectedDate)}</li>
            <li>Hora: ${selectedTime}</li>
            <li>Personas: ${people}</li>
          </ul>
          <br>
          `,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        placeBooking(selectedDate, selectedTime, people, navigate);
      }
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main className="flex flex-wrap items-baseline px-auto xl:px-36 pt-2 sm:pt-10 justify-evenly">
      <section className="bg-gray-900 bg-opacity-75 p-4 sm:px-10 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-lg items-center">
        <h1 className="mb-6 text-3xl text-center font-semibold text-amber-500 border-b-2 pb-4">
          Reservar una mesa:
        </h1>
        <form
          className="flex flex-col px-20 text-gray-100 text-lg gap-4"
          onSubmit={handleSubmit}
        >
          Fecha:
          <input
            type="date"
            name="date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]}
            className="bg-gray-300 border rounded-lg p-2 text-center shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 text-gray-800 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
            onChange={handleDateChange}
            autoFocus
          />
          Hora:
          <input
            type="time"
            name="time"
            value={selectedTime}
            min={
              selectedDate === new Date().toISOString().split("T")[0]
                ? getMinTime()
                : "10:30"
            }
            max={"22:30"}
            onChange={handleTimeChange}
            className="bg-gray-300 border rounded-lg p-2 text-center shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 text-gray-800 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
          />
          Número de personas:
          <input
            type="number"
            name="people"
            min={2}
            max={8}
            value={people}
            onChange={handlePeopleChange}
            className="bg-gray-300 border rounded-lg p-2 text-center shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 text-gray-800 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
          />
          <div className="flex flex-wrap gap-6 justify-center my-6 ">
            <input
              type="submit"
              value="Confirmar"
              className="w-full sm:w-28 py-2 rounded-xl bg-green-600 text-white hover:bg-green-400 hover:text-gray-900 font-semibold shadow-md shadow-gray-800 transition duration-300"
            />
            <input
              type="reset"
              value="Salir"
              className="w-full sm:w-28 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-900 transition duration-300"
              onClick={handleCancel}
            />
          </div>
        </form>
      </section>
      <GetMyBookings />
    </main>
  );
};

export default PlaceBooking;
