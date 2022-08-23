import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions/index";
import { Link } from "react-router-dom";
import { filterByDiet } from "../actions/index";
//--------importacion de los componentes:--------------
import Card from "./Card";
import Paginado from "./Paginado";
//---------fin de la importacion de componentes--------
export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const recipesToRender = useSelector((state) => state.recipesToRender);
  const allDiets = useSelector((state) => state.allDiets);
  const dietsToRender = useSelector((state) => state.dietsToRender);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPorPag, setRecipesPorPag] = useState(10);
  const indexOfLastRecipe = currentPage * recipesPorPag;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPorPag;
  const currentRecipes = recipesToRender.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

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
  }

  return (
    <div>
      <Link to="/recipeCreate">Crear una nueva receta</Link>
      <h1>Titulo del Home</h1>
      <p>Filtrar y/o ordenar:</p>
      <select>
        <option value="salDefault">Ordenar por valor de salud</option>
        <option value="salAsc">Menos saludables</option>
        <option value="salDesc">Mas saludables</option>
      </select>
      <select>
        <option value="alphDefault">Ordenar alfabeticamente</option>
        <option value="aToZ">A-Z</option>
        <option value="zToA">Z-A</option>
      </select>
      <select onChange={(e) => handleChangeDiets(e)}>
        <option value="dietDefault">Dietas especificas</option>
        {allDiets?.map((e) => (
          <option value={e.name} key={e.id}>
            {e.name}
          </option>
        ))}
      </select>
      <button onClick={(e) => handleRecharge(e)}>Recargar las Dietas.</button>
      <Paginado
        recipesPorPag={recipesPorPag}
        recipesToRender={recipesToRender.length}
        paginado={paginado}
      />
      {currentRecipes.map((e) => {
        return (
          <Fragment>
            <Card
              image={e.image}
              name={e.name}
              dieta={e.diets.map((el) => " " + capitalizeFirstLetter(el) + ".")}
              id={e.id}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
