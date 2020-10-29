import { CHANGE_ISLOGIN_action, DELETE_USER_ACTION, SAVE_USER_ACTION } from "./actionTypes";



export const saveUserAction = (data) => ({ type: SAVE_USER_ACTION, data });

export const changeIsLogin = () => ({ type: CHANGE_ISLOGIN_action});

export const deleteUserAction = () => ({ type: DELETE_USER_ACTION});