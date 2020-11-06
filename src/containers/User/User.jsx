import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Modal, Input, Table, Spin, Space } from 'antd'
import { createFromIconfontCN, LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'

import { reqUserList } from '../../api/index'
import { saveRoleListAction } from '../../redux/action'

const PAGE_SIZE = 6;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2170307_j02yrol4sjl.js',
});


@connect(({ roleList }) => ({ roleList }), { saveRoleListAction })
class User extends Component {
  state = {
    AddUserVisible: "false",
    userList: [],
    deleteVisible: false,
    confirmDeleteLoading: false,
    // modalText:""
  }

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      // render: text => <a>{text}</a>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '注册时间',
      key: 'create_time',
      dataIndex: 'create_time',
      render: (createTime) => dayjs(createTime).format("YYYY年 M月-DD日 H:mm")
    },
    {
      title: '所属角色',
      key: 'role_id',
      dataIndex: 'role_id',
      render: (roleId) => { const role = this.props.roleList.find(item => item._id === roleId); return (role && role.name) || "" }
    },
    {
      title: '操作',
      key: 'operation',
      render: (currentRole) => (<Space>
        <Button type="link" onClick={() => { this.setState({ setAuthVisible: true, currentRole }) }}>修改</Button>
        <Button type="link" onClick={() => { this.setState({ deleteVisible: true }) }}>删除</Button>
      </Space>),
    },
  ];

  handleDeleteOk = () => {
    this.setState({ confirmDeleteLoading: true })
  }

  componentDidMount() {

    reqUserList().then((res) => {
      if (!res.status) {
        this.setState({ userList: res.data.users });
        this.props.saveRoleListAction(res.data.roles);
      }
    })
  }

  render() {
    const { userList, deleteVisible, confirmDeleteLoading } = this.state;

    return (<Card
      headStyle={{ border: "none", padding: 0 }}
      bodyStyle={{ padding: 0, }}
      bordered={false}

      title={<Button
        type="primary"
        style={{ borderRadius: 15 }}
        onClick={() => { this.setState({ AddUserVisible: true }); }}
      ><IconFont type="icon-titlebar_ic_add" />添加用户</Button>}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} tip="加载中..." spinning={!userList.length} >
        <Table
          columns={this.columns}
          dataSource={userList}
          rowKey="_id"
          pagination={{ pageSize: PAGE_SIZE, hideOnSinglePage: true, showTotal: true }}
        />
      </Spin>

      {/* <Modal                            //添加角色的模态框
        title="添加角色"
        visible={AddRoleVisible}
        confirmLoading={confirmLoading}
        onOk={this.handleAddRoleOk}
        onCancel={this.handleAddRoleCancel}
        okText={ModalOkText || "确认"}
        cancelText="取消"
      >
        <Input autoFocus placeholder="请输入角色名" ref={ref => this.roleInput = ref} />
      </Modal> */}

      <Modal              //删除用户
        title="用户删除"
        centered
        okButtonProps={{ danger: true, }}
        visible={deleteVisible}
        onOk={this.handleDeleteOk}
        confirmLoading={confirmDeleteLoading}
        onCancel={() => { this.setState({ deleteVisible: false }) }}
        width="40vw"
        // bodyStyle={{ textAlign: "center" }}
      >
        <p><WarningOutlined style={{color:"#FF4D4F", fontSize:18,marginRight:10}}/>删除后不可恢复，确认删除用户？</p>
      </Modal>
    </Card >);
  }
}

export default User