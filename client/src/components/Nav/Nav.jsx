import style from "./Nav.module.css";
import logo from "../assets/logo.svg";
import { useNavigate , useLocation } from "react-router-dom";

const Nav = () => {

    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/") {
        return null; // No renderizar nada cuando la ubicación sea "/"
      }
    
      return (
        <div className={style.container}>
          <button
            onClick={() => navigate("/home")}
            className={`${style.btn} ${
              location.pathname === "/home" ? style.hidden : ""
            }`}
          >
            Home
          </button>
    
          <img
            onDoubleClick={() => navigate("/")}
            className={style.img}
            src={logo}
            alt="#"
          />
    
          <button
            onClick={() => navigate("/form")}
            className={`${style.btn2} ${
              location.pathname === "/form" ? style.hidden : ""
            }`}
          >
            Create Pokémon
          </button>
        </div>
      );
    };

export default Nav;