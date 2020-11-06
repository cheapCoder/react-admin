import {
  CHANGE_ISLOGIN_ACTION,
  DELETE_USER_ACTION, SAVE_USER_ACTION,
  SAVE_CATEGORY_ACTION, CHANGE_CATEGORY_ACTION,
  SAVE_ROLELIST_ACTION, ADD_ROLELIST_ACTION, UPDATE_ROLELIST_ACTION
} from "./actionTypes";


//保存用户信息
export const saveUserAction = (data) => ({ type: SAVE_USER_ACTION, data });

// 修改登陆状态
export const changeIsLoginAction = () => ({ type: CHANGE_ISLOGIN_ACTION });

// 删除用户信息
export const deleteUserAction = () => ({ type: DELETE_USER_ACTION });

// 保存分类列表
export const saveCategoryAction = (data) => ({ type: SAVE_CATEGORY_ACTION, data })

// 修改分类列表
export const changeCategoryAction = (data) => ({ type: CHANGE_CATEGORY_ACTION, data })

//保存角色列表
export const saveRoleListAction = (data) => ({ type: SAVE_ROLELIST_ACTION, data })

//添加角色列表
export const addRoleListAction = (data) => ({ type: ADD_ROLELIST_ACTION, data });

//更新角色列表
export const updateRoleListAction = (role) => ({ type: UPDATE_ROLELIST_ACTION, data: role })