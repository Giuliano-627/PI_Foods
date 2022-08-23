import React from "react";

export default function Paginado({ recipesPorPag, recipesToRender, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipesToRender / recipesPorPag); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li>
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
