import React, { PureComponent } from 'react';
import { Card, Button, message } from 'antd';

import './index.less';
import reqwest from 'reqwest';
import BuyModal from './buyModal.jsx';
import PdBuyModal from './pdBuyModal.jsx';
import Fun from 'yzflhez-js-function';
const { GetCookie, SetCookie } = Fun;

class Buy extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      data: [1, 2, 3, 4, 5],
      selectKey: -1,
      buyVisible: false,
      pdBuyVisible: false,
      shebeiOrderJson: {},
      thisShebei: {},
      id: null,
      User: {},
    };
  }
  componentDidMount () {
    let User = GetCookie('UseData')
    if (User) {
      User = JSON.parse(User)
    } else {
      User = {};
    }
    this.setState({
      User,
    });
    if (!User.USE_ID) {
      message.error('请先登录');
    }
    const { params: { id } } = this.props;
    const shebeiOrder = window.shebeiOrder
    // const shebeiOrder = GetCookie('shebeiOrder');
    const Json = shebeiOrder ? shebeiOrder : {};
    if (shebeiOrder.device_id) {
      window.location.href = '#/TabPage/1'
    }
    this.setState({
      shebeiOrderJson: Json,
      thisShebei: Json[id] ? Json[id] : {},
      id: id,
    });
  }
  buyModalClick = (buyVisible) => { // 购买
    this.setState({
      buyVisible,
    });
  };
  pdBuyModalClick = (pdBuyVisible) => { // 拼单
    this.setState({
      pdBuyVisible,
    });
  }
  render() {
    const {
      loading, data, buyVisible, pdBuyVisible,
      thisShebei, id, User
    } = this.state;
    const gridStyle = {
      width: '25%',
    };
    const buyModalProps = {
      visible: buyVisible,
      onCancel: () => this.buyModalClick(false),
      init: thisShebei,
      id: id,
    };
    const pdBuyModalProps = {
      visible: pdBuyVisible,
      init: thisShebei,
      onCancel: () => this.pdBuyModalClick(false),
    };
    return (<div id="buy">
      {
        buyVisible ? <BuyModal {...buyModalProps} init={thisShebei}/> : null
      }
      <PdBuyModal {...pdBuyModalProps} />
      <br/>
      <div>
        确认直接购买或者拼单
      </div>
      <br/>
      <Card title="请选择付款方式" bodyStyle={{ textAlign: 'center' }}>
        <Button disabled={User && User.USE_ID ? false : true} type="primary" size="large" onClick={() => this.buyModalClick(true)}>直接购买</Button>
        <Button size="large" style={{ marginLeft: 20 }} onClick2={() => this.pdBuyModalClick(true)}>拼单(暂不支持)</Button>
      </Card>
    </div>);
  }
}

export default Buy;
