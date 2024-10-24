import { useLocation, useNavigate } from "react-router-dom";
import { ApiUrl } from "../../helpers/ApiUrl";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const ConfirmCard = () => {
  const [completed, setCompleted] = useState("none");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { textTitle, action, selectedOption, orderItems, total } =
    location.state || {
      textTitle: "",
      orderItems: [],
      total: 0,
    };

  const handleConfirm = async () => {
    if (action === "delete") {
      const request = await fetch(ApiUrl.url + "user/delete/" + auth.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await request.json();
      if (data.status === "success") {
        setCompleted("deleted");
        setTimeout(() => {
          navigate("/logout");
        }, 3000);
      }
    } else if (action === "order") {
      const request = await fetch(ApiUrl.url + "ticket/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          delivery_option: selectedOption,
          items: orderItems,
        }),
      });
      const data = await request.json();
      if (data.status === "success") {
        setCompleted("order-placed");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } else {
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 mt-6 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto items-center">
      {completed === "deleted" && (
        <p className="bg-yellow-500 border border-yellow-600 text-black mb-6 p-2">
          ¡ Sentimos que te vayas ! Tu cuenta se ha eliminado.
        </p>
      )}
      {completed === "order-placed" && (
        <p className="bg-yellow-500 border border-yellow-600 text-black mb-6 p-2">
          Gracias por realizar tu pedido.&nbsp;
          <span>
            {selectedOption === "pickup"
              ? "En breve podrás pasar a recogerlo."
              : "En breve contactaremos para la entrega."}
          </span>
        </p>
      )}
      <h1 className="mb-6 text-2xl font-semibold text-center text-yellow-500">
        {textTitle}
      </h1>
      {action === "order" && (
        <>
          <table className="min-w-full border-collapse border border-gray-200 my-6">
            {orderItems.map((item) => (
              <tr key={item.id} className="text-gray-100 hover:bg-gray-700 ">
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">{`${item.price.toFixed(
                  2
                )} €`}</td>
              </tr>
            ))}
          </table>

          <p className="text-xl font-semibold text-right mb-6 me-4 text-gray-300">
            Total a pagar: {total.toFixed(2)} €
          </p>
        </>
      )}

      <div className="flex justify-center items-center p-6 gap-20">
        <button
          className="w-36 py-2 rounded-xl bg-green-600 text-white hover:bg-green-400 hover:text-gray-900 font-semibold shadow-md shadow-gray-800 transition duration-300"
          onClick={handleConfirm}
        >
          Sí
        </button>
        <button
          className="w-36 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-900 transition duration-300"
          onClick={handleCancel}
        >
          No
        </button>
      </div>
    </section>
  );
};

export default ConfirmCard;
