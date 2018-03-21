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
