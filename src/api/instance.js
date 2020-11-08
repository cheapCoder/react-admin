import axios from 'axios'
import { message } from "antd";
import qs from "querystring"
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

import store from '../redux/store'

const instance = axios.create({
  baseURL: "http://localhost:3000",
  // timeout: 5000
})

let cancel = null;
const cancelToken = new axios.CancelToken(c => {
  cancel = c;
});

// 拦截器

// 拦截器封装个人理念：
//     统一添加token
//     如果失败，所有请求统一用antd在此显示错误的信息
//     请求无论成功或失败都返回resolve(结果对象(res或err)，自动登陆验证token失败除外)，且不进行其他跳转之内的操作
//     token验证失败就清除localStorage


instance.interceptors.request.use((config) => {
  NProgress.start();
  config.cancelToken = cancelToken      //统一添加取消请求的标识

  if (config.method.toLowerCase() === "post") {   //统一将post请求的json数据转换为urlencoded格式
    config.data = qs.stringify(config.data)
  }

  if (config.url !== "/login" && config.url !== "/manage/img/upload") {  //  统一添加token
    const token = store.getState().user.token || JSON.parse(localStorage.getItem('userToken')) || "";
    // if (token) {
    config.headers.Authorization = "atguigu_" + token;
    // } else {
    //   // throw new Error("无token信息，请重新登陆！");
    //   return Promise.reject("无token信息，请重新登陆！")
    // }
  }
  return config;
})


instance.interceptors.response.use((res) => {
  NProgress.done()
  const { status, msg } = res.data;

  // if (status) {           //统一处理请求成功但后台拒绝的情况
  //   message.error(msg, 1)
  // } else {
  //   // msg && message.success("自动登陆成功", 1); //这个会导致每次刷新都显示此消息
  // }
  status && message.error(msg, 1);
  return res.data;

}, (err) => {
  NProgress.done()
  // if (err.message === "Request failed with status code 401" || "Request failed with status code 500") {  //token验证不通过或后台无响应
  if (err.message === "Request failed with status code 401") {    //用户token验证不通过
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    return Promise.resolve({ status: 1, err })  //为了统一返回成功promise原则
  }

  // message.error(err.message, 1);     //网络请求失败
  return new Promise(() => { })
})
export { cancel }
export default instance;