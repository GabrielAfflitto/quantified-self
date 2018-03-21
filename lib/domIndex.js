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

export const remainingCalories = (tableName, total) => {
  let goal = mealCalories[tableName]
  let type = remainingCaloriesClassType(goal, total)
  $(`#${tableName}`).append(`<tr>
    <td>Remaining Calories</td>
    <td class="${type}">${goal - total}</td>
  </tr>`)
}

export const dayTotalCalories = (total) => {
  let type = remainingCaloriesClassType(2000, total)
  $(`#meal-totals`).html('')
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
  <td class="${type}">${2000 - total}</td>
  </tr>`)
}

export const mealTotalCalories = (tableName, total) => {
  $(`#${tableName}`).append(`<tr>
  <td>Total Calories</td>
  <td>${total}</td>
  </tr>`)
}
