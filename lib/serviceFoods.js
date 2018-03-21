import { removeFood, clearPostForm, removeValidations } from './domFoods'
import { getAllFoodsValidation, postConfig, handleResponse } from './index'

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
