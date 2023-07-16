import style from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"


const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <img className={style.imgL} src={logo} alt="fondo" />
            <br />
            <br />
            <p className={style.p1}>¡Welcome to my Pokemon SPA!</p>
            <br />

            <div className={style.container_button}>
                <button className={style.btnL} onClick={() => navigate("/home")}>Access</button>
            </div>
            <p className={style.p2}>Click to access</p>
        </div>
    )
};

export default LandingPage;