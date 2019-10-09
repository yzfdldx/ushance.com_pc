import React, { PureComponent } from 'react';
import { Card, Icon, Button, Tag } from 'antd';

import './index.less';
import reqwest from 'reqwest';
import BuyModal from './buyModal.jsx';
import PdBuyModal from './pdBuyModal.jsx';

class Buy extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      data: [1, 2, 3, 4, 5],
      selectKey: -1,
      buyVisible: false,
      pdBuyVisible: false,
    };
  }
  componentDidMount () {
    this.getData();
  }
  getData = () => {
    const { params: { name } } = this.props;
    reqwest({
      url: `${window.imgSrc}/web/index/my/address.json`, // https://www.ushance.com
      method: 'get',
      data: {},
      success: (res) => {
        if (res.result === 'succeed') {
          const addressData = res.data;
          
        } else {
          message.error(res.message || '请求异常');
        }
      }
    })
  }
  cardClick = (selectKey) => {
    this.setState({
      selectKey,
    })
  }
  adressCardRender = (k) => {
    const { selectKey } = this.state;
    return (
      <div onClick={() => this.cardClick(k)} className="card-box">
        <Card title="浙江杭州（王大哥收）" bordered={false}>
          <p>西湖蒋村蒋村花园广安苑17号楼二单元401,18317715136</p>
          <a href="#/MyPage/Adress">修改</a>
          {k === 0 ? <Tag color="#2db7f5" className="card-r-t">默认地址</Tag> : null}
          {selectKey === k ? <div className="card-r-b"><Icon type="check" /></div> : null}
        </Card>
      </div>
    );
  }
  buyModalClick = (buyVisible) => {
    this.setState({
      buyVisible,
    });
  };
  pdBuyModalClick = (pdBuyVisible) => {
    this.setState({
      pdBuyVisible,
    });
  }
  render() {
    const { loading, data, buyVisible, pdBuyVisible } = this.state;
    const gridStyle = {
      width: '25%',
    };
    const buyModalProps = {
      visible: buyVisible,
      onCancel: () => this.buyModalClick(false),
    };
    const pdBuyModalProps = {
      visible: pdBuyVisible,
      onCancel: () => this.pdBuyModalClick(false),
    };
    return (<div id="buy">
      <BuyModal {...buyModalProps} />
      <PdBuyModal {...pdBuyModalProps} />
      <br/>
      <Card title="请选择地址" extra={<a href="#/MyPage/Adress">管理我的地址</a>}>
        {
          data.map((i, k) => (
            <Card.Grid style={gridStyle}>
              {this.adressCardRender(k)}
            </Card.Grid>
          ))
        }
      </Card>
      <br/>
      <Card title="请选择付款方式" bodyStyle={{ textAlign: 'center' }}>
        <Button type="primary" size="large" onClick={() => this.buyModalClick(true)}>直接购买</Button>
        <Button size="large" style={{ marginLeft: 20 }} onClick={() => this.pdBuyModalClick(true)}>拼单</Button>
      </Card>
    </div>);
  }
}

export default Buy;
