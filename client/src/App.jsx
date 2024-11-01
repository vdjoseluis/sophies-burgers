import { useEffect } from "react";
import Routing from "./router/Routing";
import "./App.css";

function App() {
  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear();      
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
