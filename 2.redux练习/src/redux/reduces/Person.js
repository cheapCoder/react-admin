import {INCREMENT, DECREMENT} from '../actions/action-types'

const initState = [{name:'li', age: 12}, {name: 'what', age:22}]
export default function counter (preState = initState, action) {
  return preState
}