import React, { PureComponent } from 'react';
import { Table, Divider, Tag } from 'antd';
import './index.less';

const columns = [
  {
    title: '设备名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '电话/手机',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <span>
        <a>修改</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '边先生',
    age: '浙江省 杭州市 西湖区 蒋村街道',
    address: '蒋村花园广安苑17号楼二单元401',
    address1: '10086',
    address2: '86-18*******36',
    tags: true,
  },
  {
    key: '2',
    name: '边先生',
    age: '浙江省 杭州市 西湖区 蒋村街道',
    address: '蒋村花园广安苑17号楼二单元401',
    address1: '10086',
    address2: '86-18*******36',
  },
  {
    key: '3',
    name: '边先生',
    age: '浙江省 杭州市 西湖区 蒋村街道',
    address: '蒋村花园广安苑17号楼二单元401',
    address1: '10086',
    address2: '86-18*******36',
  },
];

class OldDeviceTable extends PureComponent {

  render() {
    return (
      <div>
        <Table pagination={false}
          columns={columns}
          dataSource={data}
          bordered
          size={'small'} />
      </div>
    );
  }
}

export default OldDeviceTable;
