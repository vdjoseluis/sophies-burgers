import { useEffect, useState } from "react";
import { ApiUrl } from "../../../helpers/ApiUrl";
import { useNavigate } from "react-router-dom";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const response = await fetch(ApiUrl.url + "user/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (userId) => {
    try {
        const response = await fetch(`${ApiUrl.url}user/search?id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await response.json();

        if (response.ok) {
          return data.user;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error al autenticar el usuario:", error);
      } 
  }

  const handleClick = async(userId) => {    
    const userData = await getUserById(userId);
    navigate("/perfil", { state: { userData } });
  };

  return (
    <section className="bg-gray-900 bg-opacity-85 p-4 md:p-6 mt-6 mb-20 rounded-xl shadow-md shadow-gray-800 max-w-[80%] xl:max-w-[60%] mx-auto items-center text-center">
      <div className="flex md:flex-row flex-col items-center justify-between mb-6 border-b-2 pb-4">
        <h1 className="text-2xl text-yellow-600">Todos los Reservas</h1>
      </div>
      <table className="w-full border-collapse border border-gray-200 my-6 cursor-default">
        <thead className="bg-amber-600">
          <tr>
            <th className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
              ID
            </th>
            <th className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
              Email
            </th>
            <th className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
              Nombre
            </th>
            <th className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
              Role
            </th>
          </tr>
        </thead>

        <tbody>
        {users.length === 0 && <tr className="text-gray-100 text-lg"><td>No hay usuarios registrados</td></tr>}
          {users.map((user) => (
            <tr key={user.id} className="text-gray-100 hover:bg-gray-600 cursor-pointer" onClick={() => handleClick(user.id)}>
              <td className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
                {user.id}
              </td>
              <td className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
                {user.email}
              </td>
              <td className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
                {user.firstname} {user.lastname}
              </td>
              <td className="border border-gray-300 xl:px-2 py-2 text-xs xl:text-lg">
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default GetAllUsers;
