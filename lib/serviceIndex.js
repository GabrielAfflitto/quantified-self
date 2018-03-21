import { appendMeals, getEachFoodDiary, filterFoods, removeMealFood } from './domIndex'
import { postConfig, handleResponse} from './index'


export const getAllFoodsDiary = () => {
  $('#all-foods-diary').html('<tr><th>Food</th><th class=sort>Calories</th></tr>')
  fetch('https://quantifiedself-backend.herokuapp.com/api/v1/foods')
  .then((response) => handleResponse(response))
  .then((foods) => getEachFoodDiary(count, foods))
  .catch((error) => console.error({error}))
}

var count = 0;

export const countIncrement = () => {
  count ++;
  if(count > 2){
    count = 0;
  }
  getAllFoodsDiary()
}

export const getAllMeals = () => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/meals`)
    .then((response) => handleResponse(response))
    .then((meals) => appendMeals(meals))
    .catch((error) => console.error({error}))
}
