import style from "./Form.module.css";
import { useState , useEffect } from "react";
import { useDispatch } from "react-redux"
import { createPoke , getDbPokes } from "../../Redux/actions";
import validation from "./validation";


const Form = () => {
    const dispatch = useDispatch();
    //Para manejar validations
    const[errors , setErrors] = useState({});

//Los seteo en undefined para que al enviarse no me haga conflicto en los datatypes
    const[pokeData , setPokeData] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: undefined,
        height: undefined,
        weight: undefined,
        type: [],
        image: null,
    });

console.log(pokeData)

    const handleInputChange = (event) => {
        const { name , value } = event.target;
        setPokeData({...pokeData, [name]: value});
        setErrors(validation({...pokeData, [name]: value}));
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


    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          // Valido si hay duplicados
          const valid = await dispatch(getDbPokes(pokeData));

          console.log(valid);//Controlo lo que me viene en valid

          if (valid.payload.length === 1) return console.error("El Pokemon ya existe");
          
          // Si no hay, despacho
          dispatch(createPoke(pokeData));
          console.log(pokeData);
      
          // Limpio el estado local
          setPokeData({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: undefined,
            height: undefined,
            weight: undefined,
            type: [],
            image: "",
          });
      
          // Limpio el form en pantalla
        //   event.target.reset();
        } catch (error) {
          return console.error(error.message);
        }
      };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={style.container_n}>
                    <div className={style.container_n_individual}>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" placeholder="Pokemon Name" onChange={handleInputChange}/>
                    {errors.name && <p>{errors.name}</p>}
                    </div>
                </div>
                <div className={style.container_3}>
                    <div className={style.container_3_individual}>
                        <label htmlFor="hp">HP:</label>
                        <input name="hp" type="number" placeholder="Hit Points" onChange={handleInputChange}/>
                        {errors.hp && <p>{errors.hp}</p>}
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="attack">Attack:</label>
                        <input name="attack" type="number" placeholder="Attack Points" onChange={handleInputChange}/>
                        {errors.attack && <p>{errors.attack}</p>}
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="defense">Defense:</label>
                        <input name="defense" type="number" placeholder="Defense Points" onChange={handleInputChange}/>
                        {errors.defense && <p>{errors.defense}</p>}
                    </div>
                </div>
                <div className={style.container_3}>
                    <div className={style.container_3_individual}>
                        <label htmlFor="speed">Speed:</label>
                        <input name="speed" type="number" placeholder="Speed Points" onChange={handleInputChange}/>
                        {errors.speed && <p>{errors.speed}</p>}
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="height">Height:</label>
                        <input name="height" type="number" placeholder="Height Points" onChange={handleInputChange}/>
                        {errors.height && <p>{errors.height}</p>}
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="weight">Weight:</label>
                        <input name="weight" type="number" placeholder="Weight Points" onChange={handleInputChange}/>
                        {errors.weight && <p>{errors.weight}</p>}
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
                    <label htmlFor="">Put your Pokemon's URL image:</label>
                    <input name="image" type="url" onChange={handleInputChange} placeholder="Your image link here..." />
                    {errors.image && <p>{errors.image}</p>}
                </div>
                <button className={style.create} type="submit">Create</button>
            </form>
        </div>
    )
};

export default Form;