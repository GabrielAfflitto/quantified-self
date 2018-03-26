import { clearPostForm, removeValidations, getEachFood, validateForm } from './domFoods'
import { handleResponse } from './index'


export const deleteFood = (id) => {
  fetch(`https://quantified-self-express.herokuapp.com/api/v1/foods/${id}`,
  { method: 'DELETE' })
    .catch((error) => console.error({error}))
}

const postConfig = (body) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

export const postFood = (body) => {
  fetch('https://quantified-self-express.herokuapp.com/api/v1/foods', postConfig(body))
    .then((response) => handleResponse(response))
    .then(() => removeValidations())
    .then(() => getAllFoodsValidation())
    .then(() => clearPostForm())
    .catch((error) => console.error({error}))
}

const patchConfig = (body) => {
  return {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

export const updateFood = (body, id) => {
  fetch(`https://quantified-self-express.herokuapp.com/api/v1/foods/${id}`, patchConfig(body))
    .then((response) => handleResponse(response))
    .catch((error) => console.error({error}))
}

export const getAllFoods = (meals) => {
  $('#all-foods').html('<tr><th>Food</th><th>Calories</th></tr>')
  fetch('https://quantified-self-express.herokuapp.com/api/v1/foods')
    .then((response) => handleResponse(response))
    .then((foods) => getEachFood(meals, foods))
    .catch((error) => console.error({error}))
}

export const getAllFoodsValidation = () => {
  fetch(`https://quantified-self-express.herokuapp.com/api/v1/meals`)
    .then((response) => handleResponse(response))
    .then((meals) => getAllFoods(meals))
    .catch((error) => console.error({error}))
}

export const createFood = (event) => {
  event.preventDefault()
  let name = $('#name').val()
  let calories = $('#calories').val()

  if (validateForm(name,calories) != false) {
    postFood({name, calories})
  }
}
