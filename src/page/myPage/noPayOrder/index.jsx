import React, { PureComponent } from 'react';
import {} from 'antd';
import './index.less';

import Index from '../index.jsx';
// import ListTable from '../component/listTable/listTable.jsx';
import ListTable from './listTable/listTable.jsx';

class Order extends PureComponent {

  render() {
    return (
      <Index>
        <div id="order" className="order">
          <ListTable />
        </div>
      </Index>
    );
  }
}

export default Order;
