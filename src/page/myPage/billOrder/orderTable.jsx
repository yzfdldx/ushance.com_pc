import React, { PureComponent } from 'react';
import { Table, Divider, Tag, Button } from 'antd';
// import zhCN from 'antd/es/locale/zh_CN';
import './index.less';
import reqwest from 'reqwest';
import moment from 'moment';

import { getCookie } from '../../../common/util.js';
import { typeName, paymentName } from './untils.js';

const columns = [
  {
    title: '接单人/地址',
    dataIndex: 'USE_NAME',
    key: 'USE_NAME',
    width: 100,
    render: (item, record) => {
      return (
        <div>
          {item}<br />
          {record.USE_ADDRESS}
        </div>
      );
    },
  },
  {
    title: '设备/商品名称',
    dataIndex: 'device_name',
    key: 'device_name',
    width: 100,
  },
  {
    title: '订单类型',
    dataIndex: 'type',
    key: 'type',
    width: 50,
    render: (item) => (typeName[item]),
  },
  {
    title: '创建时间',
    dataIndex: 'CREATE_DATE',
    key: 'CREATE_DATE',
    width: 50,
    render: (item) => {
      const times = moment(item).format('YYYY-MM-DD HH:mm:ss');
      return (
        <div>{times.split(' ')[0]}<br />{times.split(' ')[1]}</div>
      );
    },
  },
  {
    title: '支付状态',
    dataIndex: 'payment',
    key: 'payment',
    width: 50,
    render: (item) => (paymentName[item]),
  },
  {
    title: '备注',
    dataIndex: 'message',
    key: 'message',
    width: 50,
  },

];

class OrderTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    loading: false,
    datas: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true,
    })
    const { USE_ID } = getCookie('App') && JSON.parse(getCookie('App')) || {};
    const url = 'http://149.129.177.101/web/index/my/order/getPublishOrder.json';
    reqwest({
      url,
      method: 'get',
      data: {
        id: USE_ID,
      },
      success: (res) => {
        if (res.result === 'succeed') {
          const datas = res.data;
          this.setState({
            datas,
            loading: false,
          });
        } else {
          this.setState({
            datas: [],
            loading: false,
          });
          message.error(val.message || '请求异常');
        }
      }
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  }

  start = () => {

  }

  checkRender = () => {
    const { loading, selectedRowKeys } = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
          去支付
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 个订单` : ''}
        </span>
      </div>
    );
  }

  render() {
    const { selectedRowKeys, datas, loading } = this.state;
    const { finished } = this.props;
    const pagination = {
      size: "small",
      total: datas.length,
      showTotal: (total) => {
        return `共${total}条订单`;
      },
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Table pagination={pagination}
          loading={loading}
          columns={columns}
          rowSelection={finished ? null : rowSelection}
          dataSource={datas}
          bordered
          size={'small'} />
        {finished ? null : this.checkRender()}
      </div>
    );
  }
}

export default OrderTable;
