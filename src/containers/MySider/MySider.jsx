import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import { Icon as LegacyIcon } from '@ant-design/compatible';


import reactLogo from "./images/react.png"
import './sider.less'
import menu from './js/menu-config'

const { SubMenu, Item } = Menu;

class MySider extends Component {
  state = {
    collapsed: false,
  };

  handleCollapse = (collapsed) => {

    if (collapsed) {
      this.systemName.style.display = this.state.collapsed ? "inline" : "none";
    }
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  render() {
    const { collapsed } = this.state

    return (<Layout.Sider
      // breakpoint="lg"
      collapsedWidth="80"
      collapsible
      collapsed={collapsed}
      width="250"
      onTransitionEnd={() => { this.systemName.style.display = this.state.collapsed ? "none" : "inline"; }}
      className="admin-sider"
      onCollapse={this.handleCollapse}
    >

      <img src={reactLogo} className="logo" alt="react-logo" />
      <span className="name" ref={(ref) => this.systemName = ref}>后台管理系统</span>

      <Menu
        // onClick={this.handleClick}
        defaultSelectedKeys={["home"]}          //默认选中和打开的key都从路由中获取
        defaultOpenKeys={['prod_about', "charts"]}
        mode="inline"
      >
        {recurMenu(menu)}
      </Menu>
    </Layout.Sider>);
  }
}

// 递归数组返回菜单
function recurMenu(MenuArr) {
  return MenuArr.map((item, index) => {
    let { children, title, key, icon } = item;
    if (!children) {    //没有children则为叶级菜单
      // return React.createElement(Item, {
      //   icon: React.createElement(Icon[iconType]),
      //   key,
      // }, title)
      return <Item icon={<LegacyIcon type={icon} />} key={key}><NavLink  to={item.path}>{title}</NavLink></Item>

    } else {
      // return React.createElement(SubMenu, { key, icon: React.createElement(Icon[iconType]), title }, recurMenu(children))
      return <SubMenu key={key} icon={<LegacyIcon type={icon} />} title={title}>
        {recurMenu(children)}
      </SubMenu>
    }
  })
}

export default MySider;

