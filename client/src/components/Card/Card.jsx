import style from './Card.module.css';
import { NavLink } from 'react-router-dom';
import sword from "../assets/sword.png";
import heart from "../assets/heart.png"


const Card = ({id, name , image, type, attack, hp }) => {
    return(
        <NavLink className={style.navLink} to={`/detail/${id}`}>
        <div className={style.card}>
            <h1>{name.charAt(0).toUpperCase() + name.substring(1)}</h1>
        <div className={style.containerAttack_HP}>
            <div className={style.attackContainer}>
                <img src={sword} alt="Attack" />
                <h3>{attack}</h3>
            </div>
            <div className={style.hpContainer}>
                <img src={heart} alt="HP" />
                <h3>{hp}</h3>
            </div>
        </div>    
            <img className={style.img} src={image} alt="#" />
            <h2>{type}</h2>
        </div>
        </NavLink>
    )
}

export default Card;