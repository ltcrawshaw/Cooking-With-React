import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid'
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const RecipeContextValue = {
    handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete: handleRecipeDelete,
    handleRecipeSelect: handleRecipeSelect,
    handleRecipeChange: handleRecipeChange
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        {id: uuidv4(), name: 'Name', amount: '1 Tbs'}
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) { 
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }
  return (
  <>
  <RecipeContext.Provider value={RecipeContextValue}>
    <RecipeList recipes={recipes}/>
    {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
  </RecipeContext.Provider>
  </>
  )
}
const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put salt on Chicken\n2. Put chicken in oven \n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      },
    ]
  },
  {
    id: 5,
    name: 'Plain Pork',
    servings: 3,
    cookTime: '2:30',
    instructions: "1. Put paprika on Pork\n2. Put pork in oven \n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      },
    ]
  }
]

export default App;
