import { Layout, message } from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router';

import MyHeader from '../MyHeader/MyHeader';
import MySider from "../MySider/MySider";

import Home from '../Home/Home';
import Category from '../Category/Category';
import Product from '../Product/Product';
import User from '../User/User';
import Role from '../Role/Role';
import Bar from '../Bar/Bar';
import Line from '../Line/Line';
import Pie from '../Pie/Pie';

import './Admin.less';
import { reqCategoryList, reqVerifyToken } from "../../api/index";
import { changeIsLoginAction, saveCategoryAction } from '../../redux/action'





@connect(state => ({ user: state.user }), { changeIsLoginAction, saveCategoryAction })
class Admin extends Component {
  state = {
    headerName: ""
  }

  componentDidMount() {
    const { user, history, changeIsLoginAction, saveCategoryAction } = this.props

    //验证用户身份
    user.isLogin || reqVerifyToken().then(({ status }) => {
      if (status) {   //用户信息检查
        message.error("身份信息失效，请重新登陆！", 1);     //网络请求失败
        history.replace("/login");
      } else {
        changeIsLoginAction() //单独修改isLogin为true
      }
    })

    // 提前获取分类列表，并保存到redux中
    reqCategoryList().then((res) => {
      saveCategoryAction(res.data);   //保存到redux
    })

  }



  setHeaderName = (newName) => {
    this.setState({ headerName: newName })
  }

  render() {
    const { Footer } = Layout;

    return (
      <Layout className="admin" >
        <MySider pathname={this.props.location.pathname} setHeaderName={this.setHeaderName} />
        <Layout className="admin-main" >
          <MyHeader headerName={this.state.headerName} />
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