import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
export default function LandingPage() {
  return (
    <div>
      <div className={style.title}>
        <h1>Bienvenidos a mi proyecto individual</h1>
      </div>
      <div className={style.creditos}>
        <h3>Creditos a SoyHenry por enseñarme {"<3"} </h3>
      </div>
      <div>
        <Link to="/home">
          <button className={style.btn}>Vamos al Home!</button>
        </Link>
      </div>
    </div>
  );
}
