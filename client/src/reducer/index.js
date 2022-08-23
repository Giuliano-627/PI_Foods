const initialState = {
  allRecipes: [],
  recipesToRender: [],
  allDiets: [],
  dietsToRender: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        allRecipes: action.payload,
        allDiets: action.diets,
        dietsToRender: action.diets,
        recipesToRender: action.payload,
      };
    case "FILTER_BY_DIET":
      const recipes = state.allRecipes;
      const payload = action.payload.toLowerCase();
      console.log("payload:", payload);
      console.log("recipes:", recipes);
      let dietFiltered;
      if(payload==="dietDefault"){
        dietFiltered = recipes
      } else if(payload==="vegetarian" || payload==="lacto-vegetarian" || payload === "ovo-vegetarian"){
        dietFiltered = recipes.filter((e) => e.diets.includes("lacto ovo vegetarian"))
      } else{
        dietFiltered = recipes.filter((e) => e.diets.includes(payload));
      }
      return {
        ...state,
        recipesToRender: dietFiltered,
      };
    default:
      return state;
  }
}

export default rootReducer;
