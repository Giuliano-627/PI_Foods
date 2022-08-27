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

export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/recipes?name=" + name);
      return dispatch({
        type: "GET_RECIPES_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log("Error en getRecipesName:", error);
    }
  };
}

export function orderByHealt(payload) {
  return {
    type: "ORDER_BY_HEALT",
    payload,
  };
}

export function orderAlph(payload) {
  return {
    type: "ORDER_BY_ALPH",
    payload,
  };
}

export function get_details(id) {
  console.log("entrando al get_details");
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/recipes/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log("Error en get_details:", error);
    }
  };
}

export function post_recipe(payload) {
  return async function (dispatch) {
    console.log("a punto de postear:",payload)
    const response = await axios.post("http://localhost:3001/recipes", payload);
    return response;
  };
}

export function getDiets(payload) {
  return async function (dispatch) {
    let info = await axios.get("http://localhost:3001/diets", {});
    return dispatch({
      type: "GET_DIETS",
      payload: info.data,
    });
  };
}
