import React, { PureComponent } from 'react';
import { Table, Divider, Tag } from 'antd';
import './index.less';

const columns = [
  {
    title: '收货人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '所在地区',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '邮编',
    dataIndex: 'address1',
    key: 'address1',
  },
  {
    title: '电话/手机',
    dataIndex: 'address2',
    key: 'address2',
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
  {
    title: '',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (tags ? <Tag color="#2db7f5">默认地址</Tag> : <a>设为默认</a>),
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

class OldAdressTable extends PureComponent {

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

export default OldAdressTable;
