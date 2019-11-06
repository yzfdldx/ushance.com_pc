import React, { PureComponent } from 'react';
import { Modal, Button, Card, Icon, message } from 'antd';
import './index.less';
import Fun from 'yzflhez-js-function';
const { GetCookie, SetCookie } = Fun;
import reqwest from 'reqwest';

class BuyModal extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      seleced: null,
      price: null,
      payOK: false,
      orderId: null,
      payData: null,
    };
  }
  componentDidMount() {
    const { init } = this.props;
    this.setState({
      price: init.price ? init.price : 0,
      orderId: init.id.split('_')[1],
    });
  }
  handleCancel = e => {
    this.props.visibleFn();
  };
  clickCard = (e) => {
    this.setState({
      seleced: e,
    });
  }
  payFn = () => { // 立即购买
    const { seleced, price } = this.state;
    const { init } = this.props;
    if (!seleced) message.error('请先选择支付方式');
    let User = GetCookie('UseData');
    if (User) {
      User = JSON.parse(User)
    } else {
      User = {};
    }
    if (!init && !init.ID) {
      message.error('请先去填写表格');
    }
    if (!User.USE_ID) {
      message.error('请先登录');
    } else {
      if (seleced === 1) { // 支付宝
        this.setState({
          payData: init,
        });
        this.zfbFn(init, (url) => {
          this.setState({
            payOK: true,
          });
          window.open(url);
        });
      }
    }
  }
  payOkFn = () => { // 确认支付
    const { orderId, payData, price } = this.state;
    this.zfbQueryFn(payData, (val) => {
      try {
        const Data = JSON.parse(val);
        const result = Data.alipay_trade_query_response;
        if (result.msg === 'Success') { // ok
          this.editAjaxFn({
            ID: orderId,
            payData: JSON.stringify({
              ...payData,
              data: result,
            }),
            payment: 1,
          }, () => {
            this.props.initData();
            this.props.visibleFn();
          });
        } else {
          message.error(result.sub_msg);
        }
      } catch (error) {
        message.error('您还没有支付成功');
      }
    });
  }
  zfbFn = (Json, back) => { // 支付宝支付申请
    reqwest({
      url: `${window.imgSrc}/zfb_sdk/web/pay.json`,
      method: 'get',
      data: {
        ...Json
      },
      success: (res) => {
        if (res.result === 'succeed') {
          if (res.data && back) {
            // window.open(res.data)
            back(res.data)
          }
        } else {
          message.error(res.message || '请求异常');
        }
      }
    })
  }
  zfbQueryFn = (Json, back) => { // 支付宝支付详情查询
    reqwest({
      url: `${window.imgSrc}/zfb_sdk/web/query.json`,
      method: 'get',
      data: {
        ...Json
      },
      success: (res) => {
        if (res.result === 'succeed') {
          if (res.data && back) {
            back(res.data)
          }
        } else {
          message.error(res.message || '请求异常');
        }
      }
    })
  }
  otherPayFn = () => { // 平台垫付
    const { orderId } = this.state;
    this.editAjaxFn({
      ID: orderId,
      payment: 3,
    }, () => {
      this.props.initData();
      this.props.visibleFn();
    });
  }
  editAjaxFn = (init, back) => { // 修改下单
    if (!init && !init.ID) {
      message.error('请先去填写表格');
    } else {
      reqwest({
        url: `${window.imgSrc}/web/index/my/order/editOrder.json`,
        method: 'post',
        data: {
          ...init,
        },
        success: (res) => {
          if (res.result === 'succeed') {
            message.success('支付成功');
            const { id } = this.props;
            const Json = GetCookie('shebeiOrder') ? JSON.parse(GetCookie('shebeiOrder')) : {};
            delete Json[id];
            SetCookie('shebeiOrder', Json, 1);
            if (back) {
              back();
            }
          } else {
            message.error(res.message || '请求异常');
          }
        }
      })
    }
  }
  render() {
    const { visible } = this.props;
    const { seleced, payOK, price } = this.state;
    return (
      <div>
        <Modal
          title="直接购买"
          visible={true}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName="buy-modal"
        >
          <div style={{ lineHeight: '35px', fontSize: '18px' }}>
            一共需要
            <span style={{ color: 'rgb(255, 100, 100)' }}>{price ? price : 0}</span>
            元
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Card title="请选择支付方式" >
              <Card.Grid style={{ width: '50%' }} onClick={this.clickCard.bind(this, 1)}>
                <Card title="支付宝支付" bordered={false}>
                  <div style={{ padding: '32px 0 22px 0' }}>
                    <img style={{ width: '70%' }} src="https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png" />
                  </div>
                  <div className="card-r-b">
                    {seleced === 1 ? <Icon type="check" /> : <Icon />}
                  </div>
                </Card>
              </Card.Grid>
              <Card.Grid style={{ width: '50%' }}>
                <Card title="微信支付(暂不支持)" bordered={false} onClick2={this.clickCard.bind(this, 2)}>
                  <div style={{ padding: '15px 0 3px 0' }}>
                    <img style={{ width: '70%' }} src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1447498112,600524530&fm=85&app=79&f=JPG?w=121&h=75&s=188FA15AB1206D1108400056000040F6" />
                  </div>
                  <div className="card-r-b">
                    {seleced === 2 ? <Icon type="check" /> : <Icon />}
                  </div>
                </Card>
              </Card.Grid>
            </Card>
          </div>
          <Button type="primary" size="large" onClick={payOK ? this.payOkFn : this.payFn}>{payOK ? '确认已支付请点击' : '立即购买'}</Button>
          <Button size="large" style={{ marginLeft: 20 }} onClick={this.otherPayFn}>平台垫付</Button>
        </Modal>
      </div>
    );
  }
}

export default BuyModal;