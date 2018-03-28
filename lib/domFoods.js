import { deleteFood, updateFood } from './serviceFoods'


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

export const createInputField = (event) => {
  event.preventDefault()
  let $input = $(event.target)
  let type = $input.attr("class")
  $input.html(`<input class="${type}" type="text" placeholder=${event.target.innerHTML}  value="${event.target.innerHTML}"aria-required="true">`)
}

export const removeInputField = (event) => {
  let id = event.target.parentNode.parentNode.id
  $(event.target.closest("td")).html(event.target.value)
  updateFood({[$(event.target).attr("class")]: event.target.value}, id)
}
