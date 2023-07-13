import style from "./Nav.module.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Nav = () => {

    const navigate = useNavigate();
    
    return (
        <div className={style.container}>
            <button onClick={()=> navigate("/home")} className={style.btn}>Home</button>
            <img className={style.img} src={logo} alt="#" />
            <button onClick={()=> navigate("/form")} className={style.btn2}>Crear Pokemon</button>
        </div>
    )
};

export default Nav;