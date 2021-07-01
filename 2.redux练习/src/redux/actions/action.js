import {INCREMENT, DECREMENT} from './action-types'

export const increment = (data) => ({type: INCREMENT, data})
export const decrement = (data) => ({type: DECREMENT, data})
export const incrementAsync = (data, delay) => {
 return (dispatch) => {
  setTimeout(() => {
    dispatch(increment(data))
  }, delay);
 }
} 