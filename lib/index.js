import { appendMeals, getEachFoodDiary, filterFoods, removeMealFood, createFoodInMeal } from './domIndex'
import { validateForm, getEachFood, removeFood, removeValidations, createInputField, removeInputField } from './domFoods'
import { postFood, getAllFoodsValidation, createFood } from './serviceFoods'
import { getAllFoodsDiary, countIncrement, getAllMeals, postFoodToMeal } from './serviceIndex'

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
