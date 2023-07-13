import style from './Card.module.css';
import { NavLink } from 'react-router-dom';


const Card = ({id, name , image, type }) => {
    return(
        <NavLink className={style.navLink} to={`/detail/${id}`}>
        <div className={style.card}>
            <img className={style.img} src={image} alt="#" />
            <h1>{name}</h1>
            <h3>{type}</h3>
        </div>
        </NavLink>
    )
}

export default Card;