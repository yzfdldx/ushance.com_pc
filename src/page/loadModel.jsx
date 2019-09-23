import React from 'react';
import { Modal, Input, Form, message } from 'antd';
import reqwest from 'reqwest';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //
    };
  }
  handleOk = () => {
    const { backFn, visibleFn } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        reqwest({
          url: 'http://www.ushance.com/web/index/my/load.json',
          method: 'get',
          data: {
            ...values
          },
          success: function (val) {
            if (val.result === 'succeed') {
              message.success('登录成功');
              if (val.data && val.data[0]) {
                backFn(val.data[0]);
                visibleFn();
              }
            } else {
              message.error(`登录失败:${val.message}`);
            }
          }
        })
      }
    });
  }
  handleCancel = () => {
    this.props.form.resetFields();
    this.props.visibleFn();
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const { TabPaneList, value } = this.state;
    const { children, params } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (<Modal
      title="请登录"
      visible={true}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="登录"
      cancelText="取消"
    >
      <Form layout2="inline" {...formItemLayout}>
        <Form.Item label="用户名" >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名，位数3-24', min: 3, max: 24 }],
          })(<Input size2="small" placeholder="用户名" style={{width: '100%', marginLeft: '8px'}} />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码，位数6-12', min: 6, max: 12 }],
            // initialValue: 1
          })(<Input.Password size2="small" placeholder="密码至少6位" style={{width: '100%', marginLeft: '8px'}} />)}
        </Form.Item>
      </Form>
    </Modal>);
  }
}

const AppForm = Form.create()(App);
export default AppForm;
