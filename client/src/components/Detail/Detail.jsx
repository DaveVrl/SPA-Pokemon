import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokeId, clearDetail , setLoadingId } from "../../Redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import attack from "../assets/attack.png";
import heart from "../assets/heart-detail.png";
import defense from "../assets/defense.png";
import speed from "../assets/speed.png";
import height from "../assets/height.png";
import weight from "../assets/weight.png";
import imgTypesObj from "../imgTypesObj.js";
import load from "../assets/loading.gif";

const Detail = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.id);
  const loading_id = useSelector(state => state.loading_id);

  const { id } = useParams();
  

  useEffect(() => {
    console.log(pokemon)
    if (pokemon?.name === undefined) {
      dispatch(setLoadingId(true));
      dispatch(getPokeId(id))
      .then(() => dispatch(setLoadingId(false)))
      //se llama solo una vez cuando se desmonta componente
      return () => {
      dispatch(clearDetail());
     }
    }
  }, [dispatch, id]);

  return (
    <div className={style.general}>
      
      {loading_id ? (
            <div className={style.loading}>
                <img className={style.loadgif} src={load} alt="loading..." />
            </div>

      ) : (

        <>

        <div className={style.containerGen}>
          <div className={style.containerPj}>
            <h2 className={style.h1Stats}>Stats:</h2>
            <div className={style.stat_and_imgContainer}>
              <h2>Attack: {pokemon?.attack}</h2>
              <img src={attack} alt="" />
            </div>
            <div className={style.stat_and_imgContainer}>
              <h2>HP: {pokemon?.hp}</h2>
              <img src={heart} alt="hp" />
            </div>
            <div className={style.stat_and_imgContainer}>
              <h2>Defense: {pokemon?.defense}</h2>
              <img src={defense} alt="defense" />
            </div>
            <div className={style.stat_and_imgContainer}>
              <h2>Speed: {pokemon?.speed}</h2>
              <img src={speed} alt="speed" />
            </div>
            <div className={style.stat_and_imgContainer}>
              <h2>Height: {pokemon?.height}</h2>
              <img src={height} alt="height" />
            </div>
            <div className={style.stat_and_imgContainer}>
              <h2>Weight: {pokemon?.weight}</h2>
              <img src={weight} alt="weight" />
            </div>
          </div>

          <div className={style.containerImg}>
            <h1 className={style.h1Name}>
              {pokemon?.name &&
                pokemon.name.charAt(0).toUpperCase() +
                  pokemon.name.substring(1)}
            </h1>
            <img
              className={style.pokeImg}
              src={pokemon?.image}
              alt={pokemon?.name}
            />
            <div className={style.divType}>
              <h2>Types: </h2>
              {pokemon?.type ? (
                <div className={style.types}>
                  {pokemon?.type?.map((type) => {
                    const typeName = type.name;
                    if (imgTypesObj[typeName]) {
                      return (
                        <img
                          key={typeName}
                          src={imgTypesObj[typeName]}
                          alt={typeName}
                        />
                      );
                    }
                    return typeName;
                  })}
                </div>
              ) : (
                <div className={style.types}>
                  {pokemon?.types?.map((type) => {
                    const typeName = type.type;
                    if (imgTypesObj[typeName]) {
                      return (
                        <img
                          key={typeName}
                          src={imgTypesObj[typeName]}
                          alt={typeName}
                        />
                      );
                    }
                    return typeName;
                  })}
                </div>
              )}
            </div> 
          </div>

        </div>
        </>
      )}
    </div>
  );
};

export default Detail;
