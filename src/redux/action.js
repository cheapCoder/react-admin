import { USER_INFO_ACTION } from "./actionTypes"


export const userInfoAction = (data) => {
  console.log({
    type: USER_INFO_ACTION,
    data
  });
  return {
    type: USER_INFO_ACTION,
    data
  }
};