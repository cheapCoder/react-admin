import axios from 'axios'
import { message } from "antd";
import qs from "querystring"
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

import { BASE_URL } from '../myConfig'
import store from '../redux/store'

const instance = axios.create({
  baseURL: BASE_URL,
})

// 拦截器

// 拦截器封装个人理念：
//     统一添加token
//     所有请求统一用antd在此显示结果的信息(成功或失败)
//     请求无论成功或失败都返回resolve(结果对象(res或err)，自动登陆验证token失败除外)，且不进行其他跳转之内的操作
//     token验证失败就清楚localStorage


instance.interceptors.request.use((config) => {
  NProgress.start();

  if (config.method.toLowerCase() === "post") {   //统一将post请求的json数据转换为urlencoded格式
    config.data = qs.stringify(config.data)
  }

  if (config.url !== "/login" && config.url !== "/manage/img/upload") {  //  统一添加token
    const token = store.getState().userInfo.token || JSON.parse(localStorage.getItem('userToken')) || "";
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
  const {data, status, msg} = res.data

  if (status) {           //统一处理请求成功但后台拒绝的情况
    message.error(msg, 1)
  } else {
    // msg && message.success("自动登陆成功", 1); //这个会导致每次刷新都显示此消息
    data && message.success("操作成功", 1);
  }
  return res.data;

}, (err) => {
  NProgress.done()

  if (err.message === "Request failed with status code 401") {  //token验证不通过
    // localStorage.clear();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    return Promise.resolve({ status: 1, err })  //为了统一返回成功promise原则
  }

  message.error(err.message, 1);     //网络请求失败
  return new Promise(() => { })
})

export default instance;