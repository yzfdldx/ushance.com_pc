import React, { PureComponent } from 'react';
import { Tabs, Menu, Icon } from 'antd';
import './index.less';

import MyHeader from './header.jsx';
import TabSearch from './tabSearch.jsx';

const { TabPane } = Tabs;

class Index extends PureComponent {
  defaultSelectedKeys = () => {
    const hash = window.location.hash;
    const name = hash.split('/')[hash.split('/').length - 1].split('?')[0];
    if (name === 'Order') {
      return 'order';
    } else if (name === 'BillOrder') {
      return 'billOrder'
    } else if (name === 'Receipt') {
      return 'receipt';
    } else if (name === 'NoPayOrder') {
      return 'noPayOrder';
    }
  }
  tabsChange = (key) => {
    if (key === 'receipt') {
      location.hash = '#/MyPage/Receipt';
    } else if (key === 'noPayOrder') {
      location.hash = '#/MyPage/NoPayOrder';
    } else if (key === 'order') {
      location.hash = '#/MyPage/Order';
    } else if (key === 'billOrder') {
      location.hash = '#/MyPage/BillOrder';
    }
  }
  renderTab = () => {
    return (
      <Tabs defaultActiveKey={this.defaultSelectedKeys()} onChange={this.tabsChange}>
        <TabPane disabled tab="所有接单" key="receipt" />
        <TabPane tab="所有订单" key="order" />
        <TabPane tab="待付款" key="noPayOrder" />
        {/* <TabPane tab="待分享" key="4" /> */}
        <TabPane disabled tab="待发货/试验" key="billOrder" />
        <TabPane disabled tab="待验收" key="6" />
        <TabPane disabled tab="待评价" key="7" />
      </Tabs>
    );
  }
  render() {
    const { children } = this.props;
    return (
      <div id="my-page" className="my-page">
        <MyHeader />
        <div className="my-tab">
          {this.renderTab()}
        </div>
        {/* {(this.defaultSelectedKeys() === 'order' || this.defaultSelectedKeys() === 'receipt') ? <TabSearch /> : null} */}
        <div className="main">
          <div className="right">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
