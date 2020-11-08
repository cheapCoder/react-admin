import { Layout, message } from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router';

import MyHeader from '../MyHeader/MyHeader';
import MySider from "../MySider/MySider";

import Home from '../../components/Home/Home';
import Category from '../Category/Category';
import Product from '../Product/Product';
import User from '../User/User';
import Role from '../Role/Role';
import Bar from '../../components/Bar/Bar';
import Line from '../../components/Line/Line';
import Pie from '../../components/Pie/Pie';
import ChangeProduct from '../ChangeProduct/ChangeProduct'

import './Admin.less';
import { reqCategoryList, reqVerifyToken } from "../../api/index";
import { changeIsLoginAction, saveCategoryAction } from '../../redux/action'
import { publicRoutes } from '../../configs/index'



@connect(state => ({ user: state.user }), { changeIsLoginAction, saveCategoryAction })
class Admin extends Component {
  state = {
    headerName: ""    //显示MyHeader组件标题
  }

  componentDidMount() {
    const { user, history, location, changeIsLoginAction, saveCategoryAction } = this.props

    const arr = location.pathname.split("/")                // 判断当前路由地址用户是否有权限查看
    const lastPathname = arr[arr.length - 1]
    if (user.userInfo.username !== "admin" && !publicRoutes.includes(lastPathname) && !user.userInfo.role.menus.includes(lastPathname)) {
      history.replace("/admin/home");
    }

    //验证用户登陆身份
    user.isLogin || reqVerifyToken().then((res) => {
      if (res && !res.status) {   //用户信息检查
        changeIsLoginAction() //单独修改isLogin为true

        // 提前获取分类列表，并保存到redux中
        reqCategoryList().then(({ data: listData }) => {
          saveCategoryAction(listData);   //保存到redux
        })

      } else {
        message.error("身份信息失效，请重新登陆！", 1);     //网络请求失败
        history.replace("/login");
      }
    })
  }

  render() {

    return (
      <Layout className="admin" >
        <MySider pathname={this.props.location.pathname} setHeaderName={(newName) => { this.setState({ headerName: newName }) }} />
        <Layout className="admin-main" >
          <MyHeader headerName={this.state.headerName} />
          <div className="admin-content">
            <Switch >
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/prod_about/category" component={Category} />
              <Route path="/admin/prod_about/product" component={Product} />
              <Route path="/admin/prod_about/changeproduct" component={ChangeProduct} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/role" component={Role} />
              <Route path="/admin/charts/pie" component={Pie} />
              <Route path="/admin/charts/line" component={Line} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Redirect to="/admin/home" />
            </Switch>
          </div>

          <Layout.Footer className="footer">developed by cheapCoder</Layout.Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;