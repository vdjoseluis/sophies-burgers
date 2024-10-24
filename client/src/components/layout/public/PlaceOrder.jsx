import { useEffect, useState } from "react";
import { ApiUrl } from "../../../helpers/ApiUrl";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("pickup");
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(ApiUrl.url + "product/list", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) {
    return <div className="text-gray-100">Cargando productos...</div>;
  }

  const handleQuantityChange = (e, productId) => {
    const { value } = e.target;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const orderItems = products
    .map((product) => ({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: parseInt(quantities[product.id]) || 0,
    }))
    .filter((item) => item.quantity > 0);

  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleClick = () => {
    navigate("/confirmar", {
      state: {
        selectedOption,
        textTitle: "¿ Estás seguro de realizar tu pedido ?",
        action: "order",
        orderItems,
        total,
      },
    });
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <section className="bg-gray-900 bg-opacity-85 p-4 md:p-6 mt-6 mb-20 rounded-xl shadow-md shadow-gray-800 max-w-[80%] xl:max-w-[60%] mx-auto items-center text-center">
      <h1 className="mb-6 text-2xl text-center text-yellow-600 border-b-2 pb-4">
        Escoje una opción para tu pedido:
      </h1>
      <label className="inline-flex items-center px-4">
        <input
          type="radio"
          name="options"
          value="pickup"
          checked={selectedOption === "pickup"}
          className="form-radio h-5 w-5"
          onChange={handleOptionChange}
        />
        <span className="mx-2 text-gray-100">Recogerlo tu mismo</span>
      </label>
      <label className="inline-flex items-center px-4">
        <input
          type="radio"
          name="options"
          value="delivery"
          checked={selectedOption === "delivery"}
          className="form-radio h-5 w-5"
          onChange={handleOptionChange}
        />
        <span className="mx-2 text-gray-100">Recibirlo en casa</span>
      </label>
      <table className="min-w-full border-collapse border border-gray-200 my-6">
        <thead className="bg-amber-600">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Producto</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-gray-100 hover:bg-gray-700 ">
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">{`${product.price.toFixed(
                2
              )} €`}</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={quantities[product.id] || 0}
                  min={0}
                  className="border bg-gray-300 border-gray-300 text-right text-gray-900 rounded-md p-1 w-28"
                  onChange={(e) => handleQuantityChange(e, product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orderItems.length > 0 && (
        <button
          className="w-52 py-2 bg-green-400 rounded-xl text-gray-900 font-semibold shadow-md shadow-gray-800 hover:bg-green-600 hover:text-white transition duration-300"
          name="btnLoginOrder"
          onClick={handleClick}
        >
          Realizar pedido
        </button>
      )}
    </section>
  );
};

export default PlaceOrder;
