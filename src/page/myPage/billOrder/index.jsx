import React, { PureComponent } from 'react';
import {} from 'antd';
import './index.less';

import Index from '../index.jsx';
import ListTable from '../component/listTable/listTable.jsx';

// 待发货/试验 页面

class Order extends PureComponent {

  render() {
    return (
      <Index>
        <div id="bill-order">
          <ListTable />
        </div>
      </Index>
    );
  }
}

export default Order;
