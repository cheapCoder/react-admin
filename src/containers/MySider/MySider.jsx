import React, { Component } from 'react'
import Icon from '@ant-design/icons';
import { Menu, Layout } from 'antd'


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
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
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
    let { children, title, key, icon: Icon } = item;
    // Icon = Icon.replace(/^\S/, s => s.toUpperCase());
    console.log(Icon);
    if (!children) {    //没有children则为叶级菜单
      return React.createElement(Item, {
        icon: React.createElement(Icon),
        key,
      }, title)
      // return <Item icon={<Icon />} key={key}>{title}</Item>
    } else {
      // return <SubMenu key={key} icon={<Icon />} title={title}>
      //   {recurMenu(children)}
      // </SubMenu>
      return React.createElement(SubMenu, { key, icon: React.createElement(Icon), title }, recurMenu(children))

    }
  })
}

export default MySider;

