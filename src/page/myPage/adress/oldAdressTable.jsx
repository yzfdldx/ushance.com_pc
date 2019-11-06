import React, { PureComponent } from 'react';
import { Table, Divider, Tag, message } from 'antd';
import './index.less';
import reqwest from 'reqwest';

class OldAdressTable extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      loading: false,
    };
  }
  componentDidMount() {
    const { User } = this.props;
    if (!User) return;
    this.setState({
      loading: true,
    });
    reqwest({
      url: `${window.imgSrc}/web/index/my/getAddress.json`, // https://www.ushance.com
      method: 'get',
      data: {
        id: User.USE_ID,
      },
      success: (res) => {
        this.setState({
          loading: false,
        });
        if (res.result === 'succeed') {
          if (res.data) {
            this.setState({
              data: res.data,
            });
          }
        } else {
          message.error(res.message || '请求异常');
        }
      }
    })
  }
  render() {
    const { data, loading } = this.state;
    const columns = [
      {
        title: '收货人',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所在地区',
        dataIndex: 'address',
        key: 'address',
        render: (text) => (<span>
          {text[text.length - 1]}
        </span>),
      },
      {
        title: '详细地址',
        dataIndex: 'detail',
        key: 'detail',
      },
      {
        title: '电话/手机',
        dataIndex: 'phone',
        key: 'phone',
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
        key: 'default',
        dataIndex: 'default',
        render: (tags) => (tags ? <Tag color="#2db7f5">默认地址</Tag> : <a>设为默认</a>),
      },
    ];
    return (
      <div>
        <Table
          loading={loading}
          pagination={false}
          columns={columns}
          dataSource={data}
          bordered
          size={'small'} />
      </div>
    );
  }
}

export default OldAdressTable;
