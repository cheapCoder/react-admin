import {INCREMENT, DECREMENT} from '../actions/action-types'

const initState = 0
export default function counter (preState = initState, action) {
  console.log(preState);
  let newState
  switch (action.type) {
    case INCREMENT: newState = preState + action.data;
                    return newState;
    case DECREMENT: newState = preState - action.data;
                    return newState;
    default: return preState;
  }
}