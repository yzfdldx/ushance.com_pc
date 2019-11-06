import React from 'react';
import { Modal, Input, Form, message, Button } from 'antd';
import reqwest from 'reqwest';

import { setCookie } from '../common/util.js';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      phoneVisible: true,
      checkOnoff: false,
      time: 120,
    };
  }
  handleOk = () => {
    const { backFn, visibleFn } = this.props;
    const { phoneVisible } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (phoneVisible) { // 电话
          reqwest({
            url: `${window.imgSrc}/web/index/my/phoneLoad.json`,
            method: 'post',
            data: {
              ...values
            },
            success: function (val) {
              if (val.result === 'succeed') {
                message.success('登录成功');
                if (val.data && val.data[0]) {
                  setCookie('UseData', {...val.data[0]}, 1);
                  backFn(val.data[0]);
                  visibleFn();
                  setTimeout(() => {
                    location.reload();
                  }, 1000);
                }
              } else {
                message.error(`登录失败:${val.message}`);
              }
            }
          })
        } else {
          reqwest({
            url: `${window.imgSrc}/web/index/my/load.json`,
            method: 'post',
            data: {
              ...values
            },
            success: function (val) {
              if (val.result === 'succeed') {
                message.success('登录成功');
                if (val.data && val.data[0]) {
                  setCookie('UseData', {...val.data[0]}, 1);
                  backFn(val.data[0]);
                  visibleFn();
                  setTimeout(() => {
                    location.reload();
                  }, 1000);
                }
              } else {
                message.error(`登录失败:${val.message}`);
              }
            }
          })
        }
      }
    });
  }
  handleCancel = () => {
    this.props.form.resetFields();
    this.props.visibleFn();
  }
  time = () => {
    const { checkOnoff, time } = this.state;
    if (checkOnoff && time > 0) {
      setTimeout(() => {
        this.setState({
          time: time - 1,
        }, () => {
          this.time();
        });
      }, 1000)
    } else if (checkOnoff && time <= 0) {
      this.setState({
        checkOnoff: false,
        time: 120,
      });
    }
  }
  checkFn = () => {
    const { getFieldValue } = this.props.form;
    const phone = getFieldValue('phone');
    if (!phone) return message.error('请先输入电话');
    const values = {
      phone,
      id: `${phone}`,
    }
    reqwest({
      url: `${window.imgSrc}/web/index/my/message.json`,
      method: 'post',
      data: {
        ...values
      },
      success: (val) => {
        if (val.result === 'succeed') {
          message.success('短信发送成功');
          this.setState({
            checkOnoff: true,
          })
          this.time();
        } else {
          message.error(`短信发送失败:${val.message}`);
        }
      }
    })
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const { phoneVisible, checkOnoff, time } = this.state;
    const { children, params } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const phone = getFieldValue('phone');
    return (<Modal
      title="请登录"
      visible={true}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="登录"
      cancelText="取消"
    >
      <Form layout2="inline" {...formItemLayout}>
        {
          phoneVisible ? <div>
            <Form.Item label="电话" sty={{ marginBottom: '0' }}>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入电话号码' }],
              })(<Input size2="small" placeholder="电话" style={{width: '100%', marginLeft: '8px'}} />)}
            </Form.Item>
            <div style={{ paddingLeft: '80px', position: 'relative' }}>
            <Form.Item>
              {getFieldDecorator('check', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(<Input size2="small" placeholder="验证码" style={{width: '255px', marginLeft: '8px'}} />)}
            </Form.Item>
            <div style={{ position: 'absolute', left: '366px', top: '4px', height: '30px' }}>
              <Button
                disabled={phone ? checkOnoff : true}
                onClick={this.checkFn}
              >
                验证码
                {checkOnoff ? `(${time}s)` : null}
              </Button>
              </div>
            </div>
          </div> : <div>
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
          </div>
        }
      </Form>
      <div style={{ textAlign: 'right', paddingRight: '20px' }}>
        切换到 / <span style={{ color: 'rgb(0,122,192)', cursor: 'pointer' }} onClick={() => { this.setState({phoneVisible: !phoneVisible}) }}>{!phoneVisible ? '快速登录' : '密码登录'}</span>
      </div>
    </Modal>);
  }
}

const AppForm = Form.create()(App);
export default AppForm;
