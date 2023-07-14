import style from "./Nav.module.css";
import logo from "../assets/logo.svg";
import { useNavigate , useLocation } from "react-router-dom";

const Nav = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className={style.container}>
            {location.pathname !== '/' &&<button onClick={()=> navigate("/home")} className={style.btn}>Home</button>}

            <img className={style.img} src={logo} alt="#" />

            {location.pathname !== '/' &&<button onClick={()=> navigate("/form")} className={style.btn2}>Crear Pokemon</button>}
        </div>
    )
};

export default Nav;