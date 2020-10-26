import {} from '../actionTypes'


const initialState = 100;

export default function (state = initialState, action) {
  switch (action.type) {
    case "what": return state + action.data;
    default: return state
  }
}