import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd';

import { demo } from '../../redux/actions/actiondemo';
import './login.less'


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 2 },
};

class Login extends React.Component {
  componentDidMount() {
    // console.log(this.props);
  }

  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  render() {

    return (
      <div className="login">
        <h1>react后台管理系统</h1>
        <article className="loginForm">
          <h2 style={{marginTop: "20px"}}>Login In</h2>
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
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
            className="center"
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
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