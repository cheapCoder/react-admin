import React, { Component } from 'react';
import { connect } from "react-redux"

import { reqVerifyToken } from "../../api/index"



@connect()
class Admin extends Component {
  // state = {}
  componentDidMount() {
    this.props.isLogin && reqVerifyToken().then(({ status, data }) => {      //验证用户身份
      console.log({ status, data });
      // if (res.status) {   //用户信息检查
        // this.props.history.replace("/login");
      // }
    }).catch(() => {
      this.props.history.push("/login")
    })

  }

  render() {
    return (
      <div>adfadsfasdfasdfasdfasdfsad</div>
    )
  }
}

export default Admin