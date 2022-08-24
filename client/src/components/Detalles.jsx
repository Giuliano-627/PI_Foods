import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_details } from "../actions";
export default function Detail(props) {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(get_details(id));
  }, [dispatch, id]);
  const detail = useSelector((state) => state.details);
  const recipes = detail[0];
  console.log("Recipes:", recipes);
  return (
    <div>
      {recipes ? (
        <div>
          <img
            src={recipes.image ? recipes.image : recipes.img}
            alt="no hay imagen"
          />
          <h1>{recipes.name}</h1>
          <h2>Puntaje de salud: {recipes.healthScore}</h2>
          <h2>
            Dietas:{" "}
            {recipes.diets.map((el) => " " + capitalizeFirstLetter(el) + ".")}
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: recipes.resumen,
            }}
          />
          <hr/>
          <h3>Elaboracion paso a paso:</h3>
          <h3> {recipes.stepByStep}</h3>
        </div>
      ) : (
        <p>Cargando</p>
      )}
    </div>
  );
}
