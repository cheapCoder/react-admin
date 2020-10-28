import { USER_MSG_ACTION } from "./actionTypes"


export const userInfoAndTokenAction = (data) => ({ type: USER_MSG_ACTION, data });

export const changeIsLogin = (data) => ({ type: "changeIsLogin"});