import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import { Icon as LegacyIcon } from '@ant-design/compatible';    //有待商榷！！！


import reactLogo from "./images/react.png"
import './sider.less'
import menu from './js/menu-config'



const { SubMenu, Item } = Menu;

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
    const result = this.state.flattenMenu.find((item) => item.key === key)
    result && this.props.setHeaderName(result.title);

  }

  componentDidMount() {
    flatten(menu);        //扁平化菜单数组
    this.setState({ flattenMenu: shortArr }, () => {
      const keyArr = this.props.pathname.split('/');
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

// 递归数组返回菜单
function recurMenu(MenuArr) {
  return MenuArr.map((item) => {
    let { children, title, key, icon } = item;
    if (!children) {    //没有children则为叶级菜单
      // return React.createElement(Item, {
      //   icon: React.createElement(Icon[iconType]),
      //   key,
      // }, title)
      return <Item icon={<LegacyIcon type={icon} />} key={key}><Link to={item.path}>{title}</Link></Item>
      // return <Item key={key}><Link to={item.path}>{title}</Link></Item>

    } else {
      // return React.createElement(SubMenu, { key, icon: React.createElement(Icon[iconType]), title }, recurMenu(children))
      return <SubMenu key={key} icon={<LegacyIcon type={icon} />} title={title}>
        {recurMenu(children)}
      </SubMenu>
      // return <SubMenu key={key} title={title}>
      //   {recurMenu(children)}
      // </SubMenu>
    }
  })
}

let shortArr = [];
function flatten(arr) {   //扁平化数组
  arr.forEach(item => {
    if (item.children) {
      flatten(item.children);
    } else {
      shortArr.push(item);
    }
  });
}

export default MySider;

