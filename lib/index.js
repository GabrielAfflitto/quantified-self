import { remainingCalories, dayTotalCalories, mealTotalCalories } from './domIndex'

const validateForm = () => {
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

const handleResponse = (response) => {
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

const removeValidations = () => {
  $('.validation').remove()
}

const getAllFoods = (meals) => {
  $('#all-foods').html('<tr><th>Food</th><th>Calories</th></tr>')
  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods')
    .then((response) => handleResponse(response))
    .then((foods) => getEachFood(meals, foods))
    .catch((error) => console.error({error}))
}

const getAllFoodsValidation = () => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/meals`)
    .then((response) => handleResponse(response))
    .then((meals) => getAllFoods(meals))
    .catch((error) => console.error({error}))
}

const getEachFood = (meals,foods) => {
  let sortedFoods = foods.sort((a,b) => a.id > b.id ? -1 : 1)
  let foodsInMeals = []
  meals.forEach((meal) => {
    meal["foods"].forEach((food) => {
      foodsInMeals.push(food.id)
    })
  })
  sortedFoods.forEach((food) => {
      if ($.inArray(food.id, foodsInMeals) === -1) {
        $('#all-foods').append(`<tr id="${food.id}">
        <td class="name" id="food-${food.id}">${food.name}</td>
        <td class="calories" id="cal-${food.id}">${food.calories}</td>
        <td><button class="delete-btn" aria-label="Delete">
        Delete
        </button></td>
        </tr>`)
      } else {
        $('#all-foods').append(`<tr id="${food.id}">
        <td class="name" id="food-${food.id}">${food.name}</td>
        <td class="calories" id="cal-${food.id}">${food.calories}</td>
        <td><button class="delete-btn" aria-label="Delete" disabled>
        Delete
        </button></td>
        </tr>`)
    }
  })
}

const getAllFoodsDiary = () => {
  $('#all-foods-diary').html('<tr><th>Food</th><th class=sort>Calories</th></tr>')
  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods')
  .then((response) => handleResponse(response))
  .then((foods) => getEachFoodDiary(foods))
  .catch((error) => console.error({error}))
}

const getEachFoodDiary = (foods) => {
  let sortedFoods;
  if(count === 1){
    sortedFoods = foods.sort((a,b) => a.calories < b.calories ? -1 : 1)
  } else if(count === 2){
    sortedFoods = foods.sort((a, b) => a.calories > b.calories ? -1 : 1)
  } else {
    sortedFoods = foods.sort((a,b) => a.id > b.id ? -1 : 1)
  }
  sortedFoods.forEach((food) => {
    $('#all-foods-diary').append(`<tr id="${food.id}">
        <td><input type="checkbox"></td>
        <td class="name" id="food-${food.id}">${food.name}</td>
        <td class="calories" id="cal-${food.id}">${food.calories}</td>
      </tr>`)
  })
}



const removeFood = (event) => {
  let tr = event.target.parentNode.parentNode
  tr.remove()
  deleteFood(tr.id)
}

const deleteFood = (id) => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/foods/${id}`,
  { method: 'DELETE' })
    .catch((error) => console.error({error}))
}

const createFood = (event) => {
  event.preventDefault()
  let name = $('#name').val()
  let calories = $('#calories').val()

  if (validateForm(name,calories) != false) {
    postFood({name, calories})
  }
}

const clearPostForm = () => {
  $('.form-container')[0].reset()
}

const postConfig = (body) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

const postFood = (body) => {
  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods', postConfig(body))
    .then((response) => handleResponse(response))
    .then(() => removeValidations())
    .then(() => getAllFoods())
    .then(() => clearPostForm())
    .catch((error) => console.error({error}))
}

const createInputField = (event) => {
  event.preventDefault();
  let $input = $(event.target)
  let type = $input.attr("class")
  $input.html(`<input class="${type}" type="text" placeholder=${event.target.innerHTML}  value="${event.target.innerHTML}"aria-required="true">`);
}

const removeInputField = (event) => {
  let id = event.target.parentNode.parentNode.id
  $(event.target.closest("td")).html(event.target.value)
  updateFood({[$(event.target).attr("class")]: event.target.value}, id)
}

const updateFood = (body, id) => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/foods/${id}`, patchConfig(body))
    .then((response) => handleResponse(response))
    .catch((error) => console.error({error}))
}

const patchConfig = (body) => {
  return {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

const filterFoods = () => {
  $('.filter').on('keydown', function(){
    var value = $(this).val().toLowerCase();
    $('td.name').filter(function(){
      $(this.parentNode).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
}

const getAllMeals = () => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/meals`)
    .then((response) => handleResponse(response))
    .then((meals) => appendMeals(meals))
    .catch((error) => console.error({error}))
}

const appendMeals = (meals) => {
  let dayTotalCal = 0
  $('#breakfast').html('<caption>Breakfast</caption><tr><th>Name</th><th>Calories</th></tr>')
  $('#snack').html('<caption>Snacks</caption><tr><th>Name</th><th>Calories</th></tr>')
  $('#lunch').html('<caption>Lunch</caption><tr><th>Name</th><th>Calories</th></tr>')
  $('#dinner').html('<caption>Dinner</caption><tr><th>Name</th><th>Calories</th></tr>')
  meals.forEach((meal) => {
    let name = meal.name.toLowerCase()
    let mealTotalCal = 0
    meal["foods"].forEach((food) => {
      $(`#${name}`).append(`<tr class="${food.id}">
      <td class="food-${food.id}">${food.name}</td>
      <td class="calories" class="cal-${food.id}">${food.calories}</td>
      <td><button class="delete-mealFood" aria-label="Delete">
      Delete
      </button></td>
      </tr>`)
      mealTotalCal += food.calories
    })
    dayTotalCal += mealTotalCal
    mealTotalCalories(name, mealTotalCal)
    remainingCalories(name, mealTotalCal)
  })
  dayTotalCalories(dayTotalCal)
}

// const mealTotalCalories = (tableName, total) => {
//   $(`#${tableName}`).append(`<tr>
//   <td>Total Calories</td>
//   <td>${total}</td>
//   </tr>`)
// }

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

const removeMealFood = (event) => {
  let $tr = event.target.parentNode.parentNode
  let mealId = event.target.parentNode.parentNode.parentNode.parentNode.className.slice(-1)
  $tr.remove()
  deleteMealFood($tr.className, mealId)
}

const deleteMealFood = (foodId, mealId) => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, {method: 'DELETE'})
    .then(() => getAllMeals())
    .catch((error) => console.error({error}))
}


var count = 0;

const countIncrement = () => {
  count ++;
  if(count > 2){
    count = 0;
  }
  getAllFoodsDiary()
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
