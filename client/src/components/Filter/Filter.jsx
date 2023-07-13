import { useDispatch } from "react-redux";
import { filterOrder , filterType , orderByAttack , filterOrigin } from "../../Redux/actions";
import style from "./Filter.module.css";

const Filter = () => {
    const dispatch = useDispatch();

    const handleOrder = (event) => {
        dispatch(filterOrder(event.target.value));
    };

    const handleAttack = (event) => {
        dispatch(orderByAttack(event.target.value));
    }

    const handleFilter = (event) => {
        dispatch(filterType(event.target.value));
    };

    const filterByOrigin = (event) => {
        dispatch(filterOrigin(event.target.value));
    }

    return (
        <div className={style.container}>
            <div className={style.containers}>
                <label>Alphabetical Order:</label>
                <select onChange={handleOrder}>
                    <option value="A">Ascending</option>
                    <option value="D">Descending</option>
                </select>
            </div>
            <div className={style.containers}>
            <label>Order by Attack Points:</label>
                <select onChange={handleAttack}>
                    <option value="A">Ascending</option>
                    <option value="D">Descending</option>
                </select>
            </div>
            <div className={style.containers}>
                <label>Origin:</label>
                <select onChange={filterByOrigin}>
                    <option value="all">All Origins</option>
                    <option value="api">API</option>
                    <option value="db">DataBase</option>
                </select>
            </div>
            <div className={style.containers}>
                <label>Type:</label>
                <select onChange={handleFilter}>
                    <option value="allTypes">All Types</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">Fighting</option>
                    <option value="flying">Flying</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="rock">Rock</option>
                    <option value="bug">Bug</option>
                    <option value="ghost">Ghost</option>
                    <option value="steel">Steel</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                    <option value="unknown">Unknown</option>
                    <option value="shadow">Shadow</option>
                </select>
            </div>
            </div>
    )
};

export default Filter;