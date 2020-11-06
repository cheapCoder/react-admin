import { combineReducers } from 'redux';

import {
  CHANGE_ISLOGIN_ACTION, SAVE_USER_ACTION, DELETE_USER_ACTION,
  SAVE_CATEGORY_ACTION, CHANGE_CATEGORY_ACTION,
  SAVE_ROLELIST_ACTION, ADD_ROLELIST_ACTION, UPDATE_ROLELIST_ACTION
} from './actionTypes';



//用户登录
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

    case CHANGE_ISLOGIN_ACTION: return {
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


// 分类列表
const initailCategory = [];
function categoryReducer(state = initailCategory, { type, data }) {
  switch (type) {

    case SAVE_CATEGORY_ACTION: return [...state, ...data];

    case CHANGE_CATEGORY_ACTION: {
      let arr = [...state];
      arr.splice(state.findIndex((item => item._id === data._id)), 1, data);
      return arr
    }

    default: return state;
  }
}


// 角色列表
const initialRoleList = []
function roleReducer(state = initialRoleList, { type, data }) {
  switch (type) {
    case SAVE_ROLELIST_ACTION: return data;

    case ADD_ROLELIST_ACTION: return [...state, data];

    case UPDATE_ROLELIST_ACTION: {
      let arr = [...state];
      arr.splice(arr.findIndex(item => item._id === data._id), 1, data);
      return arr;
    }

    default: return state;
  }
}


export default combineReducers({
  user: userReducer,
  category: categoryReducer,
  roleList: roleReducer,
})


