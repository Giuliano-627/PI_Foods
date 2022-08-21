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
    default:
      return state;
  }
}

export default rootReducer;
