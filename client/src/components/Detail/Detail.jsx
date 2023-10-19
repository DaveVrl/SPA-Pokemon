import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokeId, clearDetail } from "../../Redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import sword from "../assets/sword.png";
import heart from "../assets/heart.png";
import defense from "../assets/defense.png";
import speed from "../assets/speed.png";
import height from "../assets/height.png";
import weight from "../assets/weight.png";
import imgTypesObj from "../imgTypesObj.js";

const Detail = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.id);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokeId(id));

    return () => {
      //se llama solo una vez cuando se desmonta componente
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={style.general}>
      {
        <div className={style.containerGen}>
          <div className={style.containerPj}>
            <h1 className={style.h1Stats}>Stats:</h1>
            <div>
              <h2>HP: {pokemon?.hp}</h2>     
              <img src={heart} alt="" />
            </div>
            <div>
              <h2>Attack: {pokemon?.attack}</h2>
              <img src={sword} alt="" />
            </div>
            <div>
              <h2>Defense: {pokemon?.defense}</h2>
              <img src={defense} alt="" />
            </div>
            <div>
              <h2>Speed: {pokemon?.speed}</h2>
            <img src={speed} alt="" />
            </div>
            <div>
              <h2>Height: {pokemon?.height}</h2>
            <img className={style.invertImg} src={height} alt="" />
            </div>
            <div>
              <h2>Weight: {pokemon?.weight}</h2>
            <img className={style.invertImg} src={weight} alt="" />
            </div>
          </div>

          <div className={style.containerImg}>
            <h1 className={style.h1Name}>
              {pokemon?.name &&
                pokemon.name.charAt(0).toUpperCase() +
                  pokemon.name.substring(1)}
            </h1>
            <img className={style.pokeImg} src={pokemon?.image} alt={pokemon?.name} />
            <div className={style.divType}>
              <h2>Types: </h2>
              {pokemon?.type
                              ? (
                                <div className={style.types}>
                                  {pokemon?.type?.map(type => {
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
                              )
                              : (
                                <div className={style.types}>
                                  {pokemon?.types?.map(type => {
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
                              )
                          }
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Detail;
