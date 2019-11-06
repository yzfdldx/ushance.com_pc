import React, { PureComponent } from 'react';
import { Table, Divider, Tag, Button } from 'antd';
// import zhCN from 'antd/es/locale/zh_CN';
import reqwest from 'reqwest';
import moment from 'moment';

import './index.less';
import { getCookie } from '../../../common/util.js';
import { typeName, paymentName } from './untils.js';

const columns = [
  {
    title: '下单人/地址',
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
    title: '设备拥有人/地址',
    dataIndex: 'GIVE_NAME',
    key: 'GIVE_NAME',
    width: 100,
    render: (item, record) => {
      return (
        <div>
          {item}<br />
          {record.GIVE_ADDRESS}
        </div>
      );
    },
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
    width: 100,
    render: (item) => <div>
      <span>{paymentName[item]}</span>
      <span></span>
    </div>,
  },
  {
    title: '备注',
    dataIndex: 'message',
    key: 'message',
    width: 50,
    render: (item) => (item || '--'),
  },
  {
    title: '操作',
    key: 'order',
    width: 50,
    render: () => <div>
      <span>取消订单</span>
    </div>,
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
    const { finished } = this.props;
    const { USE_ID } = getCookie('App') && JSON.parse(getCookie('App')) || {};
    const url = finished ? `${window.imgSrc}/web/index/my/order/getFinishOrder.json` : `${window.imgSrc}/web/index/my/order/getNowOrder.json`;
    reqwest({
      url,
      method: 'get',
      data: {
        id: USE_ID,
      },
      success: (res) => {
        debugger
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
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
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
          rowKey={record => record.id}
          size={'small'} />
        {finished ? null : this.checkRender()}
      </div>
    );
  }
}

export default OrderTable;
