import style from "./Form.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { createPoke } from "../../Redux/actions";

const Form = () => {

    const dispatch = useDispatch();

    const[pokeData , setPokeData] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        type: [],
        image: null,
    });

console.log(pokeData)
    const handleInputChange = (event) => {
        const { name , value } = event.target;
        setPokeData({...pokeData, [name]: value});
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const { type } = pokeData;
      
        if (checked && !type.includes(value)) {
          type.push(value);
        } else if (!checked && type.includes(value)) {
          const index = type.indexOf(value);
          type.splice(index, 1);
        }
      
        setPokeData({ ...pokeData, type: [...type] });
    };

    const handleImageChange = (event) => {
        const imageUrl = event.target.value;
        setPokeData({ ...pokeData, image: imageUrl });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //aca envio los datos al controlador back
        dispatch(createPoke(pokeData));
        console.log(pokeData)

        //Limpiar el estado local
        setPokeData({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            type: [],
            image: '',
          });

        //Limpio el form en pantalla
        event.target.reset();
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={style.container_n}>
                    <div className={style.container_n_individual}>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" placeholder="Pokemon Name" onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={style.container_3}>
                    <div className={style.container_3_individual}>
                        <label htmlFor="hp">HP:</label>
                        <input name="hp" type="number" placeholder="Hit Points" onChange={handleInputChange}/>
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="attack">Attack:</label>
                        <input name="attack" type="number" placeholder="Attack Points" onChange={handleInputChange}/>
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="defense">Defense:</label>
                        <input name="defense" type="number" placeholder="Defense Points" onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={style.container_3}>
                    <div className={style.container_3_individual}>
                        <label htmlFor="speed">Speed:</label>
                        <input name="speed" type="number" placeholder="Speed Points" onChange={handleInputChange}/>
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="height">Height:</label>
                        <input name="height" type="number" placeholder="Height Points" onChange={handleInputChange}/>
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="weight">Weight:</label>
                        <input name="weight" type="text" placeholder="Weight Points" onChange={handleInputChange}/>
                    </div>
                </div>

                <div className={style.container_types}>
                    <label>Type:</label>

                    <div className={style.types}>
                        <div className={style.types_5}>
                        <label>Normal</label>
                            <input type="checkbox" value="normal" onChange={handleCheckboxChange}/>

                        <label>Fighting</label>
                            <input type="checkbox" value="fighting" onChange={handleCheckboxChange}/>
                        
                        <label>Flying</label>
                            <input type="checkbox" value="flying" onChange={handleCheckboxChange}/>
                        
                        <label>Poison</label>
                            <input type="checkbox" value="poison" onChange={handleCheckboxChange}/>
                        
                        <label>Ground</label>
                            <input type="checkbox" value="ground" onChange={handleCheckboxChange}/>
                        </div>
                        <div className={style.types_5}>
                        <label>Rock</label>
                            <input type="checkbox" value="rock" onChange={handleCheckboxChange}/>
                        
                        <label>Bug</label>
                            <input type="checkbox" value="bug" onChange={handleCheckboxChange}/>
                        
                        <label>Ghost</label>
                            <input type="checkbox" value="ghost" onChange={handleCheckboxChange}/>
                        
                        <label>Steel</label>
                            <input type="checkbox" value="steel" onChange={handleCheckboxChange}/>
                        
                        <label>Fire</label>
                            <input type="checkbox" value="fire" onChange={handleCheckboxChange}/>
                        </div>
                        <div className={style.types_5}>
                        <label>Water</label>
                            <input type="checkbox" value="water" onChange={handleCheckboxChange}/>
                        
                        <label>Grass</label>
                            <input type="checkbox" value="grass" onChange={handleCheckboxChange}/>
                        
                        <label>Electric</label>
                            <input type="checkbox" value="electric" onChange={handleCheckboxChange}/>
                        
                        <label>Psychic</label>
                            <input type="checkbox" value="psychic" onChange={handleCheckboxChange}/>
                        
                        <label>Ice</label>
                            <input type="checkbox" value="ice" onChange={handleCheckboxChange}/>
                        </div>
                        <div className={style.types_5}>
                        <label>Dragon</label>
                            <input type="checkbox" value="dragon" onChange={handleCheckboxChange}/>
                        
                        <label>Dark</label>
                            <input type="checkbox" value="dark" onChange={handleCheckboxChange}/>
                        
                        <label>Fairy</label>
                            <input type="checkbox" value="fairy" onChange={handleCheckboxChange}/>
                        
                        <label>Unknown</label>
                            <input type="checkbox" value="unknown" onChange={handleCheckboxChange}/>
                        
                        <label>Shadow</label>
                            <input type="checkbox" value="shadow" onChange={handleCheckboxChange}/>
                        </div>
                    </div>
                </div>
                <div className={style.container_imgLoad}>
                    <label htmlFor="">Select your Pokemon's image:</label>
                    <input name="image" type="url" onChange={handleImageChange} />
                </div>
                <button className={style.create} type="submit">Create</button>
            </form>
        </div>
    )
};

export default Form;