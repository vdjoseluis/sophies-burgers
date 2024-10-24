import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carta from "../components/layout/mainNav/MenuOffer";
import Home from "../components/layout/public/Home";
import Menus from "../components/layout/mainNav/Menus";
import Partners from "../components/layout/mainNav/Partners";
import Orders from "../components/layout/mainNav/Orders";
import Bookings from "../components/layout/mainNav/Bookings";
import Login from "../components/user/Login";
import Logout from "../components/user/Logout";
import ScrollToTop from "../helpers/ScrollToTop";
import AboutUs from "../components/layout/secondNav/AboutUs";
import JoinUs from "../components/layout/secondNav/JoinUs";
import ContactUs from "../components/layout/secondNav/ContactUs";
import ApplyJob from "../components/user/ApplyJob";
import ProfileForm from "../components/user/ProfileForm";
import Remember from "../components/user/Remember";
import ScrollToTopButton from "../helpers/ScrollToTopButton";
import { AuthProvider } from "../context/AuthProvider";
import ConfirmCard from "../components/content/ConfirmCard";
const Routing = () => {
  const auth =
    localStorage.getItem("user") !== null &&
    localStorage.getItem("token") !== null;
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carta" element={<Carta />} />
              <Route path="/menus" element={<Menus />} />
              <Route
                path="/socios"
                element={auth ? <Navigate to="/" /> : <Partners />}
              />
              <Route path="/pedidos" element={<Orders />} />
              <Route path="/reservas" element={<Bookings />} />

              <Route
                path="/login"
                element={auth ? <Navigate to="/" /> : <Login />}
              />
              <Route path="/logout" element={<Logout />} />

              <Route path="/empleo" element={<ApplyJob />} />
              <Route path="/perfil" element={<ProfileForm />} />
              <Route
                path="/confirmar"
                element={!auth ? <Navigate to="/" /> : <ConfirmCard />}
              />
              <Route path="/perfil/recordar" element={<Remember />} />

              <Route path="/acerca" element={<AboutUs />} />
              <Route path="/contacto" element={<ContactUs />} />
              <Route path="/unete" element={<JoinUs />} />
            </Routes>
          </div>

          <ScrollToTopButton />
          {/* Footer siempre visible */}
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
