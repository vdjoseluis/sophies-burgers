import { ApiUrl } from "../helpers/ApiUrl";
import Swal from "sweetalert2";

const deleteUser = async (userId, navigate, auth) => {
  const request = await fetch(ApiUrl.url + "user/delete/" + userId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });

  const data = await request.json();
  if (data.status === "success") {
    Swal.fire({
      title: "Tu cuenta ha sido eliminada",
      text: "Sentimos mucho que te vayas",
      icon: "success",
    }).then(() => {
      auth.id === userId ? navigate("/logout") : navigate("/");
    });
  }
};

const placeOrder = async (orderItems, selectedOption, navigate, total) => {
  const request = await fetch(ApiUrl.url + "ticket/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      delivery_option: selectedOption,
      items: orderItems,
      total: total,
    }),
  });
  const data = await request.json();
  if (data.status === "success") {
    Swal.fire({
      title: `${
        selectedOption === "pickup"
          ? "En breve podrás pasar a recogerlo."
          : "En breve contactaremos para la entrega."
      }`,
      icon: "success",
    }).then(() => {
      navigate("/");
    });
  }
};

const placeBooking = async (selectedDate, selectedTime, people, navigate) => {
  const request = await fetch(ApiUrl.url + "booking/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      date_booking: selectedDate,
      time_booking: selectedTime,
      people: people,
    }),
  });
  const data = await request.json();
  if (data.status === "success") {
    Swal.fire({
      title: `¡ Reserva confirmada !`,
      icon: "success",
    }).then(() => {
      navigate("/");
    });
  }
};

export { deleteUser, placeOrder, placeBooking };
