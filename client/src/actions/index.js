import axios from "axios";

export function getRecipes() {
  return async (dispatch) => {
    var json = await axios.get("http://localhost:3001/recipes/");
    const diets = await axios.get("http://localhost:3001/diets/");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
      diets: diets.data,
    });
  };
}

export function filterByDiet(payload) {
  return { type: "FILTER_BY_DIET", payload };
}