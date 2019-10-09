import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
} from 'antd';

import Note from './note.jsx';

const { Option } = Select;
const { TextArea } = Input;

class DeviceForm extends PureComponent {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
        <Form.Item label="设备名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '这里不能为空',
              },
            ],
          })(<Input placeholder="请输入设备名称" />)}
        </Form.Item>
        <Form.Item label="设备检测类型">
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '这里不能为空',
              },
            ],
          })(<Input placeholder="请输入设备检测类型" />)}
        </Form.Item>
        <Form.Item label="设备分类">
          {getFieldDecorator('dedail_type', {
            rules: [
              {
                required: true,
                message: '这里不能为空',
              },
            ],
          })(<Input placeholder="请输入设备分类" />)}
        </Form.Item>
        <Form.Item label="设备价格">
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: '这里不能为空',
              },
            ],
          })(<InputNumber placeholder="请输入设备价格" style={{ width: 200 }}
            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />)}
        </Form.Item>
        <Note {...this.props} />
        <Form.Item label="手机号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号码' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="电话号码、手机号码必须填一项" />)}
        </Form.Item>
        <Form.Item label="设备介绍">
          {getFieldDecorator('adress')(<TextArea  placeholder="请输入设备介绍"
            autosize={{ minRows: 2, maxRows: 6 }}
          />)}
        </Form.Item>
        <Form.Item label="需要的材料和要求">
          {getFieldDecorator('adress1')(<TextArea  placeholder="请输入测试需要的材料和要求"
            autosize={{ minRows: 2, maxRows: 6 }}
          />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({})(DeviceForm);
