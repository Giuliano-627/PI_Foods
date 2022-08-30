import React from "react";
import style from "./Paginado.module.css";
export default function Paginado({
  recipesPorPag,
  recipesToRender,
  paginado,
  currentPag,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipesToRender / recipesPorPag); i++) {
    pageNumbers.push(i);
  }
  function paginadoFlecha(pagina) {
    if (pagina >= 1 && pagina <= pageNumbers.length) {
      paginado(pagina);
    }
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li className={style.list} key={number}>
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
      <div>
        <button
          className={style.ant}
          onClick={() => paginadoFlecha(currentPag - 1)}
        ></button>
        <span className={style.numb}>{currentPag}</span>
        <button
          className={style.sig}
          onClick={() => paginadoFlecha(currentPag + 1)}
        ></button>
      </div>
    </nav>
  );
}
