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

const getAllFoods = () => {
  $('#all-foods').html('<tr><th>Food</th><th>Calories</th></tr>')
  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods')
    .then((response) => handleResponse(response))
    .then((foods) => getEachFood(foods))
    .catch((error) => console.error({error}))
}

const getEachFood = (foods) => {
  let sortedFoods = foods.sort((a,b) => a.id > b.id ? -1 : 1)
  sortedFoods.forEach((food) => {
    $('#all-foods').append(`<tr id="${food.id}">
        <td class="name" id="food-${food.id}">${food.name}</td>
        <td class="calories" id="cal-${food.id}">${food.calories}</td>
        <td><button class="delete-btn" aria-label="Delete">
          Delete
        </button></td>
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
  $('.filter').on('keydown', () =>{
    var value = $(this).val().toLowerCase();
    $('td.name').filter( () => {
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
  meals.forEach((meal) => {
    let name = meal.name.toLowerCase()
    let mealTotalCal = 0
    meal["foods"].forEach((food) => {
      $(`#${name}`).append(`<tr class="${food.id}">
      <td class="name" class="food-${food.id}">${food.name}</td>
      <td class="calories" class="cal-${food.id}">${food.calories}</td>
      <td><button class="delete-btn" aria-label="Delete">
      Delete
      </button></td>
      </tr>`)
      mealTotalCal += food.calories
    })
    dayTotalCal += mealTotalCal
    mealTotalCalories(name, mealTotalCal)
  })
  dayTotalCalories(dayTotalCal)
}

const mealTotalCalories = (tableName, total) => {
  $(`#${tableName}`).append(`<tr>
  <td>Total Calories</td>
  <td>${total}</td>
  </tr>`)
}

const dayTotalCalories = (total) => {
  $(`#meal-totals`).append(`<tr>
  <td>Goal Calories</td>
  <td>2000</td>
  </tr>
  <tr>
  <td>Calories Consumed</td>
  <td>${total}</td>
  </tr>
  <tr>
  <td>Remaining Calories</td>
  <td>${2000 - total}</td>
  </tr>`)
}

getAllFoods()
filterFoods()
getAllMeals()
$('#all-foods').on('focusout', removeInputField)
$('#all-foods').on('click', 'tr td.name', createInputField)
$('#all-foods').on('click', 'tr td.calories', createInputField)

$('#add-food-btn').on('click', createFood)

$('#all-foods').on('click', '.delete-btn', removeFood)
