import style from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <div className={style.container_button}>
                <button onClick={() => navigate("/home")}>Ingresar</button>
            </div>
        </div>
    )
};

export default LandingPage;