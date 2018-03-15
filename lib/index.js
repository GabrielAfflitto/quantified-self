const validateForm = () => {
  let name = $('#name').val()
  let calories = $('#calories').val()
  if (name === "" && calories === "") {
    $('.form-container').append('<p>Please enter a food name</p>')
    $('.form-container').append('<p>Please enter a calorie amount</p>')
    return false
  } else if (name === "") {
    $('.form-container').append('<p>Please enter a food name</p>')
    return false
  } else if (calories === "") {
    $('.form-container').append('<p>Please enter a calorie amount</p>')
    return false
  }
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
        <td>${food.name}</td>
        <td>${food.calories}</td>
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

  validateForm(name,calories)

  postFood({name, calories})
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
    .then(() => getAllFoods())
    .catch((error) => console.error({ error }))
}

getAllFoods()

$('#add-food-btn').on('click', createFood)

$('#all-foods').on('click', '.delete-btn', removeFood)
