import React, { PureComponent } from 'react';
import {  Breadcrumb, Alert, Tabs } from 'antd';
import './index.less';

import Index from '../index.jsx';
import ListTable from '../component/listTable/listTable.jsx';

const { TabPane } = Tabs;

class Order extends PureComponent {

  render() {
    return (
      <Index>
        <div id="receipt">
          <ListTable />
        </div>
      </Index>
    );
  }
}

export default Order;
