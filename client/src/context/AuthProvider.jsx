import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ApiUrl } from "../helpers/ApiUrl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setLoading(false);
      return;
    }

    try {
      const userData = JSON.parse(user);
      const response = await fetch(`${ApiUrl.url}user/search?id=${userData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setAuth(data.user);
      } else {
        setAuth({});
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error al autenticar el usuario:", error);
      setAuth({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
