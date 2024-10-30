import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ApiUrl } from "../../helpers/ApiUrl";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Remember = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (location.pathname.startsWith ("/restore-password")) {
      Swal.fire({
        title: "Recuperación de contraseña",
        text: "Por favor ingresa tu correo para restaurar tu contraseña.",
        input: "password",
        inputPlaceholder: "Contraseña nueva",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        allowOutsideClick: false,
        preConfirm: (password) => {
          if (!password) {
            Swal.showValidationMessage("Por favor ingresa una contraseña válida");
          }
          return password;
        }
      }).then(async(result) => {
        if (result.isConfirmed && result.value) {
          try {
            const response = await fetch(
              ApiUrl.url + "user/restore-password/" + id,
              {
                method: "PUT",
                body: JSON.stringify({password: result.value}),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const data = await response.json();

              if (data.status === "success") {
                Swal.fire({
                  title: "Recuperación de contraseña exitosa",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                }).then(() => {
                  navigate(-1);
                })
              } else {
                Swal.fire({
                  title: "Error al restablecer tu contraseña",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 2000,
                }).then(() => {
                  navigate(-1);
                })
              }
            }
      
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: "Error al enviar el correo",
              text: "Por favor, intenta de nuevo.",
              icon: "error",
              showConfirmButton: false,
                  timer: 2000,
            });
          }
        } else if (result.isDismissed) {
          navigate(-1);
        }
      });
    }
  }, [location.pathname, id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/login");
    try {
      const searchUser = await fetch(
        `${ApiUrl.url}user/remember?email=${e.target.email.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await searchUser.json();
      if (data.status === "success") {
        const emailResponse = await fetch(`${ApiUrl.url}contact/remember`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.user),
        });

        if (emailResponse.ok) {
          Swal.fire({
            title: "Correo enviado",
            text: "Podrás restablecer tu contraseña.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: "Error al enviar el correo",
            text: "Por favor, intenta de nuevo.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } else {
        Swal.fire({
          title: "Usuario no encontrado",
          text: "Verifica tu email.",
          icon: "warning",
          showConfirmButton: false,
            timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error al enviar el correo",
        text: "Por favor, intenta de nuevo.",
        icon: "error",
        showConfirmButton: false,
            timer: 2000,
      });
    }
  };
  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto items-center">
      <h1 className="mb-6 text-3xl font-semibold text-center text-yellow-500">
        ¿ Has olvidado tu contraseña ?
      </h1>
      <p className="text-center text-lg mb-6 text-gray-100">
        Te enviaremos un email con tus datos
      </p>
      <form className="flex flex-col gap-10 px-6" onSubmit={handleSubmit}>
        <div className="input-group flex gap-10 justify-center">
          <EnvelopeIcon className="icon" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Escribe tu email de registro"
            className="w-full border rounded-lg p-2 bg-gray-300 shadow-md shadow-gray-800 focus:outline-none focus:border-red-400 focus:text-yellow-800 focus:shadow-amber-500 focus:bg-gray-100"
            autoFocus
          />
        </div>

        <input
          type="submit"
          value="Enviar"
          className="p-2 bg-green-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-green-400 hover:text-gray-900 transition duration-300"
        />
      </form>
    </section>
  );
};

export default Remember;
