import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, id, image, dieta, healthScore}) {
  return (
    <div>
    <Link to={"/home/" + id}>
      <img src={image} alt="no image" width="200px" height="250px" />
    </Link>
    <h3>{name}</h3>
    <h3>Dieta:{dieta}</h3>
    <h6>Click en la imagen para acceder a la receta</h6>
    </div>
  );
}
