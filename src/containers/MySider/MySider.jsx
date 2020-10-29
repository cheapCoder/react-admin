import React, { Component } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd'

import reactLogo from "./images/react.png"
import './sider.less'

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

  handleClick = e => {
    console.log('click ', e);
  };


  render() {
    const { collapsed } = this.state
    const { SubMenu } = Menu;
    
    return (<Layout.Sider
      breakpoint="lg"
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
        onClick={this.handleClick}
        // style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <MailOutlined />
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <SettingOutlined />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </Layout.Sider>);
  }
}

export default MySider;

