import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Remember = () => {
  return (
    <section className="bg-gray-300 p-4 md:p-6 mt-6 mb-10 rounded-xl shadow-md shadow-gray-800 max-w-sm sm:max-w-xl mx-auto opacity-85 items-center">
      <h1 className="mb-6 text-3xl font-semibold text-center">
        ¿ Has olvidado tu contraseña ?
      </h1>
      <p className="text-center text-lg mb-6">
        Te enviaremos un email con tus datos
      </p>
      <form className="flex flex-col gap-6 px-6 border-b-2">
        <div className="input-group flex gap-10 justify-center">
          <EnvelopeIcon className="h-6 w-6" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Escribe tu email"
            className="w-full rounded-lg px-2 shadow-md shadow-gray-800 focus:outline-none focus:bg-emerald-100"
            autoFocus
          />
        </div>

        <input
          type="submit"
          value="Enviar"
          className="p-2 bg-emerald-400 rounded-xl text-gray-900 font-semibold shadow-md shadow-gray-800 hover:bg-emerald-500 hover:text-gray-100 transition duration-300"
        />
      </form>
    </section>
  );
};

export default Remember;
