import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions/index";
import { Link } from "react-router-dom";
import { filterByDiet } from "../actions/index";
//--------importacion de los componentes:--------------
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import { orderByHealt } from "../actions/index";
import { orderAlph } from "../actions/index";
import style from "./Home.module.css";
//---------fin de la importacion de componentes--------
export default function Home() {
  const dispatch = useDispatch();
  const recipesToRender = useSelector((state) => state.recipesToRender);
  const allDiets = useSelector((state) => state.allDiets);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPorPag, setRecipesPorPag] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPorPag;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPorPag;
  const currentRecipes = recipesToRender.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const [order, setOrder] = useState("");

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleRecharge(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleChangeDiets(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleOrderByHealt(e) {
    e.preventDefault();
    dispatch(orderByHealt(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleOrderAlph(e) {
    e.preventDefault();
    dispatch(orderAlph(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <Link className={style.createRecipe} to="/recipeCreate">Crear una nueva receta</Link>
      <h1>Recetas, gratis y de calidad</h1>
      <p className={style.fyo}><strong>Ordenar y/o filtrar:</strong></p>
      <select onChange={(e) => handleOrderByHealt(e)}>
        <option value="salDefault">Ordenar por valor de salud</option>
        <option value="salAsc">Menos saludables</option>
        <option value="salDesc">Mas saludables</option>
      </select>
      <select onChange={(e) => handleOrderAlph(e)}>
        <option value="alphDefault">Ordenar alfabeticamente</option>
        <option value="aToZ">A-Z</option>
        <option value="zToA">Z-A</option>
      </select>
      <select onChange={(e) => handleChangeDiets(e)}>
        <option value="dietDefault">Dietas especificas</option>
        {allDiets?.map((e) => (
          <option value={e.name}>{e.name}</option>
        ))}
      </select>
      <button className={style.reloadBtn} onClick={(e) => handleRecharge(e)}>
        Recargar las Dietas.
      </button>
      <Paginado
        recipesPorPag={recipesPorPag}
        recipesToRender={recipesToRender.length}
        paginado={paginado}
        currentPag={currentPage}
      />
      <div className={style.search}>
      <SearchBar />
      </div>
      <div className={style.cards}>
        {currentRecipes.map((e) => {
          return (
            <Fragment>
              <Card
                image={e.image}
                name={e.name}
                dieta={
                  typeof e.diets[0] !== "object"
                    ? e.diets.map((el) => " " + capitalizeFirstLetter(el) + ".")
                    : e.diets.map(
                        (el) => " " + capitalizeFirstLetter(el.name) + "."
                      )
                }
                healthScore={e.healthScore}
                id={e.id}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
