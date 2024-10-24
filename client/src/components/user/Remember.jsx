import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Remember = () => {
  return (
    <section className="bg-gray-900 bg-opacity-75 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto items-center">
      <h1 className="mb-6 text-3xl font-semibold text-center text-yellow-500">
        ¿ Has olvidado tu contraseña ?
      </h1>
      <p className="text-center text-lg mb-6 text-gray-100">
        Te enviaremos un email con tus datos
      </p>
      <form className="flex flex-col gap-10 px-6">
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
