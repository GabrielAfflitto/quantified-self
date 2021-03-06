import { postFoodToMeal, deleteMealFood } from './serviceIndex'

const mealCalories = {
  "breakfast": 400,
  "lunch": 600,
  "snack": 200,
  "dinner": 800
}

const remainingCaloriesClassType = (goal, total) => {
  if(goal - total < 0){
    return "negative";
  } else {
    return "positive";
  }
}

const remainingCalories = (tableName, total) => {
  let goal = mealCalories[tableName]
  let type = remainingCaloriesClassType(goal, total)
  $(`#${tableName}`).append(
    `<tr>
    <td>Remaining Calories</td>
    <td class="${type}">${goal - total}</td>
    </tr>`
  )
}

const dayTotalCalories = (total) => {
  let type = remainingCaloriesClassType(2000, total)
  $(`#meal-totals`).html('')
  $(`#meal-totals`).append(
    `<tr><th></th><th>Calories</th></tr>
    <tr>
    <td>Goal Calories</td>
    <td>2000</td>
    </tr>
    <tr>
    <td>Calories Consumed</td>
    <td>${total}</td>
    </tr>
    <tr>
    <td>Remaining Calories</td>
    <td class="${type}">${2000 - total}</td>
    </tr>`
  )
}

const mealTotalCalories = (tableName, total) => {
  $(`#${tableName}`).append(
    `<tr>
    <td>Total Calories</td>
    <td>${total}</td>
    </tr>`
  )
}

const appendMealsTableHead = () => {
  $('#breakfast').html('<h3>Breakfast</h3><tr><th>Name</th><th>Calories</th></tr>')
  $('#snack').html('<h3>Snacks</h3><tr><th>Name</th><th>Calories</th></tr>')
  $('#lunch').html('<h3>Lunch</h3><tr><th>Name</th><th>Calories</th></tr>')
  $('#dinner').html('<h3>Dinner</h3><tr><th>Name</th><th>Calories</th></tr>')
}

export const appendMeals = (meals) => {
  let dayTotalCal = 0
  appendMealsTableHead()
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

const determineSortedFoods = (count, foods) => {
  if(count === 1){
    return foods.sort((a,b) => a.calories < b.calories ? -1 : 1)
  } else if(count === 2){
    return foods.sort((a, b) => a.calories > b.calories ? -1 : 1)
  } else {
    return foods.sort((a,b) => a.id > b.id ? -1 : 1)
  }
}

export const getEachFoodDiary = (count, foods) => {
  let sortedFoods = determineSortedFoods(count, foods)
  sortedFoods.forEach((food) => {
    $('#all-foods-diary').append(
      `<tr id="${food.id}">
      <td class="name" id="food-${food.id}">${food.name}</td>
      <td class="calories" id="cal-${food.id}">${food.calories}</td>
      <td><input type="checkbox" aria-label="check for foods"></td>
      </tr>`
    )
  })
}

export const filterFoods = () => {
  $('.filter').on('keydown', function(){
    var value = $(this).val().toLowerCase();
    $('td.name').filter(function(){
      $(this.parentNode).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
}

export const removeMealFood = (event) => {
  let $tr = event.target.parentNode.parentNode
  let mealId = event.target.parentNode.parentNode.parentNode.parentNode.className.slice(-1)
  $tr.remove()
  deleteMealFood($tr.className, mealId)
}

export const createFoodInMeal = (event) => {
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
