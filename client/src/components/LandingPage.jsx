import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>titulo de la landing page</h1>
      <Link to="/home">
        <button>Boton para ir al home</button>
      </Link>
    </div>
  );
}
