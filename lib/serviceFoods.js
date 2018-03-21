import { removeFood, clearPostForm, removeValidations, appendMeals, getEachFoodDiary, getEachFood, filterFoods, removeMealFood } from './domFoods'
import { postConfig, handleResponse} from './index'


export const deleteFood = (id) => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/foods/${id}`,
  { method: 'DELETE' })
    .catch((error) => console.error({error}))
}

export const postFood = (body) => {
  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods', postConfig(body))
    .then((response) => handleResponse(response))
    .then(() => removeValidations())
    .then(() => getAllFoodsValidation())
    .then(() => clearPostForm())
    .catch((error) => console.error({error}))
}

export const updateFood = (body, id) => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/foods/${id}`, patchConfig(body))
    .then((response) => handleResponse(response))
    .catch((error) => console.error({error}))
}

export const getAllFoods = (meals) => {
  $('#all-foods').html('<tr><th>Food</th><th>Calories</th></tr>')
  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods')
    .then((response) => handleResponse(response))
    .then((foods) => getEachFood(meals, foods))
    .catch((error) => console.error({error}))
}

export const getAllFoodsValidation = () => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/meals`)
    .then((response) => handleResponse(response))
    .then((meals) => getAllFoods(meals))
    .catch((error) => console.error({error}))
}
