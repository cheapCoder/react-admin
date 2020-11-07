import React, { Component } from 'react'
import { Menu, Layout } from 'antd'

import reactLogo from "./images/react.png"
import './sider.less'
import menu from './js/menu-config'
import { flatten, recurMenu } from '../../utils/index'


class MySider extends Component {
  state = {
    collapsed: false,
    flattenMenu: []
  }


  handleCollapse = (collapsed) => {
    collapsed && (this.systemName.style.display = this.state.collapsed ? "inline" : "none")
    this.setState({ collapsed: !this.state.collapsed });
  }

  getHeaderName = ({ key }) => {
    if (key === "changeproduct") {
      key = "product";
    }
    console.log(key, this.state.flattenMenu);
    const result = this.state.flattenMenu.find((item) => item.key === key)
    console.log(result);
    result && this.props.setHeaderName(result.title);
  }

  componentDidMount() {
    // console.log(flatten(menu));
    this.setState({ flattenMenu: flatten(menu) }, () => {    //扁平化菜单数组
      const keyArr = this.props.pathname.split('/');
      // console.log(keyArr[keyArr.length - 1]);
      this.getHeaderName({ key: keyArr[keyArr.length - 1] });
    });
  }

  render() {
    const { collapsed } = this.state
    const keyArr = this.props.pathname.split('/')

    let defaultSelectedKeys = keyArr[keyArr.length - 1]     //解决首次加载路由为admin导致无默认选中菜单的bug
    if (defaultSelectedKeys === "admin") {
      defaultSelectedKeys = "home"
    }
    return (<Layout.Sider
      breakpoint="lg"
      collapsedWidth="80"
      collapsible
      collapsed={collapsed}
      width="250"
      onTransitionEnd={() => { this.systemName.style.display = collapsed ? "none" : "inline"; }}
      className="admin-sider"
      onCollapse={this.handleCollapse}
    >

      <img src={reactLogo} className="logo" alt="react-logo" />
      <span className="name" ref={(ref) => this.systemName = ref}>后台管理系统</span>

      <Menu
        onClick={this.getHeaderName}
        defaultSelectedKeys={defaultSelectedKeys}          //默认选中和打开的key都从路由中获取
        defaultOpenKeys={keyArr.slice(2, keyArr.length - 1)}
        mode="inline"
      >
        {recurMenu(menu)}
      </Menu>
    </Layout.Sider>);
  }
}


export default MySider;

