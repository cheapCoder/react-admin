import React, { Component } from 'react';
import { connect } from "react-redux"
import { message } from 'antd'

import { reqVerifyToken } from "../../api/index"
import { userInfoAndTokenAction, changeIsLogin } from '../../redux/action';


@connect(state => ({ userInfo: state.userInfo }), {changeIsLogin})
class Admin extends Component {

  componentDidMount() {
    const { userInfo, history, changeIsLogin } = this.props
    // console.log(userInfo);
    userInfo.isLogin || reqVerifyToken().then(({ status, data, err }) => {      //验证用户身份
      console.log({ status, data, err });
      if (status) {   //用户信息检查
        message.error("身份信息失效，请重新登陆！", 1);     //网络请求失败
        history.replace("/login");
      } else {
        changeIsLogin()
      }
    })
  }

  render() {

    return (
      <div><button onClick={this.handle}>clicit</button></div>
    )
  }
}

export default Admin;