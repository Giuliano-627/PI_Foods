import React from "react";
import { useState, useEffect } from "react";
import { post_recipe, getDiets } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import style from "./Form.module.css"

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

  function handleDelete(e) {
    setInput({
      ...input,
      diets: input.diets.filter((d) => d !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name.length < 1 ||
      input.resumen.length < 1 ||
      input.stepByStep.length < 1 ||
      input.image.length < 1 ||
      input.healthScore < 0 ||
      input.healthScore > 100 ||
      !input.diets.length
    ) {
      alert(
        "Todos los campos deben estar completos, 'HealtScore' debe estar entre 0 y 100 y debe haber al menos 1 dieta."
      );
    } else {
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
      history.push("/home");
    }
  }
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log("INPUT:", input);
  }
  function handleSelect(e) {
    if (e.target.value !== "disabled") {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }
  useEffect(() => {
    dispatch(getDiets());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button className={style.goBack}>Volver</button>
      </Link>
      <h1>Crea tu propia receta</h1>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={style.name}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Puntuacion segun valor de salud:</label>
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
            <input className={style.inputLarge}
              type="text"
              value={input.resumen}
              onChange={handleChange}
              name="resumen"
            />
          </div>
          <div>
            <label>Paso a paso:</label>
            <input className={style.inputLarge}
              type="text"
              value={input.stepByStep}
              onChange={handleChange}
              name="stepByStep"
            />
          </div>
        </div>
        <div>
          <select className={style.select} onChange={(e) => handleSelect(e)}>
            <option required value="disabled">
              Dietas
            </option>
            {diets.map((d) => (
              <option value={d.name} key={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <button className={style.btnSubmit} type="submit">Crear receta</button>
        </form>
        {input.diets.map((el) =>
        <div className={style.dietas} >
        <p className={style.dieta}>{el + " ,"}</p>
        <button className={style.btnDelete} onClick={()=>handleDelete(el)}>X</button>
        </div> 
        )}
    </div>
  );
}
