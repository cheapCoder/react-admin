import { combineReducers } from 'redux'

import { USER_INFO_ACTION } from './actionTypes'



const initialUserInfo = {
  isLogin: false,
};

function loginReducer(state = initialUserInfo, action) {
  console.log(action.type);

  switch (action.type) {
    case USER_INFO_ACTION: return state;
    // case USER_INFO_ACTION: return {
    //   data: action.data,
    //   isLogin: true,
    // };
    default: return state
  }
}





export default combineReducers({
  loginReducer,
})


