import { useDispatch } from "react-redux";
import { filterOrder , filterType , orderByAttack } from "../../Redux/actions";

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

    return (
        <div>
                <select onChange={handleOrder}>
                    <option>Alphabetical Order:</option>
                    <option value="A">Ascending</option>
                    <option value="D">Descending</option>
                </select>
                <select onChange={handleAttack}>
                    <option>Order by Attack Points:</option>
                    <option value="A">Ascending</option>
                    <option value="D">Descending</option>
                </select>
                <select>
                    <option>Origin:</option>
                    <option value="api">API</option>
                    <option value="db">DataBase</option>
                    <option value="all">All Origins</option>
                </select>
                <select onChange={handleFilter}>
                    <option>Type:</option>
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
                    <option value="allTypes">All Types</option>
                </select>
            </div>
    )
};

export default Filter;