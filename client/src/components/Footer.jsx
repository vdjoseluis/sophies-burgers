import instagramLogo from "../assets/img/logos-rrss/logo-instagram.png";
import facebookLogo from "../assets/img/logos-rrss/logo-facebook.png";
import linkedinLogo from "../assets/img/logos-rrss/logo-linkedin.png";
import whatsappLogo from "../assets/img/logos-rrss/logo-whatsapp.png";
import {Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full flex justify-center items-center p-2 flex-wrap gap-5 bg-gray-800">
      <p className="text-white text-sm">Copyright &copy; 2024 Sophie&apos;s Burgers</p>   
      <div className="flex justify-center items-center gap-8">
        <Link to="http://instagram.com" target="_blank">
          <img
            src={instagramLogo}
            alt="logoInstagram"
            className="w-8 hover:scale-125 transition duration-200"
          />
        </Link>
        <Link to="http://facebook.com" target="_blank">
          <img
            src={facebookLogo}
            alt="logoFacebook"
            className="w-8 hover:scale-125 transition duration-200"
          />
        </Link>
        <Link to="http://linkedin.com" target="_blank">
          <img
            src={linkedinLogo}
            alt="logoLinkedin"
            className="w-8 hover:scale-125 transition duration-200"
          />
        </Link>
        <Link to="https://wa.me/34622161340" target="_blank">
          <img
            src={whatsappLogo}
            alt="logoWhatsApp"
            className="w-8 hover:scale-125 transition duration-200"
          />
        </Link>
      </div>
      <p className="text-white hidden md:block text-sm">by José Luis Vásquez Drouet</p>
    </footer>
  );
};

export default Footer;
