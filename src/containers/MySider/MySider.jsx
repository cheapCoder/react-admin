import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'
import { Icon as LegacyIcon } from '@ant-design/compatible';    //有待商榷！！！

import reactLogo from "./images/react.png"
import './sider.less'
import menus from './js/menu-config'
import { flatten } from '../../utils/index'

const { SubMenu, Item } = Menu;

@connect(state => ({ userInfo: state.user.userInfo }))
class MySider extends Component {
  state = {
    collapsed: false,
    flattenMenu: []
  }


  handleCollapse = (collapsed) => {
    collapsed && (this.systemName.style.display = this.state.collapsed ? "inline" : "none")
    this.setState({ collapsed: !this.state.collapsed });
  }

  getHeaderName = ({ key }) => {    //传对象是为了契合menu上的点击事件的默认传参
    if (key === "changeproduct") {    //解决商品修改或添加页刷新后标题消失的bug
      key = "product";
    }
    console.log(1);
    const result = this.state.flattenMenu.find((item) => item.key === key)
    console.log(result);
    result && this.props.setHeaderName(result.title);
  }

  recurMenu = (MenuArr) => {     // 递归数组返回菜单 
    const { username, role } = this.props.userInfo;
    return MenuArr.map((item) => {
      let { children, title, key, icon } = item;

      if (!children) {    //没有children则为叶级菜单

        // console.log(key, role.menus);
        if (username !== "admin" && !role.menus.includes(key)) {      //用户鉴权
          return null;
        }

        // return React.createElement(Item, {
        //   icon: React.createElement(Icon[iconType]),
        //   key,
        // }, title)
        return <Item icon={<LegacyIcon type={icon} />} key={key}><Link to={item.path}>{title}</Link></Item> //此写法已经过时!!!!

      } else {
        const child = this.recurMenu(children);
        if (child.every(item => item === null)) {         //判断子列表是否有菜单要显示，没有就不显示当前一级菜单
          return null;
        }

        // return React.createElement(SubMenu, { key, icon: React.createElement(Icon[iconType]), title }, recurMenu(children))
        return <SubMenu key={key} icon={<LegacyIcon type={icon} />} title={title}>
          {child}
        </SubMenu>
      }
    })
  }

  componentDidMount() {
    this.setState({ flattenMenu: flatten(menus) }, () => {       //扁平化菜单数组
      const arr = this.props.pathname.split("/")
      this.getHeaderName({ key: arr[arr.length - 1] })
    })
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
        {this.recurMenu(menus)}
      </Menu>
    </Layout.Sider>);
  }
}


export default MySider;

