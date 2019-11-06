import React, { PureComponent } from 'react';
import {  Col, Row, Modal, Button, List, Checkbox, Icon, Pagination, Spin, message } from 'antd';
import './listTable.less';
import reqwest from 'reqwest';
import moment from 'moment';
const { confirm } = Modal;
import Fun from 'yzflhez-js-function';
import { typeName, paymentName } from '../untils.js';
import BuyModal from '../../buyModal';
const { GetCookie } = Fun;
const titleList = [
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
  state = {
    selectedRowKeys: [],
    loading: false,
    datas: [],
    page: {
      total: 0,
      current: 1,
    },
    payInit: {},
  };
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.setState({
      loading: true,
    });
    const { USE_ID } = GetCookie('UseData') && JSON.parse(GetCookie('UseData')) || {};
    const url = `${window.imgSrc}/web/index/my/order/getNowOrder.json`;
    reqwest({
      url,
      method: 'get',
      data: {
        id: USE_ID,
      },
      success: (res) => {
        if (res.result === 'succeed') {
          const datas = res.data.filter(e => e.payment === 1 || e.payment === 2 ? false : true);
          this.setState({
            datas,
            page: {
              total: datas.length,
              current: 1,
            },
            loading: false,
          });
        } else {
          this.setState({
            datas: [],
            loading: false,
          });
          message.error(res.message || '请求异常');
        }
      }
    })
  }
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
  refundMoneny = (json) => { // 退款
    confirm({
      title: '确定要退款吗?',
      content: '退款后可以再次缴款',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.setState({
          loading: true,
        });
        const url = `${window.imgSrc}/zfb_sdk/web/refund.json`;
        reqwest({
          url,
          method: 'post',
          data: {
            ...json,
          },
          success: (res) => {
            if (res.result === 'succeed') {
              message.success('退款成功');
              this.setState({
                loading: false,
              }, () => {
                this.getData();
              });
            } else {
              this.setState({
                loading: false,
              });
              message.error(res.message || '请求异常');
            }
          }
        })
      },
      onCancel() {
        //
      },
    });
  }
  listHeader = (item) => {
    const times = moment(item.CREATE_DATE).format('YYYY-MM-DD HH:mm:ss');
    return (
      <div className="list-header">
        <Checkbox>{times.split(' ')[0]} 订单号: {item.id}</Checkbox>
        <Icon type="delete" style={{ fontSize: 24 }} onClick={this.deleteClick} />
      </div>
    );
  }
  renderItem = (item) => {
    // debugger
    let test_parameter = {};
    let price = 0;
    try {
      test_parameter = JSON.parse(item.test_parameter);
      Object.keys(test_parameter).forEach(e => {
        price += test_parameter[e].price;
      });
    } catch (error) {
      //
    }
    const times = moment(item.CREATE_DATE).subtract(-1, 'months').format('YYYY-MM-DD HH:mm:ss');
    const refundMonenyJson = {
      id: item.payId,
      name: item.device_name,
      describe: item.device_name,
      price: item.payPrice,
    }
    const oDate = new Date().getTime();
    const payId = `device_${item.id}_${oDate}`;
    const payJson = {
      id: payId,
      name: item.device_name,
      describe: item.device_name,
      price: parseFloat(price).toFixed(2),
      // price: 0.01,
    }
    const titleName = [
      {
        name: '宝贝',
        width: 7,
        render: () => {
          return (
            <div>
              {item.device_name}
            </div>
          )
        },
      }, {
        name: '单价',
        width: 2,
        render: () => {
          return (
            <div>
              ￥ {parseFloat(price).toFixed(2)}
            </div>
          )
        },
      }, {
        name: '数量',
        width: 2,
        render: () => {
          return (
            <div>
              {item.number}
            </div>
          )
        },
      }, {
        name: '截止时间',
        width: 2,
        render: () => {
          return (
            <div>
              {times.split(' ')[0]}
            </div>
          )
        },
      }, {
        name: '商品操作',
        width: 3,
        render: () => {
          return (
            <div>
              {
                item.payPrice && item.state === 0 ? <a onClick={this.refundMoneny.bind(this, refundMonenyJson)}>
                  申请退款
                </a> : <span>申请退款</span>
              }
            </div>
          )
        },
      }, {
        name: '实付款',
        width: 2,
        render: () => {
          return (
            <div>
              {
                item.payPrice
              }
            </div>
          )
        },
      }, {
        name: '交易状态',
        width: 3,
        render: () => {
          return (
            <div>
              {paymentName[item.payment]}
              {
                item.payPrice && item.payment === 1 || item.payment === 2 ? null : <span> | <a
                  onClick={() => {this.setState({buyVisbile: true, payInit: payJson})}
                }>去支付</a></span>
              }
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
              <a>再次购买</a>
            </div>
          );
        },
      }
    ];
    return (
      <Row className="table-row">
        {
          titleName.map((i) => (<Col span={i.width} className="table-col">{i.render()}</Col>))
        }
      </Row>
    );
  }
  onChange = (pageNumber) => {
    const { page } = this.state;
    this.setState({
      page: {
        ...page,
        current: pageNumber,
      }
    })
  }
  render() {
    const { loading, datas, page, buyVisbile, payInit } = this.state;
    let ListData = [];
    try {
      ListData = JSON.parse(JSON.stringify(datas)).splice((page.current - 1) * 10, 10);
    } catch (error) {
      // 
    }
    return (
      <div id="list-table">
        {
          buyVisbile ? <BuyModal initData={() => { this.getData() }} init={payInit} visibleFn={() => {this.setState({buyVisbile: false})}}/> : null
        }
        <Spin tip="Loading..." spinning={loading}>
          <Row className="table-title">
            {
              titleList.map((i) => (<Col span={i.width}>{i.name}</Col>))
            }
          </Row>
          {/* <Row className="table-page">
            <Button size="small">上一页</Button>
            <Button size="small" style={{ marginLeft: 10 }}>下一页</Button>
          </Row> */}
          {
            ListData.map((i) => {
              // return <div>23</div>
              return (
                <List className="table-list"
                  size="large"
                  header={this.listHeader(i)}
                  bordered
                  dataSource={[1]}
                  renderItem={item => this.renderItem(i)}
                />
              );
            })
          }
          <Row className="table-pagination">
          <Pagination showQuickJumper current={page.current} total={page.total} onChange={this.onChange} />
        </Row>
        </Spin>
      </div>
    );
  }
}

export default ListTable;
