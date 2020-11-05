import React, { useContext, useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from "react-redux"
import { Table, Input, Button, Popconfirm, Form, Modal, message } from 'antd';
import { createFromIconfontCN, QuestionCircleOutlined } from '@ant-design/icons';

import { addCategoryList, updateCategoryList } from '../../api/index'
import { saveCategoryAction, changeCategoryAction } from '../../redux/action'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2170307_j02yrol4sjl.js',
});

const EditableContext = React.createContext();


// 行属性
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


// 单元格属性
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();

      await updateCategoryList(record._id, values.name)  //请求更新分类列表
      dispatch(changeCategoryAction({ _id: record._id, name: values.name }))    //分发修改redux的category的action

    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        noStyle
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },]} >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>) : (<div onClick={toggleEdit}>
        {children}
      </div>);
  }
  return <td {...restProps}>{childNode}</td>;
};




@connect(state => ({ category: state.category }), { saveCategoryAction })
class Category extends React.Component {
  state = {
    ModalOkText: "",
    visible: false,
    confirmLoading: false,
  }

  columns = [
    {
      title: '分类名  (点击修改)',
      dataIndex: 'name',
      width: '50%',
      editable: true,
      align: "center",
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: "center",
      render: () => {
        return this.props.category.length >= 1 ? (
          <Popconfirm title="删除后不可恢复，确认删除？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} okText="确定" cancelText="算了算了" okButtonProps={{ "danger": true }} onConfirm={() => {
            Modal.warning({
              content: 'haha，你被骗了，分类不应该删除哦:>',
            })
          }}>
            <Button type="link">删除分类</Button>
          </Popconfirm >
        ) : null
      }
    }
  ]

  //添加分类
  handleAddOk = () => {
    const currentValue = this.categoryInput.state.value && this.categoryInput.state.value.trim()
    if (!currentValue) {                        //检测分类名是否为空
      message.warn("内容不能为空", 1);
      return;
    }

    this.setState({
      ModalOkText: '正在添加...',
      confirmLoading: true,
    })
    addCategoryList(this.categoryInput.state.value.trim()).then((res) => {  //发送请求
      this.setState({
        visible: false,
        confirmLoading: false,
        ModalOkText: "确认",
      });
      this.categoryInput.state.value = ""
      res.data && this.props.saveCategoryAction([res.data]);   //保存新数据到redux
    })
    // Modal.destroyAll();
  };
  // 取消添加分类
  handleAddCancel = () => {
    this.setState({
      visible: false,
    });
    this.categoryInput.state.value = ""
  };

  componentDidMount() {
    // console.log(this);
    // console.log(this.categoryInput);
    // this.categoryInput.focus(); 
  }

  render() {
    const { visible, confirmLoading, ModalOkText } = this.state;
    const reverseCategory = [...this.props.category].reverse();
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    return (
      <>
        <Button
          onClick={() => { this.setState({ visible: true }); }}
          type="primary"
          style={{
            marginBottom: 16,
            marginLeft: "68vw",
            borderRadius: 15,
          }}
        ><IconFont type="icon-titlebar_ic_add" />
          添加分类
        </Button>
        <Modal
          title="添加分类"
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
          okText={ModalOkText}
          cancelText="取消"
        >
          <Input placeholder="请输入类名" autoFocus ref={ref => { this.categoryInput = ref }} />
        </Modal>
        <Table
          rowKey="_id"
          components={components}
          rowClassName='editable-row'
          bordered
          dataSource={reverseCategory}
          columns={columns}
          pagination={{ defaultPageSize: 5, hideOnSinglePage: true, }}
          loading={!reverseCategory.length}
        />
      </>
    );
  }
}

export default Category;
