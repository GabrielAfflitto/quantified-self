import { appendMeals, getEachFoodDiary } from './domIndex'
import { handleResponse } from './index'


export const getAllFoodsDiary = () => {
  $('#all-foods-diary').html('<tr><th>Food</th><th class=sort>Calories</th></tr>')
  fetch('https://quantified-self-express.herokuapp.com/api/v1/foods')
  .then((response) => handleResponse(response))
  .then((foods) => getEachFoodDiary(count, foods))
  .catch((error) => console.error({error}))
}

var count = 0;

export const countIncrement = () => {
  count ++;
  if(count > 2){
    count = 0;
  }
  getAllFoodsDiary()
}

export const getAllMeals = () => {
  fetch(`https://quantified-self-express.herokuapp.com/api/v1/meals`)
    .then((response) => handleResponse(response))
    .then((meals) => appendMeals(meals))
    .catch((error) => console.error({error}))
}

export const postFoodToMeal = (mealId, foodId) => {
  fetch(`https://quantified-self-express.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, postMealConfig())
    .then(() => getAllMeals())
    .catch((error) => console.error({error}))
}

const postMealConfig = () => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  }
}

export const deleteMealFood = (foodId, mealId) => {
  fetch(`https://quantified-self-express.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, {method: 'DELETE'})
    .then(() => getAllMeals())
    .catch((error) => console.error({error}))
}
