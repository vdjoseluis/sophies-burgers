import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carta from "../components/layout/MenuOffer";
import MainContent from "../components/layout/MainContent";
import Menus from "../components/layout/Menus";
import Partners from "../components/layout/Partners";
import Orders from "../components/layout/Orders";
import Bookings from "../components/layout/Bookings";
import Login from "../components/user/Login";
import ScrollToTop from "../helpers/ScrollToTop";
import AboutUs from "../components/layout/secondNav/AboutUs";
import JoinUs from "../components/layout/secondNav/JoinUs";
import ContactUs from "../components/layout/secondNav/ContactUs";
import ApplyJob from "../components/user/ApplyJob";
import Register from "../components/user/Register";
import Remember from "../components/user/Remember";

const Routing = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Header className="" />

        {/* Contenido desplazable */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/socios" element={<Partners />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/reservas" element={<Bookings />} />

            <Route path="/login" element={<Login />} />
            <Route path="/empleo" element={<ApplyJob />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recordar" element={<Remember />} />

            <Route path="/acerca" element={<AboutUs />} />
            <Route path="/contacto" element={<ContactUs />} />
            <Route path="/unete" element={<JoinUs />} />
          </Routes>
        </div>

        {/* Footer siempre visible */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Routing;
