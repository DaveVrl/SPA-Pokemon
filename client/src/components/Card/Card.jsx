import style from './Card.module.css';
import { NavLink } from 'react-router-dom';


const Card = ({name , image, type}) => {
    return(
        <div className={style.card}>
            <img className={style.img} src={image} alt="#" />
            <NavLink className={style.navLink}>
            <h1>{name}</h1>
            </NavLink>
            <h3>{type}</h3>
        </div>
    )
}

export default Card;