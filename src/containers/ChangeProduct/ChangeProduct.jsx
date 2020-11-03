import React, { Component } from 'react';
import { PageHeader, Form, Select, Input, Button, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


class ChangeProduct extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
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
    console.log(this.props);
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const { history: { goBack }, location: { state: productDetail } } = this.props;


    return (<>
      <PageHeader
        className="site-page-header"
        onBack={() => { goBack() }}
        title={productDetail ? "修改商品" : "添加商品"}
      />
      <Form
        labelCol={{ span: 4, offset: 1 }}
        wrapperCol={{ span: 12, offset: 1 }}
      >
        <Form.Item label="商品名称">
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item label="商品价格">
          <Input prefix="￥" addonAfter="元" placeholder="请输入价格" />
        </Form.Item>
        <Form.Item label="商品分类">
          <Select
            placeholder="请选择分类"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="商品描述">
          <TextArea placeholder="请输入对商品的描述" autoSize={{ minRows: 2, maxRows: 6 }} allowClear />
        </Form.Item>
        <Form.Item label="商品图片">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={({ fileList }) => this.setState({ fileList })}
          >
            {fileList.length >= 8 ? null :
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
        <Form.Item label="商品详情">

        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <Button type="primary">提交</Button>
        </Form.Item>
      </Form>
    </>)
  }
}

export default ChangeProduct;