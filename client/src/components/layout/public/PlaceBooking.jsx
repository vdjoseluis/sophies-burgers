import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaceBooking = () => {
  const navigate = useNavigate();
  const getMinTime = () => {
    const now = new Date();
    const minutes = now.getMinutes();

    if (minutes < 30) {
      now.setMinutes(30);
      now.setHours(now.getHours() + 1);
    } else {
      now.setHours(now.getHours() + 1); // Sumar una hora
      now.setMinutes(0);
    }

    const adjustedHours = now.getHours().toString().padStart(2, "0"); // Ajustar horas a 2 dígitos
    const adjustedMinutes = now.getMinutes().toString().padStart(2, "0"); // Ajustar minutos a 2 dígitos
    return `${adjustedHours}:${adjustedMinutes}`; // Devolver en formato hh:mm
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 sm:px-10 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto items-center">
      <h1 className="mb-6 text-3xl text-center font-semibold text-yellow-500 border-b-2 pb-4">
        Reservar una mesa:
      </h1>
      <form className="flex flex-col px-20 text-gray-100 text-lg gap-4">
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
        <div className="flex flex-wrap gap-6 justify-center my-6">
          <input
            type="submit"
            value="Reservar"
            className="w-28 py-2 rounded-xl bg-green-600 text-white hover:bg-green-400 hover:text-gray-900 font-semibold shadow-md shadow-gray-800 transition duration-300"
          />
          <input
            type="reset"
            value="Cancelar"
            className="w-28 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-900 transition duration-300"
            onClick={handleCancel}
          />
        </div>
      </form>
    </section>
  );
};

export default PlaceBooking;
