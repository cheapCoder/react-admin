import React, { Component } from 'react';
import { connect } from "react-redux";
import { PageHeader, Form, Select, Input, Button, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import RichTextEditor from '../../components/RichTextEditor/RichTextEditor'


const { Option } = Select;
const { TextArea } = Input;
const UPLOAD_URL = "http://localhost:3000/upload/";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@connect(state => ({ category: state.category }))
class ChangeProduct extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
    ],
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  }

  componentDidMount() {
    // this.setFileList();
    console.log(this.props);
    // this.setState({})
  }

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    const { history: { goBack }, location: { state: { _id, name, categoryId, price, imgs, desc, detail } }, category } = this.props;

    const currentCategory = category.find(item => item._id === categoryId); //计算分类名
    let categoryName = (currentCategory && currentCategory.name) || "请选择分类";

    const fileList = imgs.map((item, index) => ({ uid: "-" + index, name: item, url: `${UPLOAD_URL}${item}` }));    //遍历生成图片数组
    return (<>
      <PageHeader
        className="site-page-header"
        onBack={() => { goBack() }}
        title={_id ? "修改商品" : "添加商品"}
      />
      <Form
        labelCol={{ span: 4, offset: 1 }}
        wrapperCol={{ span: 12, offset: 1 }}
      >
        <Form.Item name="name" label="商品名称" initialValue={name || "liheng"}>
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item name="price" label="商品价格" initialValue={price || ""}>
          <Input prefix="￥" addonAfter="元" placeholder="请输入价格" />
        </Form.Item>
        <Form.Item name="categoryName" label="商品分类" initialValue={categoryName || ""}>
          <Select
            placeholder="请选择分类"
            // onChange={onGenderChange}
            allowClear
          >
            {category.map((item) => <Option value={item.name}>{item.name}</Option>)}
          </Select>
        </Form.Item >
        <Form.Item name="desc" label="商品描述" initialValue={desc || ""}>
          <TextArea placeholder="请输入对商品的描述" autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
        </Form.Item>
        <Form.Item label="商品图片" wrapperCol={{ span: 15, offset: 1 }}>
          <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={({ fileList }) => this.setState({ fileList })}
          >
            {fileList.length >= 4 ? null :
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={() => this.setState({ previewVisible: false })}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Form.Item>
        <Form.Item name="detail" label="商品详情" wrapperCol={{ span: 14, offset: 1 }}>
          <RichTextEditor />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <Button type="primary">提交</Button>
        </Form.Item>
      </Form>
    </>)
  }
}

export default ChangeProduct;