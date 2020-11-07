import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Modal, Input, Table, Spin, Space, notification, Form, Select } from 'antd'
import { createFromIconfontCN, LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'

import { reqUserList, reqAddUser, reqDeleteUser, reqUpdateUser } from '../../api/index'
import { saveRoleListAction } from '../../redux/action'
import { validateRuler as loginValidateRuler } from '../../configs/index'

const { Item } = Form;
const { Option } = Select;
const PAGE_SIZE = 6;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2170307_j02yrol4sjl.js',
});
const validateMessages = {        //添加用户表单验证反馈信息
  required: '${label}是必填项',
  types: {
    email: '${label}不符合邮件格式',
    number: '${label}必须是数字',
  }
};


@connect(({ roleList }) => ({ roleList }), { saveRoleListAction })
class User extends Component {
  state = {
    deleteVisible: false,
    userVisible: false,   //用户添加和修改统一
    confirmLoading: false,

    userList: [],
    currentUser: {},
    okText: "确认"
  }

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      align: "center",
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: "center",
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      align: "center",
    },
    {
      title: '注册时间',
      key: 'create_time',
      dataIndex: 'create_time',
      align: "center",
      render: (createTime) => dayjs(createTime).format("YYYY年 M月-DD日 H:mm")
    },
    {
      title: '所属角色',
      key: 'role_id',
      dataIndex: 'role_id',
      align: "center",
      render: (roleId) => { const role = this.props.roleList.find(item => item._id === roleId); return (role && role.name) || "" }
    },
    {
      title: '操作',
      key: 'operation',
      align: "center",
      render: (currentUser) => (<Space>
        {/* <Button type="link" onClick={() => { this.setState({ currentUser }, () => { this.setState({ userVisible: true }) }) }}>修改</Button> */}
        <Button type="link" onClick={() => { this.setState({ currentUser }, () => { this.setState({ userVisible: true, }) }) }}>修改</Button>
        <Button type="link" onClick={() => { this.setState({ currentUser }, () => { this.setState({ deleteVisible: true, }) }) }}>删除</Button>
      </Space>)
    },
  ];

  // 添加用户和修改用户统一处理函数
  handleChangeUserOk = async () => {    //用户信息modal确认后
    const { currentUser, userList } = this.state;
    this.setState({ okText: "添加中...", confirmLoading: true });

    try {
      const { confirmPassword, ...restReqData } = await this.addFormRef.validateFields()          //首先进行表单验证
      let result;
      if (JSON.stringify(currentUser) === "{}") {
        result = await reqAddUser(restReqData)                //发送添加用户请求                       
        result.status || this.setState({ userList: [...userList, result.data], userVisible: false }); ////请求成功就保存数据到状态里
        result.status && this.addFormRef.resetFields();
      } else {
        result = await reqUpdateUser(currentUser);           //发送更新用户信息请求
        if (!result.status) {
          this.setState({ userList: [...userList.filter(item => item !== currentUser), currentUser], userVisible: false, currentUser: {} })
          // this.addFormRef.resetFields();
        }

      }

    } catch (error) {//请求失败
      console.log(error);
    }

    this.setState({ okText: "确认", confirmLoading: false, currentUser: {} });
  }

  //添加或修改用户modal取消后
  handleUserCancel = () => {
    this.setState({ userVisible: false, currentUser: {} });
    // this.addFormRef.resetFields();
  }

  // 删除用户
  handleDeleteOk = async () => {              //删除用户modal确认后
    const { currentUser, userList } = this.state
    this.setState({ confirmLoading: true });

    const result = await reqDeleteUser(currentUser._id)   //发送删除用户请求
    if (!result.status) {
      notification.success({ description: "删除成功", duration: 1 })
      this.setState({
        userList: [...userList].filter(item => item !== currentUser),
        confirmLoading: false,
        deleteVisible: false,
        currentUser: {}
      })
    }
  }

  componentDidMount() {
    reqUserList().then((res) => {   //请求用户列表
      if (!res.status) {
        this.setState({ userList: res.data.users });
        this.props.saveRoleListAction(res.data.roles);
      }
    })
  }

  render() {
    const { userList, currentUser, deleteVisible, userVisible, confirmLoading, okText, } = this.state;
    const { roleList } = this.props;

    return (<Card
      headStyle={{ border: "none", padding: 0 }}
      bodyStyle={{ padding: 0, }}
      bordered={false}
      title={<Button
        type="primary"
        style={{ borderRadius: 15 }}
        onClick={() => {         //添加用户modal的显示
          this.setState({ userVisible: true, })
        }}
      ><IconFont type="icon-titlebar_ic_add" />添加用户</Button>}
    >
      {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} tip="加载中..." spinning={!userList.length} > */}
      <Table
        columns={this.columns}
        dataSource={userList.reverse()}
        rowKey="_id"
        pagination={{ pageSize: PAGE_SIZE, hideOnSinglePage: true, showTotal: true }}
      />
      {/* </Spin> */}

      <Modal
        centered                   //添加用户和更新用户的模态框
        destroyOnClose
        title={JSON.stringify(currentUser) === "{}" ? "添加用户" : "更新用户"}
        visible={userVisible}
        confirmLoading={confirmLoading}
        onOk={this.handleChangeUserOk}
        onCancel={this.handleUserCancel}
        okText={okText}
        cancelText="取消"
      >
        <Form
          scrollToFirstError
          name="addUserForm"
          labelCol={{ span: 4, offset: 1 }}
          wrapperCol={{ span: 16, offset: 1 }}
          validateMessages={validateMessages}
          requiredMark={false}
          initialValues={{
            username: (currentUser && currentUser.username) || null,
            phone: (currentUser && currentUser.phone) || null,
            email: (currentUser && currentUser.email) || null,
            role_id: (currentUser && currentUser.role_id) || null,
          }}
          ref={ref => this.addFormRef = ref}
        >
          <Item
            name="username"
            label="用户名"
            hasFeedback
            rules={loginValidateRuler}
          >
            <Input autoFocus placeholder="请输入用户名" />
          </Item>
          <Item
            name="password"
            label="密码"
            hasFeedback
            rules={loginValidateRuler}
          >
            <Input.Password placeholder={JSON.stringify(currentUser) === "{}" ? "请输入密码" : "请输入新密码"} />
          </Item>
          <Item
            name="confirmPassword"
            label="确认密码"
            hasFeedback
            rules={[{ required: true }, ({ getFieldValue }) => ({
              validator(role, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("与密码不一致")
              }
            })]}
            dependencies={['password']}
          >
            <Input.Password placeholder={JSON.stringify(currentUser) === "{}" ? "请确认密码" : "请确认新密码"} />
          </Item>
          <Item
            name="phone"
            label="手机号"
            hasFeedback
            rules={[{ required: true }, { type: "number", transform: phone => Number(phone) }]}
          >
            <Input placeholder="请输入手机号" />
          </Item>
          <Item
            name="email"
            label="邮箱"
            hasFeedback
            rules={[{ type: 'email' }, { required: true }]}
          >
            <Input placeholder="请输入邮箱" />
          </Item>
          <Item
            name="role_id"
            label="角色"
            rules={[{ required: true }]}
          >
            <Select placeholder="请选择分类">
              {roleList.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}
            </Select>
          </Item>
        </Form>
      </Modal>

      <Modal                            //删除用户的模态框
        title="用户删除"
        centered
        okButtonProps={{ danger: true, }}
        visible={deleteVisible}
        onOk={this.handleDeleteOk}
        confirmLoading={confirmLoading}
        onCancel={() => { this.setState({ deleteVisible: false, currentUser: {} }) }}
        width="40vw"
      >
        <p><WarningOutlined style={{ color: "#FF4D4F", fontSize: 18, marginRight: 10 }} />删除后不可恢复，确认删除用户？</p>
      </Modal>
    </Card >);
  }
}

export default User 