import { CHANGE_ISLOGIN_ACTION, DELETE_USER_ACTION, SAVE_USER_ACTION, SAVE_CATEGORY_ACTION } from "./actionTypes";



export const saveUserAction = (data) => ({ type: SAVE_USER_ACTION, data });

export const changeIsLoginAction = () => ({ type: CHANGE_ISLOGIN_ACTION});

export const deleteUserAction = () => ({ type: DELETE_USER_ACTION});

export const saveCategoryAction = (data) => ({type: SAVE_CATEGORY_ACTION, data})