import React from "react";
import { useState, useEffect } from "react";
import { post_recipe, getDiets } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.dietsToRender);
  //const [errores, setErrores] = useState({});
  const [input, setInput] = useState({
    name: "",
    resumen: "",
    healthScore: "",
    stepByStep: "",
    image: "",
    diets: [],
    createdInDB: true,
  });
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(post_recipe(input));
    setInput({
      name: "",
      resumen: "",
      healthScore: "",
      stepByStep: "",
      image: "",
      diets: [],
      createdInDB: true,
    });
  }
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log("INPUT:", input);
  }
  function handleSelect(e){
    setInput({
      ...input,
      diets: [...input.diets, e.target.value]
    })
  }
  useEffect(() => {
    dispatch(getDiets());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu propia receta</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Puntuacion segun saludable:</label>
          <input
            type="number"
            name="healthScore"
            value={input.healthScore}
            onChange={handleChange}
          />
          <div>
            <label>Imagen:</label>
            <input
              type="text"
              value={input.image}
              onChange={handleChange}
              name="image"
            />
          </div>
          <div>
            <label>Resumen:</label>
            <input
              type="text"
              value={input.resumen}
              onChange={handleChange}
              name="resumen"
            />
          </div>
          <div>
            <label>Paso a paso:</label>
            <input
              type="text"
              value={input.stepByStep}
              onChange={handleChange}
              name="stepByStep"
            />
          </div>
        </div>
        <div>
          <select onChange={e=>handleSelect(e)}>
            <option required value="disabled">
              Dietas
            </option>
            {diets.map((d) => (
              <option value={d.name} key={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <ul><li>{input.diets.map(el => el + " ,")}</li></ul>
        </div>
        <button type="submit">Crear receta</button>
      </form>
    </div>
  );
}
