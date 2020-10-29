import { combineReducers } from 'redux';
import { CHANGE_ISLOGIN_action, SAVE_USER_ACTION, DELETE_USER_ACTION } from './actionTypes';




const initialUser = {
  // isLogin: JSON.parse(localStorage.getItem("userToken")) !== null,    // 即使有token也有可能过期了，所以默认设置为false，使admin首次渲染时都发送check_token请求，并在验证通过够使用单独一个action单独修改isLogin为true
  isLogin: false,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  token: JSON.parse(localStorage.getItem("userToken")) || ""
};

function userReducer(state = initialUser, action) {
  switch (action.type) {

    case SAVE_USER_ACTION: return {
      userInfo: action.data.user,
      token: action.data.token,
      isLogin: true,
    };

    case CHANGE_ISLOGIN_action: return {
      ...state,
      isLogin: true,
    };

    case DELETE_USER_ACTION: return {
      userInfo: {},
      token: "",
      isLogin: false,
    };
    default: return state;
  }
}





export default combineReducers({
  user: userReducer,
})


