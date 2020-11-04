import React, { Component } from 'react';
import { connect } from "react-redux";
import { PageHeader, Form, Select, Input, Button } from 'antd';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { reqUpdateProduct, reqAddProduct } from '../../api/index'
import ImgWall from "../../components/ImgWall/ImgWall"
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor'

const { Option } = Select;
const { TextArea } = Input;

@connect(state => ({ category: state.category }))
class ChangeProduct extends Component {

  // 表单提交
  onFinish = async ({ categoryName, desc, detail, name, price }) => {      //{ categoryName, desc, detail, name, price }
    console.log({ categoryName, desc, detail, name, price });
    detail = draftToHtml(convertToRaw(this.richTextEditorRef.state.editorState.getCurrentContent()))    //获取富文本编辑器内容
    const categoryId = this.props.category.find(item => item.name === categoryName)._id     //根据分类名计算分类_id
    const imgs = this.props.location.state.imgs;      //获取图片的名字数组
    const _id = this.props.location.state._id       //获取商品_id, 不是分类_id

    console.log({ _id, categoryName, categoryId, desc, detail, name, price, imgs });
    // let result;
    // if (_id) {
    //   result = await reqUpdateProduct({ _id, categoryId, name, desc, price, detail, imgs })
    // } else {
    //   result = await reqAddProduct({ categoryId, name, desc, price, detail, imgs });
    // }
    // if (result && !result.status) {
    //   this.props.history.push("/admin/prod_about/product")
    // }
  }



  render() {
    const { history: { goBack }, location: { state: { _id, name, categoryId, price, imgs, desc, detail } }, category } = this.props;

    const currentCategory = category.find(item => item._id === categoryId); //计算分类名
    let categoryName = (currentCategory && currentCategory.name) || "请选择分类";

    return (<>
      <PageHeader
        className="site-page-header"
        onBack={() => { goBack() }}
        title={_id ? "修改商品" : "添加商品"}
      />
      <Form
        hideRequiredMark
        scrollToFirstError
        labelCol={{ span: 4, offset: 1 }}
        wrapperCol={{ span: 12, offset: 1 }}
        onFinish={this.onFinish}
      >

        <Form.Item name="name" label="商品名称" initialValue={name || "liheng"} rules={[{ required: true, message: '这是必填项', }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item name="price"
          label="商品价格"
          initialValue={price || ""}
          validateTrigger="onChange"
          rules={[{ required: true, message: '这是必填项', }, { type: "number", transform: (value) => Number(value), message: "请输入数字" },]}>
          <Input prefix="￥" addonAfter="元" placeholder="请输入价格" />
        </Form.Item>

        <Form.Item name="categoryName" label="商品分类" initialValue={categoryName} rules={[{ required: true, message: '这是必填项', }]}>
          <Select
            placeholder="请选择分类"
            allowClear
          >
            {category.map((item) => <Option key={item._id} value={item.name}>{item.name}</Option>)}
          </Select>
        </Form.Item >

        <Form.Item name="desc" label="商品描述" initialValue={desc || ""}>
          <TextArea placeholder="请输入对商品的描述" autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
        </Form.Item>

        <Form.Item label="商品图片" wrapperCol={{ span: 15, offset: 1 }}>
          <ImgWall imgs={imgs} />
        </Form.Item>

        <Form.Item name="detail" label="商品详情" wrapperCol={{ span: 14, offset: 1 }}>
          <RichTextEditor detail={detail} ref={ref => this.richTextEditorRef = ref} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11 }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </>)
  }
}

export default ChangeProduct;