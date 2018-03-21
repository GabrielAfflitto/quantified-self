import { removeFood } from './domFoods'

export const deleteFood = (id) => {
  fetch(`https://quantifiedself-backend.herokuapp.com/api/v1/foods/${id}`,
  { method: 'DELETE' })
    .catch((error) => console.error({error}))
}
