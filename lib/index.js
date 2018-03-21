import { appendMeals, getEachFoodDiary, filterFoods, removeMealFood } from './domIndex'
import { validateForm, getEachFood, removeFood, removeValidations, createInputField, removeInputField } from './domFoods'
import { postFood, getAllFoodsValidation, createFood } from './serviceFoods'
import { getAllFoodsDiary, countIncrement } from './serviceIndex'

export const handleResponse = (response) => {
  return response.json()
    .then((json) => {
    if(!response.ok) {
      const error = {
        status: response.status,
        statusText: response.statusText,
        json
      }
      return Promise.reject(error)
      debugger
    }
    return json
  })
}

const getAllMeals = () => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/meals`)
    .then((response) => handleResponse(response))
    .then((meals) => appendMeals(meals))
    .catch((error) => console.error({error}))
}

const createFoodInMeal = (event) => {
  event.preventDefault()
  let mealId = event.target.id.slice(-1)
  $('#all-foods-diary tr').each((index, row) => {
    if (index != 0 && $(row).find(':checkbox:checked').length === 1) {
      let foodId = parseInt(row.id)
      postFoodToMeal(mealId, foodId)
    }
  })
  $('input[type=checkbox]').prop('checked', false)
}

const postMealConfig = () => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  }
}

const postFoodToMeal = (mealId, foodId) => {
  fetch(`http://quantifiedself-backend.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, postMealConfig())
    .then(() => getAllMeals())
    .catch((error) => console.error({error}))
}

export const deleteMealFood = (foodId, mealId) => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, {method: 'DELETE'})
    .then(() => getAllMeals())
    .catch((error) => console.error({error}))
}

getAllFoodsValidation()
getAllFoodsDiary()
filterFoods()
getAllMeals()

$('#all-foods').on('focusout', removeInputField)
$('#all-foods').on('click', 'tr td.name', createInputField)
$('#all-foods').on('click', 'tr td.calories', createInputField)

$('#add-food-btn').on('click', createFood)

$('#all-foods-diary').on('click', '.sort', countIncrement)
$('#all-meals').on('click', '.delete-mealFood', removeMealFood)
$('#all-foods').on('click', '.delete-btn', removeFood)

$('#meal-1').on('click', createFoodInMeal)
$('#meal-2').on('click', createFoodInMeal)
$('#meal-3').on('click', createFoodInMeal)
$('#meal-4').on('click', createFoodInMeal)
