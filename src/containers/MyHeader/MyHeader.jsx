import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Button, Modal } from "antd"
import { SmileTwoTone, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import { withRouter } from 'react-router'
import screenfull from "screenfull"


import './myHeader.less'
import { deleteUserAction } from "../../redux/action"


const { confirm } = Modal;

@connect(state => ({ user: state.user }),
  {
    deleteUserAction,
  })
@withRouter
class MyHeader extends Component {
  state = {
    nowTime: dayjs().format("D MMMM YYYY, h:mm a"),
    isFullscreen: screenfull.isFullscreen,
  }

  handleQuit = () => {
    const that = this;
    confirm({
      width: 300,
      keyboard: true,
      centered: true,
      maskClosable: true,
      okType: "danger",
      okText: "退出登录",
      cancelText: "确定",
      icon: <SmileTwoTone />,
      content: <div style={{ textAlign: "left", font: "bold 16px Arial", verticalAlign: "middle" }}>hi {that.props.user.userInfo.username}</div>,
      onOk() {
        Modal.destroyAll();
        localStorage.clear();     //清除localstorage保存的信息
        that.props.deleteUserAction();   //清除redux保存的信息
        that.props.history.replace("/login");
      },
    });
  }

  handleFullScreen = () => {
    console.log(screenfull.isFullscreen);
    if (screenfull.isEnabled) {
      screenfull.toggle().then(() => {
        console.log(screenfull.isFullscreen);
        this.setState({ isFullscreen: screenfull.isFullscreen })
      });
    }
  }

  componentDidMount() {
    this.timeId = setInterval(() => {     //头部日期显示计时器
      this.setState({
        nowTime: dayjs().format("D MMMM YYYY, h:mm a")
      })
    }, 30000)

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {    // 全屏按钮监听, 解决全屏时用esc退出全屏状态不改变的bug
        this.setState({ isFullscreen: screenfull.isFullscreen })
      });
    }
  }

  componentWillUnmount() {

    this.timeId && clearInterval(this.timeId)
    screenfull.off('change');
  }


  render() {

    return (<div className="header">
      <header>next one</header>
      <nav></nav>
      <ul>
        <li>
          <Button style={{ padding: 0 }} type="link" onClick={this.handleQuit}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="avatar" />
            <span className="name">Hello {this.props.user.userInfo.username}</span>
          </Button>
        </li>
        <li>{this.state.nowTime}</li>
        {/* <li>weather</li> */}
      </ul>
      <Button type="link" className="fullScreen" onClick={this.handleFullScreen}>
        {this.state.isFullscreen ? <FullscreenExitOutlined spin/> : <FullscreenOutlined spin/>}
      </Button>


    </div>);
  }
}

export default MyHeader;