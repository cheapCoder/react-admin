import axios from 'axios'
import { message } from "antd";
import qs from "querystring"

import { BASE_URL } from '../myConfig'

const instance = axios.create({
  baseURL: BASE_URL,
})
// 拦截器
instance.interceptors.request.use((config) => {

  if (config.method.toLowerCase() === "post") { //统一将post请求的json数据转换为urlencoded格式
    config.data = qs.stringify(config.data)
  }


  console.log(config);
  return config;
})
instance.interceptors.response.use((res) => {
  if (!res.status) {        //统一处理请求成功但后台拒绝的情况
    message.error(res.msg, 1)
    return new Promise()
  } else {
    message.success("操作成功", 1)
    return res.data;
  }
}, (err) => {
  message.error(err.message, 1);     //请求失败
  return new Promise()
})

export default instance;