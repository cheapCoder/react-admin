import { combineReducers } from 'redux'

import { USER_MSG_ACTION } from './actionTypes'



const initialUserInfo = {
  // isLogin: JSON.parse(localStorage.getItem("userToken")) !== null,    // 即使有token也有可能过期了，所以默认设置为false，使admin首次渲染时都发送check_token请求，并在验证通过够使用单独一个action单独修改isLogin为true
  isLogin: false,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  token: JSON.parse(localStorage.getItem("userToken")) || ""
};

function loginReducer(state = initialUserInfo, action) {
  switch (action.type) {

    case USER_MSG_ACTION: return {
      ...state,
      ...action.data,
      isLogin: true,
    };

    case "changeIsLogin": return {
      ...state,
      isLogin: true,
    };

    default: return state;
  }
}





export default combineReducers({
  userInfo: loginReducer,
})


