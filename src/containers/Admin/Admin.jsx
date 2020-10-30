import React, { Component } from 'react';
import { connect } from "react-redux"
import { message, Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router'

import MySider from "../MySider/MySider"
import MyHeader from '../MyHeader/MyHeader'
import Home from '../Home/Home'
import Category from '../Category/Category'
import Product from '../Product/Product'
import User from '../User/User'
import Role from '../Role/Role'
import Bar from '../Bar/Bar'
import Line from '../Line/Line'
import Pie from '../Pie/Pie'


import './Admin.less'
import { reqVerifyToken } from "../../api/index"
import { changeIsLogin } from '../../redux/action';



@connect(state => ({ user: state.user }), { changeIsLogin })
class Admin extends Component {


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
    const { Footer } = Layout;
    return (
      <Layout className="admin" >
        <MySider />
        <Layout className="admin-main" >
          <MyHeader />
          <div className="admin-content">
            <Switch >
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/prod_about/category" component={Category} />
              <Route path="/admin/prod_about/product" component={Product} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/role" component={Role} />
              <Route path="/admin/charts/pie" component={Pie} />
              <Route path="/admin/charts/line" component={Line} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Redirect to="/admin/home" />
            </Switch>
          </div>

          <Footer className="footer">developed by cheapCoder</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;