import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../actions";
import style from "./SearchBar.module.css";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleInputSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesName(name));
    setName("");
    document.getElementById("subm").value="";
  }
  return (
    <div className={style.search}>
      <input
        className={style.text}
        id="subm"
        type="text"
        placeholder="Buscar por nombre"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={style.btn}
        type="submit"
        onClick={(e) => handleInputSubmit(e)}
      ></button>
    </div>
  );
}
