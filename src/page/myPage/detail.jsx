import React, { PureComponent } from 'react';
import {} from 'antd';
import './index.less';

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
    return (<div>
      323
    </div>);
  }
}

export default Order;
