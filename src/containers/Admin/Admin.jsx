import React, { Component } from 'react';
import { connect } from "react-redux"
import { message, Layout } from 'antd'

import MySider from "../MySider/MySider"
import MyHeader from '../MyHeader/MyHeader'
import MyContent from '../MyContent/MyContent'

import './Admin.less'
import { reqVerifyToken } from "../../api/index"
import { changeIsLogin } from '../../redux/action';



@connect(state => ({ user: state.user }), { changeIsLogin })
class Admin extends Component {
z

  componentDidMount() {
    const { user, history, changeIsLogin } = this.props
    user.isLogin || reqVerifyToken().then(({ status, data, err }) => {      //验证用户身份
      if (status) {   //用户信息检查
        message.error("身份信息失效，请重新登陆！", 1);     //网络请求失败
        history.replace("/login");
      } else {
        changeIsLogin() //单独修改isLogin为true
      }
    })
  }

  render() {
    const {  Content, Footer } = Layout;
    return (
      <Layout className="admin" >
       <MySider/>
        <Layout className="admin-main" >
          <MyHeader/>
          <MyContent/>
          <Footer style={{ textAlign: 'center',backgroundColor:"skyblue" }}>developed by cheapCoder</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;