import { deleteFood } from './serviceFoods'
import { getAllFoods, postConfig, handleResponse } from './index'


export const validateForm = () => {
  removeValidations()
  let name = $('#name').val()
  let calories = $('#calories').val()
  if (name === "" && calories === "") {
    $('.form-container').append('<p class="validation">Please enter a food name</p>')
    $('.form-container').append('<p class="validation">Please enter a calorie amount</p>')
    return false
  } else if (name === "") {
    $('.form-container').append('<p class="validation">Please enter a food name</p>')
    return false
  } else if (calories === "") {
    $('.form-container').append('<p class="validation">Please enter a calorie amount</p>')
    return false
  }
}

export const removeValidations = () => {
  $('.validation').remove()
}

const getFoodsInMeals = (meals) => {
  let foodsInMeals = []
  meals.forEach((meal) => {
    meal["foods"].forEach((food) => {
      foodsInMeals.push(food.id)
    })
  })
  return foodsInMeals
}

const sortFoods = (foods) => {
  return foods.sort((a,b) => a.id > b.id ? -1 : 1)
}

const foodAppendWithRegularDelete = (food) => {
  $('#all-foods').append(`<tr id="${food.id}">
  <td class="name" id="food-${food.id}">${food.name}</td>
  <td class="calories" id="cal-${food.id}">${food.calories}</td>
  <td><button class="delete-btn" aria-label="Delete">
  Delete
  </button></td>
  </tr>`)
}

const foodAppendWithDisabledDelete = (food) => {
  $('#all-foods').append(`<tr id="${food.id}">
  <td class="name" id="food-${food.id}">${food.name}</td>
  <td class="calories" id="cal-${food.id}">${food.calories}</td>
  <td><button class="delete-btn" aria-label="Delete" disabled>
  Delete
  </button></td>
  </tr>`)
}

export const getEachFood = (meals,foods) => {
  let sortedFoods = sortFoods(foods)
  let foodsInMeals = getFoodsInMeals(meals)
  sortedFoods.forEach((food) => {
      if ($.inArray(food.id, foodsInMeals) === -1) {
        foodAppendWithRegularDelete(food)
      } else {
        foodAppendWithDisabledDelete(food)
    }
  })
}

export const removeFood = (event) => {
  let tr = event.target.parentNode.parentNode
  tr.remove()
  deleteFood(tr.id)
}

export const clearPostForm = () => {
  $('.form-container')[0].reset()
}
