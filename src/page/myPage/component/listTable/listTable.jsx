import React, { PureComponent } from 'react';
import {  Col, Row, Modal, Button, List, Checkbox, Icon, Pagination } from 'antd';
import './listTable.less';

const { confirm } = Modal;

const titleName = [
  {
    name: '宝贝',
    width: 7,
    render: () => {
      return (
        <div>
          VOC环境释放仓
        </div>
      )
    },
  }, {
    name: '单价',
    width: 2,
    render: () => {
      return (
        <div>
          ￥39.50
        </div>
      )
    },
  }, {
    name: '数量',
    width: 2,
    render: () => {
      return (
        <div>
          1
        </div>
      )
    },
  }, {
    name: '截止时间',
    width: 2,
    render: () => {
      return (
        <div>
          2019-09-14
        </div>
      )
    },
  }, {
    name: '商品操作',
    width: 3,
    render: () => {
      return (
        <div>
          申请售后
        </div>
      )
    },
  }, {
    name: '实付款',
    width: 2,
    render: () => {
      return (
        <div>
          ￥12.22
        </div>
      )
    },
  }, {
    name: '交易状态',
    width: 3,
    render: () => {
      return (
        <div>
          交易成功
        </div>
      )
    },
  }, {
    name: '交易操作',
    width: 3,
    render: () => {
      return (
        <div>
          <Button type="primary">评价</Button>
          <br />
          <span>再次购买</span>
        </div>
        
      );
    },
  }
];

class ListTable extends PureComponent {
  deleteClick = () => {
    confirm({
      title: '确定要删除这个订单?',
      content: '删除后不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  listHeader = () => {
    return (
      <div className="list-header">
        <Checkbox>2019-09-14订单号: 558631279620954909</Checkbox>
        <Icon type="delete" style={{ fontSize: 24 }} onClick={this.deleteClick} />
      </div>
    );
  }

  renderItem = () => {
    return (
      <Row className="table-row">
        {
          titleName.map((i) => (<Col span={i.width} className="table-col">{i.render()}</Col>))
        }
      </Row>
    );
  }

  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  }

  render() {
    return (
      <div id="list-table">
        <Row className="table-title">
          {
            titleName.map((i) => (<Col span={i.width}>{i.name}</Col>))
          }
        </Row>
        <Row className="table-page">
          <Button size="small">上一页</Button>
          <Button size="small" style={{ marginLeft: 10 }}>下一页</Button>
        </Row>
        {
          [1, 2, 3].map((i) => {
            return (
              <List className="table-list"
                size="large"
                header={this.listHeader()}
                bordered
                dataSource={[1]}
                renderItem={item => this.renderItem(item)}
              />
            );
          })
        }
        <Row className="table-pagination">
          <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />
        </Row>
      </div>
    );
  }
}

export default ListTable;
