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

const removeValidations = () => {
  $('.validation').remove()
}

const getAllFoods = () => {
  $('#all-foods').html('<tr><th>Food</th><th>Calories</th></tr>')
  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods')
    .then((response) => response.json())
    .then((foods) => getEachFood(foods))
    .catch((error) => console.error({ error }))
}

const getEachFood = (foods) => {
  let sortedFoods = foods.sort((a,b) => a.id > b.id ? -1 : 1)
  sortedFoods.forEach((food) => {
    $('#all-foods').append(`<tr>
        <td class="food" id="food-${food.id}">${food.name}</td>
        <td class="cal">${food.calories}</td>
        <td><button id="${food.id}" class="delete-btn" aria-label="Delete">
          Delete
        </button></td>
      </tr>`)
  })
}

const removeFood = (event) => {
  event.target.parentNode.parentNode.remove()
  deleteFood(event.target.id)
}

const deleteFood = (id) => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/foods/${id}`,
  { method: 'DELETE' })
    .catch((error) => console.error({ error }))
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
    .then((response) => response.json())
    .then(() => removeValidations())
    .then(() => getAllFoods())
    .then(() => clearPostForm())
    .catch((error) => console.error({ error }))
}

const createInputFieldFood = (event) => {
  event.preventDefault();
  $(`#${event.target.id}`).html(`<input id="name" type="text" placeholder=${event.target.innerHTML}  value="${event.target.innerHTML}"aria-required="true">`);
}

getAllFoods()

$('#all-foods').on('click', 'tr td.food', createInputFieldFood)

$('#add-food-btn').on('click', createFood)

$('#all-foods').on('click', '.delete-btn', removeFood)
