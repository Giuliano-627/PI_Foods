require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");
const { Dieta, Recipe } = require("../db.js");
const router = Router();

//------------------Aqui nos definimos la url en base a la API_Key que esta en .env--------------------

const { API_KEY } = process.env;
const url =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
  API_KEY +
  "&addRecipeInformation=true&number=100";
//console.log("API_KEY=",API_KEY)

//----------------------------Aqui nos traemos los datos desde la api------------------------------

const getApiInfo = async () => {
  const apiUrl = await axios.get(url);
  const apiInfo = await apiUrl.data.results.map((el) => {
    return {
      name: el.title,
      id: el.id,
      resumen: el.summary,
      healthScore: el.healthScore,
      image: el.image,
      diets: el.diets,
      stepByStep:
        el.analyzedInstructions[0] && el.analyzedInstructions[0].steps
          ? el.analyzedInstructions[0].steps.map((item) => item.step).join("\n")
          : "",
    };
  });
  return apiInfo;
};
//--------------------Ahora nos traemos los datos desde la database----------------------
const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Dieta,
      attributes: ["name"],
      throught: { interTab: [] },
    },
  });
};
//----------------Ahora concatenamos datos de api con DB para retornarlos----------------
const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  console.log("Data base info:", dbInfo);
  return apiInfo.concat(dbInfo);
};
//----------------Aqui hacemos el get a recipes con o sin parametros por query--------------
router.get("/recipes", async (req, resp) => {
  const name = req.query.name; //lo que venga en ?name=
  let totalRecipes = await getAllInfo();
  if (name) {
    let recipeName = await totalRecipes.filter(
      (elem) => elem.name.toLowerCase().includes(name.toLowerCase())
    );
    recipeName
      ? resp.status(200).json(recipeName)
      : resp.status(404).send("No existe la receta solicitada, disculpe");
  } else {
    try {
      resp.status(200).send(totalRecipes);
    } catch (error) {
      console.log("Error al hacer get en recipes:", error);
    }
  }
});
//----Aqui nos traemos la receta requerida por ID
router.get("/recipes/:idRecetas", async (req, resp) => {
  const { idRecetas } = req.params;
  let totalRecipes = await getAllInfo();
  let recipe = totalRecipes.filter((elem) => elem.id == idRecetas);
  recipe
    ? resp.status(200).json(recipe)
    : resp.status(404).send("La id no coincide con ninguna receta");
});

//----Aqui guardamos las dietas en la base de datos
router.get("/diets", async (req, resp) => {
  let diets = [
    {
      name: "Gluten Free",
    },
    {
      name: "Ketogenic",
    },
    {
      name: "Vegetarian",
    },
    {
      name: "Lacto-Vegetarian",
    },
    {
      name: "Ovo-Vegetarian",
    },
    {
      name: "Vegan",
    },
    {
      name: "Pescetarian",
    },
    {
      name: "Paleo",
    },
    {
      name: "Primal",
    },
    {
      name: "Whole 30",
    },
  ];
  diets.map((el) => {
    Dieta.findOrCreate({
      where: {
        name: el.name,
      },
    });
  });
  try {
    let name = await Dieta.findAll();
    resp.status(200).send(name);
  } catch (error) {
    return resp.status(400).send("Dietas no encontradas");
  }
});

router.post("/recipes", async (req, resp) => {
  const { name, resumen, healthScore, stepByStep, image, diets } = req.body;
  try {
    let createRecipe = await Recipe.create({
      name,
      resumen,
      healthScore,
      stepByStep,
      image,
      diets,
    });
    let dietaDB = await Dieta.findAll({
      where: { name: diets },
    });
    if (!name)
      return resp
        .status(404)
        .send({ error: "Debe ingresar un nombre para la receta" });
    if (!resumen)
      return resp
        .status(404)
        .send({ error: "Debe ingresar un resumen de la receta" });
    createRecipe.addDieta(dietaDB);
    resp.sendStatus(200).send("Dieta creada");
  } catch (error) {
    console.log("ERROR AL CREAR RECETA:", error);
  }
});

module.exports = router;
