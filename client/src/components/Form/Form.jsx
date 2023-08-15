import style from "./Form.module.css";
import { useState } from "react";
import { useDispatch , useSelector } from "react-redux"
import { createPoke , getDbPokes , getPokes , setCurrentPage } from "../../Redux/actions";
import validation from "./validation";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading , setIsLoading] = useState(false);

    //Para manejar validations
    const[errors , setErrors] = useState({});
    //Validation de name ya creado en DB
    const db = useSelector(state => state.db);
    const api = useSelector(state => state.pokemons)

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
        setErrors(validation({...pokeData, [name]: value}, db , api));
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
        //Seteo los erros para que se actualicen y se quite el msj de error
        setPokeData({ ...pokeData, type: [...type] });
        setErrors(validation({ ...pokeData, type: [...type] }, db, api));
      };


    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          setIsLoading(true);     
          const create = await dispatch(createPoke(pokeData));
          console.log(create);

          if (!create) {
            setIsLoading(false);
             return alert("El Pokémon ya existe en la API");
          }                         
          
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
          event.target.reset();
          dispatch(getDbPokes()); //obtengo todo en el Home
          dispatch(getPokes());
          dispatch(setCurrentPage(1));
          navigate("/home");
          
          
        } catch (error) {
          setIsLoading(false);
          return console.error(error.message);
        }
      };
      //Manejo button condicionado
      const buttonDisabled =
      !pokeData.name ||
      !pokeData.hp ||
      !pokeData.attack ||
      !pokeData.defense ||
      !pokeData.type.length ||
      !pokeData.image ||
      pokeData.type.length < 1 ||
      pokeData.type.length > 2 ||
      Object.keys(errors).length > 0;


    return (
        <div className={style.containerGeneral}  style={{ cursor: isLoading ? "wait" : "default" }}>
            <form onSubmit={handleSubmit}>
                <div className={style.container_n}>
                    <div className={style.container_n_individual}>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" placeholder="Pokemon Name" onChange={handleInputChange} style={{ cursor: isLoading ? "wait" : "text" }}/>
                    {errors.name && <p>{errors.name}</p>}
                    </div>
                </div>
                <div className={style.container_3}>
                    <div className={style.container_3_individual}>
                        <label htmlFor="hp">HP:</label>
                        <input name="hp" type="number" placeholder="Hit Points" onChange={handleInputChange} style={{ cursor: isLoading ? "wait" : "text" }}/>
                        {errors.hp && <p>{errors.hp}</p>}
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="attack">Attack:</label>
                        <input name="attack" type="number" placeholder="Attack Points" onChange={handleInputChange} style={{ cursor: isLoading ? "wait" : "text" }}/>
                        {errors.attack && <p>{errors.attack}</p>}
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="defense">Defense:</label>
                        <input name="defense" type="number" placeholder="Defense Points" onChange={handleInputChange} style={{ cursor: isLoading ? "wait" : "text" }}/>
                        {errors.defense && <p>{errors.defense}</p>}
                    </div>
                </div>
                <div className={style.container_3}>
                    <div className={style.container_3_individual}>
                        <label htmlFor="speed">Speed:</label>
                        <input name="speed" type="number" placeholder="Speed Points" onChange={handleInputChange} style={{ cursor: isLoading ? "wait" : "text" }}/>
                        {errors.speed && <p>{errors.speed}</p>}
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="height">Height:</label>
                        <input name="height" type="number" placeholder="Height Points" onChange={handleInputChange} style={{ cursor: isLoading ? "wait" : "text" }}/>
                        {errors.height && <p>{errors.height}</p>}
                    </div>
                    <div className={style.container_3_individual}>
                        <label htmlFor="weight">Weight:</label>
                        <input name="weight" type="number" placeholder="Weight Points" onChange={handleInputChange} style={{ cursor: isLoading ? "wait" : "text" }}/>
                        {errors.weight && <p>{errors.weight}</p>}
                    </div>
                </div>

                <div className={style.container_types}>
                    <label className={style.typeTitle}>Type:</label>

                    <div className={style.types}>
                        <div className={style.types_5}>
                        <label>Normal</label>
                            <input type="checkbox" value="normal" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("normal")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>

                        <label>Fighting</label>
                            <input type="checkbox" value="fighting" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("fighting")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Flying</label>
                            <input type="checkbox" value="flying" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("flying")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Poison</label>
                            <input type="checkbox" value="poison" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("poison")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Ground</label>
                            <input type="checkbox" value="ground" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("ground")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        </div>
                        <div className={style.types_5}>
                        <label>Rock</label>
                            <input type="checkbox" value="rock" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("rock")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Bug</label>
                            <input type="checkbox" value="bug" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("bug")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Ghost</label>
                            <input type="checkbox" value="ghost" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("ghost")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Steel</label>
                            <input type="checkbox" value="steel" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("steel")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Fire</label>
                            <input type="checkbox" value="fire" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("fire")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        </div>
                        <div className={style.types_5}>
                        <label>Water</label>
                            <input type="checkbox" value="water" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("water")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Grass</label>
                            <input type="checkbox" value="grass" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("grass")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Electric</label>
                            <input type="checkbox" value="electric" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("electric")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Psychic</label>
                            <input type="checkbox" value="psychic" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("psychic")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Ice</label>
                            <input type="checkbox" value="ice" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("ice")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        </div>
                        <div className={style.types_5}>
                        <label>Dragon</label>
                            <input type="checkbox" value="dragon" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("dragon")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Dark</label>
                            <input type="checkbox" value="dark" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("dark")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Fairy</label>
                            <input type="checkbox" value="fairy" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("fairy")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Unknown</label>
                            <input type="checkbox" value="unknown" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("unknown")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        
                        <label>Shadow</label>
                            <input type="checkbox" value="shadow" onChange={handleCheckboxChange} disabled={pokeData.type.length >= 2 && !pokeData.type.includes("shadow")} style={{ cursor: isLoading ? "wait" : "pointer" }}/>
                        </div>
                    </div>
                    {errors.type && <p className={style.errTyp}>{errors.type}</p>}
                </div>
                <div className={style.container_imgLoad}>
                    <label htmlFor="">Put your Pokemon's URL image:</label>
                    <input name="image" type="url" onChange={handleInputChange} placeholder="Your image link here..." style={{ cursor: isLoading ? "wait" : "text" }}/>
                    {errors.image && <p>{errors.image}</p>}
                </div>
                <button className={style.create} type="submit" 
                disabled={buttonDisabled} 
                style={{ cursor: isLoading ? "wait" : "pointer" }}>Create</button>
            </form>
        </div>
    )
};

export default Form;