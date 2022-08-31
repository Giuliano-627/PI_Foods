import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_details } from "../actions";
import styles from "./Detalles.module.css";

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
          <div className={styles.divImage}>
            <img
              className={styles.image}
              src={recipes.image ? recipes.image : recipes.img}
              alt="no hay imagen"
            />
          </div>
          <div className={styles.divInfo}>
            <h1 className={styles.name}>{recipes.name}</h1>
            <h2 className={styles.score}>
              Puntaje de salud: {recipes.healthScore}
            </h2>
            <h2 className={styles.dietas}>
              Dietas:{" "}
              {typeof recipes.diets[0] !== "object"
                ? recipes.diets.map((el) => " " + el + ".")
                : recipes.diets.map((el) => " " + el.name + ".")}
            </h2>
            <p
              className={styles.resum}
              dangerouslySetInnerHTML={{ __html: recipes.resumen }}
            />
            <div className={styles.steps}>
              <h3>Elaboracion paso a paso:</h3>
              <h3> {recipes.stepByStep}</h3>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Cargando</p>
      )}
    </div>
  );
}
