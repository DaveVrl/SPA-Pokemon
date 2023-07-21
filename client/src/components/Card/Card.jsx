import style from './Card.module.css';
import { NavLink } from 'react-router-dom';


const Card = ({id, name , image, type, attack }) => {
    return(
        <NavLink className={style.navLink} to={`/detail/${id}`}>
        <div className={style.card}>
            <h1>{name.charAt(0).toUpperCase() + name.substring(1)}</h1>
            <img className={style.img} src={image} alt="#" />
            <h2>Type: {type}</h2>
            <h3>Attack: {attack}</h3>
        </div>
        </NavLink>
    )
}

export default Card;