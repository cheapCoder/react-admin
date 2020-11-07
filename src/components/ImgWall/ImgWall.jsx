import React, { Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqDeletePic } from '../../api/index'

const LOAD_URL = "http://localhost:3000/upload/";
const UPLOAD_URL = "http://localhost:3000/manage/img/upload";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ImgWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  }

  onPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  }

  handleBeforeUpload = (file, fileList) => {             //判断文件是否为image类型
    const fileType = file.type.split("/")[0];
    console.log(file);
    // if(file)
    if (fileType !== "image") {
      message.error("请上传图片类型", 1)
      fileList.pop();
      return false;
    }
    return true;
  }

  handleImgsChange = ({ file, fileList }) => {
    if (file.status === "done") {     //上传图片
      const { status, msg, data } = file.response
      if (status) {
        message.error(msg, 1);
      } else {
        message.success("上传成功", 1);
        fileList.splice(fileList.length - 1, 1, {     //过滤多余的图片信息，只要name，uid，url
          name: file.name,
          uid: file.uid,
          url: file.response.data.url
        })
        this.setState({ fileList });
      }
    }

    if (file.status === 'removed') {    // 删除图片
      // console.log(file.url.slice(file.url.lastIndexOf("/") + 1));
      reqDeletePic(file.url.slice(file.url.lastIndexOf("/") + 1)).then((res) => {
        !res.status && message.success("图片删除成功", 1);
        console.log(fileList);
        this.setState({ fileList });
      })
    }
  }

  componentDidMount() {
    const fileList = this.props.imgs.map((item, index) => ({ uid: "-" + index, name: item, url: `${LOAD_URL}${item}` }));    //遍历生成图片数组
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewTitle, previewImage, fileList } = this.state


    return (<>
      <Upload
        accept="image/*"      //只是主动显示image类型，可能被强制上传其他类型文件，应额外判断
        name="image"
        action={UPLOAD_URL}
        listType="picture-card"
        fileList={fileList}
        onPreview={this.onPreview}
        onChange={this.handleImgsChange}
        beforeUpload={this.handleBeforeUpload}
      >
        {fileList.length >= 4 ? null :
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传图片</div>
          </div>}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => this.setState({ previewVisible: false })}
      >
        <img alt={previewTitle} style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>);
  }
}

export default ImgWall;