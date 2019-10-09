import React, { PureComponent } from 'react';
import { Input, Icon } from 'antd';
import './index.less';

const { Search } = Input;

class TabSearch extends PureComponent {
  render() {
    return (
      <div className="tab-search">
        <Search
          style={{ width: 322 }}
          placeholder="输入商品标题或订单号进行搜索"
          enterButton="订单搜索"
          onSearch={value => console.log(value)}
        />
        <span style={{ marginLeft: 20 }}>更多筛选条件<Icon type="down" /></span>
      </div>
    );
  }
}

export default TabSearch;