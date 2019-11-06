import React, { PureComponent } from 'react';
import {} from 'antd';
import './index.less';

import Index from '../index.jsx';
import ListTable from './listTable/listTable.jsx';
import TabSearch from '../tabSearch.jsx';

class Order extends PureComponent {
  state = {
    searchVal: null,
  }
  search = (e) => {
    this.setState({
      searchVal: e,
    })
  }
  render() {
    return (
      <Index>
        <TabSearch backFn={this.search} />
        <div id="order" className="order">
          <ListTable searchVal={this.state.searchVal}/>
        </div>
      </Index>
    );
  }
}

export default Order;
