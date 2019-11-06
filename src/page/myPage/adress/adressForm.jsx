import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Radio,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  Cascader,
  Spin
} from 'antd';

import reqwest from 'reqwest';

const { Option } = Select;
const { TextArea } = Input;

class AdressForm extends PureComponent {
  state = {
    confirmDirty: false,
    shopData: [],
    loading: false,
  };
  componentDidMount() {
    this.getShopData();
  }
  getShopData = () => {
    reqwest({
      url: `${window.imgSrc}/web/index/city.json`,
      method: 'get',
      data: {},
      success: (res) => {
        if (res.result === 'succeed') {
          const shopData = res.data;
          this.setState({
            shopData,
          });
        } else {
          message.error(val.message || '请求异常');
        }
      }
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { User } = this.props;
        if (!User) return;
        this.setState({
          loading: true,
        });
        reqwest({
          url: `${window.imgSrc}/web/index/my/editAddress.json`, // https://www.ushance.com
          method: 'post',
          data: {
            id: User.USE_ID,
            address: JSON.stringify(values),
          },
          success: (res) => {
            this.setState({
              loading: false,
            });
            if (res.result === 'succeed') {
              location.reload();
            } else {
              message.error(res.message || '请求异常');
            }
          }
        })
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { shopData, loading } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
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
          offset: 3,
        },
      },
    };
    return (<Spin tip="Loading..." spinning={loading}>
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
        <Form.Item
          label={
            <span>
              地址信息
            </span>
          }
        >
          {getFieldDecorator('address', {
            rules: [
              { type: 'array', required: true, message: '这里不能为空' },
            ],
          })(<Cascader options={shopData} placeholder="请输入地址信息" />)}
        </Form.Item>
        <Form.Item label="详细地址">
          {getFieldDecorator('detail', {
            rules: [
              {
                required: true,
                message: '这里不能为空',
              },
              {
                max: 120,
                message: '详细地址长度需要在5-120个汉字或字符之间',
              }
            ],
          })(<TextArea  placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
            autosize={{ minRows: 2, maxRows: 6 }}
          />)}
        </Form.Item>
        <Form.Item label="收货人姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '这里不能为空',
              },
              {
                max: 25,
                message: '长度不超过25个字符',
              }
            ],
          })(<Input placeholder="长度不超过25个字符" />)}
        </Form.Item>
        <Form.Item label="手机号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号码' }],
          })(<Input style={{ width: '100%' }} placeholder="电话号码、手机号码必须填一项" />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('default', {
            valuePropName: 'checked',
          })(
            <Checkbox>设置为默认收货地址</Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Spin>);
  }
}

export default Form.create({})(AdressForm);
