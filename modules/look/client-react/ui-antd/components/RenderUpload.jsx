import React from 'react';
import PropTypes from 'prop-types';

import { Form, Upload, Modal, Icon } from 'antd';

const FormItem = Form.Item;

export default class RenderUpload extends React.Component {
  constructor(props) {
    super(props);

    // To Do Fix this thing
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.value
        ? [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: props.value
            }
          ]
        : []
    };
  }

  onChangeHandler = ({ file, fileList }) => {
    // console.log(file.status);
    // console.log(fileList);
    // console.log(file.response.secure_url);
    // const arrayHelpers = this.props.arrayHelpers;

    if (file.status === 'uploading') {
      this.props.setload(true);
    }

    if (file.status == 'done') {
      this.props.setload(false);
      if (file.response) {
        let url = file.response.secure_url;
        if (url) {
          // console.log(url);
          //set value in form
          this.props.input.onChange(url);
        }
      }
    } else if (file.status == 'removed') {
      this.props.setload(false);
      // console.log(file);
      //remove value in form
      this.props.input.onChange('');
    }
    this.setState({ fileList });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    // { input, label, meta: { touched, error }, defaultFileList }) = this.props
    // const touched = this.props.meta.touched;
    // const error = this.props.meta.error;
    const label = this.props.label;
    // const input = this.props.input;
    // console.log(input);
    // const defaultFileList = this.props.defaultFileList;

    const cloudinary_url = 'https://api.cloudinary.com/v1_1/www-lenshood-in/image/upload';
    // { upload_preset: 'nxzf2ip6' }
    // const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const cloudinary_data = { upload_preset: 'nxzf2ip6' };

    let validateStatus = '';
    // if (touched && error) {
    //   validateStatus = 'error';
    // }
    // let defaultFileList = [];
    // if (this.props.values) {
    //   defaultFileList = this.props.values.map((img, index) => ({
    //     uid: index,
    //     name: 'link',
    //     status: 'done',
    //     url: img.imageUrl,
    //     thumbUrl: img.imageUrl
    //   }));
    // }

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <FormItem label={label} validateStatus={validateStatus}>
        <div className="clearfix">
          <Upload
            action={cloudinary_url}
            data={cloudinary_data}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.onChangeHandler}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="image" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>{' '}
      </FormItem>
    );
  }
}
RenderUpload.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  setload: PropTypes.func,

  value: PropTypes.string
};
