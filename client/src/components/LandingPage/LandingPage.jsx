import style from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"


const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <img className={style.imgL} src={logo} alt="fondo" />
            <div className={style.container_button}>
                <button className={style.btnL} onClick={() => navigate("/home")}>Ingresar</button>
            </div>
        </div>
    )
};

export default LandingPage;