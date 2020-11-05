import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Card, Modal, Input, message, Table, Tree } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import dayjs from 'dayjs'

import { reqRoleList, reqAddRole, reqUpdateRoleAuth } from '../../api/index'
import { saveRoleListAction } from '../../redux/action'

const PAGE_SIZE = 6;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2170307_j02yrol4sjl.js',
});

const treeData = [
  {
    title: "首页",
    key: "home"
  },
  {
    title: '商品',
    key: 'product_about',
    children: [
      {
        title: '商品管理',
        key: 'product',
      },
      {
        title: '分类管理',
        key: 'category',
      },
    ],
  },
  {
    title: '用户管理',
    key: 'user',
  },
  {
    title: "角色管理",
    key: "role"
  },
  {
    title: "图表",
    key: "charts",
    children: [
      {
        title: "折线图",
        key: "line",
      },
      {
        title: "柱状图图",
        key: "bar",
      },
      {
        title: "饼状图",
        key: "pie",
      }
    ]
  }
];

@connect(({ roleList, user }) => ({ roleList, user }), { saveRoleListAction })
class Role extends Component {
  state = {
    AddRoleVisible: false,
    setAuthVisible: false,
    confirmLoading: false,
    ModalOkText: "确认",
    roleList: [],

    currentRole: {},
    // checkedKeys: [],
    autoExpandParent: true
  };

  columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (createTime) => dayjs(createTime).format("YYYY年 M月-DD日 H:mm")
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      key: 'auth_time',
      render: (authTime) => (authTime && dayjs(authTime).format("YYYY年 M月-DD日 H:mm")) || "",
    },
    {
      title: '授权人',
      key: 'auth_name',
      dataIndex: 'auth_name',
    },
    {
      title: '操作',
      key: 'operation',
      render: (currentRole) => (<Button type="link" onClick={() => { this.handleSetAuth(currentRole) }}>修改权限</Button>),
    },
  ];

  // 添加角色
  handleAddRoleOk = async () => {
    const currentValue = this.roleInput.state.value && this.roleInput.state.value.trim()
    if (!currentValue) {                        //检测分类名是否为空
      message.warn("内容不能为空", 1);
      return;
    }
    this.setState({ confirmLoading: true, modalText: "加载中..." })
    const result = await reqAddRole(currentValue);
    if (!result.status) {
      this.props.saveRoleListAction([result.data]);   // 这个只返回一个角色对象，应手动包装成数组
      message.success("添加成功", 1);
    }
    this.roleInput.state.value = ""
    this.setState({ confirmLoading: false, AddRoleVisible: false })
  };

  handleAddRoleCancel = () => {
    this.setState({
      AddRoleVisible: false,
    });
    this.roleInput.state.value = ""
  }

  // 设置权限
  handleSetAuth = (currentRole) => {
    // console.log(currentRole);
    this.setState({ setAuthVisible: true, currentRole })
  }

  // 设置权限点击确认
  handleSetAuthOk = () => {
    const { _id, menus } = this.state.currentRole
    // console.log(this.state.currentRole);
    // console.log();
    // reqUpdateRoleAuth({ _id, menus, auth_time: Date.now(), auth_name: this.props.user.userInfo.username }).then(())             //start！！！！！！！！
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    let newRole = Object.assign({}, this.state.currentRole, { menus: checkedKeys });
    this.setState({ currentRole: newRole })
  };

  componentDidMount() {
    reqRoleList().then((res) => {     //请求角色列表
      res.status || this.props.saveRoleListAction(res.data);
    })
  }

  render() {
    const { ModalOkText, AddRoleVisible, setAuthVisible, confirmLoading, currentRole, expandedKeys, checkedKeys } = this.state;
    const { roleList } = this.props;
    console.log(currentRole);

    return (<div>
      <Card
        headStyle={{ border: "none", padding: 0 }}
        bodyStyle={{ padding: 0, }}
        bordered={false}

        title={<Button
          type="primary"
          style={{ borderRadius: 15 }}
          onClick={() => { this.setState({ AddRoleVisible: true }); }}
        ><IconFont type="icon-titlebar_ic_add" />添加角色</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={roleList}
          rowKey="_id"
          pagination={{ pageSize: PAGE_SIZE }}
        />
        <Modal                            //添加角色的模态框
          title="添加角色"
          visible={AddRoleVisible}
          confirmLoading={confirmLoading}
          onOk={this.handleAddRoleOk}
          onCancel={this.handleAddRoleCancel}
          okText={ModalOkText || "确认"}
          cancelText="取消"
        >
          <Input autoFocus placeholder="请输入角色名" ref={ref => this.roleInput = ref} />
        </Modal>
        <Modal                           //编辑角色权限的模态框
          title={`授权${currentRole.name}: `}
          centered
          visible={setAuthVisible}
          // visible={true}
          onOk={this.handleSetAuthOk}
          onCancel={() => { this.setState({ setAuthVisible: false }) }}
          width={500}
        >
          <Tree
            checkable
            selectable={false}
            defaultExpandAll
            autoExpandParent={true}
            onCheck={this.onCheck}
            checkedKeys={currentRole.menus}
            treeData={treeData}
          />
        </Modal>
      </Card >
    </div>);
  }
}

export default Role
