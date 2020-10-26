import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, message } from 'antd';

import { demo } from '../../redux/actions/actiondemo';
import { reqLogin } from '../../api/index'
import './login.less'

//表单布局
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 2 },
};

//表单验证规则
const validateRuler = [{ required: true, message: "这是必输项" }, { max: 12, message: "输入超出上限" }, { min: 4, message: "输入不及下限" }, { whitespace: true, message: "are you kidding？" }, { pattern: /^\w+$/, message: '必须是英文、数组或下划线组成' }]

// 组件类
class Login extends React.Component {
  componentDidMount() {
    // console.log(this.props);
  }

  onFinish = ({username, password}) => {
    reqLogin(username, password).then((res)=> {
      console.log(res);
    })
    console.log('Success:', username, password);
  };

  onFinishFailed = errorInfo => {
    message.error('输入有误，请重新输入', 1);
    console.log('Failed:', errorInfo);
  };
  render() {

    return (
      <div className="login">
        <h1>React后台管理系统</h1>
        <article className="loginForm">
          <h2 style={{ marginTop: "20px" }}>LOGIN IN</h2>
          <Form
            requiredMark={false}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}

          >
            <Form.Item
              className="center"
              label="用户名"
              name="username"
              rules={validateRuler}
            >
              <Input placeholder="请输入用户名" allowClear />
            </Form.Item>

            <Form.Item

              className="center"
              label="密码"
              name="password"
              rules={validateRuler}
            >
              <Input.Password placeholder="请输入密码" allowClear />
            </Form.Item>

            <Form.Item
              className="center"
              {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
        </Button>
            </Form.Item>
          </Form>

        </article>

      </div>
    )
  }
};


export default connect(
  state => ({
    state: state.demo
  }),
  { demo }
)(Login)