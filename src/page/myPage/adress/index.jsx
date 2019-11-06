import React, { PureComponent } from 'react';
// import {  Breadcrumb, Alert, Tabs } from 'antd';
import { Table, Divider, Tag, message, Tabs } from 'antd';
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Cascader,
  Spin,
  Modal
} from 'antd';
import './index.less';
import Fun from 'yzflhez-js-function';
const { GetCookie, SetCookie } = Fun;
const { confirm } = Modal;

import reqwest from 'reqwest';

// import AdressForm from './adressForm.jsx';
// import OldAdressTable from './oldAdressTable.jsx';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

class Adress extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      User: null,
      data: [],
      shopData: [],
      loading: false,
      init: null,
    };
  }
  componentDidMount() {
    let User = GetCookie('UseData');
    if (User) {
      User = JSON.parse(User)
    } else {
      User = {};
    }
    if (!User.USE_ID) {
      message.error('请先登录');
    } else {
      this.setState({
        User,
      }, () => {
        this.getAddressFn();
        this.getShopData();
      });
    }
  }
  getAddressFn = () => { // 获取地址列表
    const { User } = this.state;
    this.setState({
      loading: true,
    });
    reqwest({
      url: `${window.imgSrc}/web/index/my/getAddress.json`, // https://www.ushance.com
      method: 'get',
      data: {
        id: User.USE_ID,
      },
      success: (res) => {
        this.setState({
          loading: false,
        });
        if (res.result === 'succeed') {
          if (res.data) {
            this.setState({
              data: res.data,
            });
          }
        } else {
          message.error(res.message || '请求异常');
        }
      }
    })
  }
  cardClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }
  buttonClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }
  getShopData = () => { // 获取城市
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
  handleSubmit = e => { // 保存地址
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { User, init } = this.state;
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
            key: init ? init.key : undefined
          },
          success: (res) => {
            this.setState({
              loading: false,
              init: null,
            });
            this.props.form.resetFields();
            if (res.result === 'succeed') {
              this.getAddressFn();
            } else {
              message.error(res.message || '请求异常');
            }
          }
        })
      }
    });
  }
  deleteFn = (k) => { // 删除地址
    const { User } = this.state;
    const { resetFields } = this.props.form;
    confirm({
      title: '确定要删除这个地址?',
      content: '删除后不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.setState({
          loading: true,
          init: null,
        });
        resetFields();
        reqwest({
          url: `${window.imgSrc}/web/index/my/deleteAddress.json`, // https://www.ushance.com
          method: 'post',
          data: {
            id: User.USE_ID,
            key: k,
          },
          success: (res) => {
            this.setState({
              loading: false,
            });
            if (res.result === 'succeed') {
              if (res.data) {
                this.getAddressFn();
              }
            } else {
              message.error(res.message || '请求异常');
            }
          }
        })
      },
      onCancel() {
        //
      },
    });
  }
  editFn = (item, k) => { // 编辑地址
    const { setFieldsValue, resetFields } = this.props.form;
    resetFields();
    setFieldsValue({
      ...item,
    })
    this.setState({
      init: {
        ...item,
        key: k,
      }
    })
  }
  default = (item, k) => { // 设为默认
    const { User, init } = this.state;
    if (!User) return;
    this.setState({
      loading: true,
    });
    reqwest({
      url: `${window.imgSrc}/web/index/my/editAddress.json`,
      method: 'post',
      data: {
        id: User.USE_ID,
        address: JSON.stringify({
          ...item,
          default: true,
        }),
        key: k
      },
      success: (res) => {
        this.setState({
          loading: false,
          init: null,
        });
        this.props.form.resetFields();
        if (res.result === 'succeed') {
          this.getAddressFn();
        } else {
          message.error(res.message || '请求异常');
        }
      }
    })
  }
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { User, data, loading, shopData, init } = this.state;
    const columns = [
      {
        title: '收货人',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所在地区',
        dataIndex: 'address',
        key: 'address',
        render: (text) => (<span>
          {text[text.length - 1]}
        </span>),
      },
      {
        title: '详细地址',
        dataIndex: 'detail',
        key: 'detail',
      },
      {
        title: '电话/手机',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '操作',
        key: 'action',
        render: (item, k, e) => (
          <span>
            <a onClick={this.editFn.bind(this, item, e)}>修改</a>
            <Divider type="vertical" />
            <a onClick={this.deleteFn.bind(this, e)}>删除</a>
          </span>
        ),
      },
      {
        title: '',
        key: 'default',
        dataIndex: 'default',
        render: (tags, k, e) => (tags ? <Tag color="#2db7f5">默认地址</Tag> : <a onClick={this.default.bind(this, k, e)}>设为默认</a>),
      },
    ];
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
    return (
      <div id="adress" className="adress">
        {
          User ? <Tabs type="card">
            <TabPane tab={init ? '修改收货地址' : '新增收货地址'} key="1">
              <Spin tip="Loading..." spinning={loading}>
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
                    {
                      init ? <Button style={{ marginLeft: '8px' }} onClick={() => { this.setState({ init: null }); resetFields() }}>
                        取消
                      </Button> : null
                    }
                  </Form.Item>
                </Form>
              </Spin>
              <Table
                loading={loading}
                pagination={false}
                columns={columns}
                dataSource={data}
                bordered
                size={'small'} />
            </TabPane>
          </Tabs> : null
        }
      </div>
    );
  }
}

export default Form.create({})(Adress);
