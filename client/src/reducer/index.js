const initialState = {
  allRecipes: [],
  recipesToRender: [],
  allDiets: [],
  dietsToRender: [],
  details: [],
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
      let dietFiltered;
      if (payload === "dietDefault") {
        dietFiltered = recipes;
      } else if (
        payload === "vegetarian" ||
        payload === "lacto-vegetarian" ||
        payload === "ovo-vegetarian"
      ) {
        dietFiltered = recipes.filter((e) =>
          e.diets.includes("lacto ovo vegetarian")
        );
      } else {
        dietFiltered = recipes.filter((e) => e.diets.includes(payload));
      }
      return {
        ...state,
        recipesToRender: dietFiltered,
      };
    case "GET_RECIPES_NAME":
      return {
        ...state,
        recipesToRender: action.payload,
      };
    case "ORDER_BY_HEALT":
      switch (action.payload) {
        case "salAsc":
          state.recipesToRender.sort((a, b) => {
            if (a.healthScore > b.healthScore) return 1;
            if (b.healthScore > a.healthScore) return -1;
            return 0;
          });
          break;
        case "salDesc":
          state.recipesToRender.sort((a, b) => {
            if (a.healthScore > b.healthScore) return -1;
            if (b.healthScore > a.healthScore) return 1;
            return 0;
          });
          break;
        default:
          break;
      }
      break;
    case "ORDER_BY_ALPH":
      let order;
      if (action.payload === "zToA") {
        order = state.recipesToRender.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        });
      }
      if (action.payload === "aToZ") {
        order = state.recipesToRender.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
      }
      return {
        ...state,
        dogs: order,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        dietsToRender: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
