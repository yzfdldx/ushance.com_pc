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
    name: '商品操作',
    width: 2,
    render: () => {
      return (
        <div>
          申请售后
        </div>
      )
    },
  }, {
    name: '商品状态',
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
    AllData: [],
    page: {
      total: 0,
      current: 1,
    },
    payInit: {},
    USE: {},
    searchVal: null,
  };
  componentDidMount() {
    this.getData();
  }
  componentWillReceiveProps(next) {
    const { searchVal, AllData } = this.state;
    if (JSON.stringify(searchVal) !== JSON.stringify(next.searchVal)) {
      this.setState({
        searchVal,
      })
      if (!next.searchVal) {
        this.setState({
          datas: AllData,
          page: {
            total: AllData.length,
            current: 1,
          },
        });
      } else {
        const Arr = AllData.filter(e => `${e.id}`.includes(next.searchVal) || `${e.id}`.includes(next.device_name));
        this.setState({
          datas: Arr,
          page: {
            total: Arr.length,
            current: 1,
          },
        });
      }
    }
    console.log(next)
  }
  getData = () => {
    this.setState({
      loading: true,
    });
    const USE = GetCookie('UseData') && JSON.parse(GetCookie('UseData')) || {};
    this.setState({
      USE,
    })
    const url = `${window.imgSrc}/web/index/my/order/getOrder.json`;
    reqwest({
      url,
      method: 'get',
      data: {
        id: USE.USE_ID,
      },
      success: (res) => {
        if (res.result === 'succeed') {
          const datas = res.data;
          this.setState({
            AllData: datas,
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
  deleteClick = (id) => {
    const { USE } = this.state;
    confirm({
      title: '确定要删除这个订单?',
      content: '删除后不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        let url = `${window.imgSrc}/web/index/my/order/editOrder.json`;
        if (`${USE.USE_ID}` === '1') {
          reqwest({
            url,
            method: 'post',
            data: {
              ID: id,
              hidden: 1,
            },
            success: (res) => {
              if (res.result === 'succeed') {
                message.success('订单删除成功');
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
        } else {
          reqwest({
            url,
            method: 'post',
            data: {
              ID: id,
              state: 8,
            },
            success: (res) => {
              if (res.result === 'succeed') {
                message.success('订单删除申请中，请等待');
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
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  refundMoneny = (json) => { // 退款
    const { USE } = this.state;
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
        let url = `${window.imgSrc}/web/index/my/order/editOrder.json`;
        if (`${USE.USE_ID}` === '1') {
          url = `${window.imgSrc}/zfb_sdk/web/refund.json`;
          reqwest({
            url,
            method: 'post',
            data: {
              ...json,
              USE_ID: USE.USE_ID,
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
        } else {
          reqwest({
            url,
            method: 'post',
            data: {
              ID: json.ID,
              state: 6,
            },
            success: (res) => {
              if (res.result === 'succeed') {
                message.success('退款申请中，请等待');
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
        }
      },
      onCancel() {
        //
      },
    });
  }
  listHeader = (item) => { // 头部
    const times = moment(item.CREATE_DATE).format('YYYY-MM-DD HH:mm:ss');
    const { USE } = this.state;
    return (
      <div className="list-header">
        <span>{times} 订单号: {item.id}{USE && `${USE.USE_ID}` === '1' ? ` 设备提供:(${item.GIVE_ID}_${item.GIVE_NAME})_下单:(${item.USE_ID}_${item.USE_NAME})` : null}</span>
        <Icon type="delete" style={{ fontSize: 24 }} onClick={this.deleteClick.bind(this, item.id)} />
      </div>
    );
  }
  shopType = (e) => {
    if (!e) return '';
    if (e === '0') {
      return '订单审核中';
    } else if (e === '1') {
      return '订单已完成';
    } else if (e === '2') {
      return '订单审核通过，等待寄送样品';
    } else if (e === '3') {
      return '寄送样品中';
    } else if (e === '4') {
      return '仪器测试中';
    } else if (e === '5') {
      return '测试结果寄送中';
    } else if (e === '6') {
      return '退款申请审核中';
    } else if (e === '7') {
      return '退款成功';
    } else if (e === '8') {
      return '删除订单审核中';
    }
  }
  renderItem = (item) => { // 内容
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
      ID: item.id, // 订单id
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
        name: '商品操作',
        width: 2,
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
        name: '商品状态',
        width: 3,
        render: () => {
          return (
            <div>
              {this.shopType(`${item.state}`)}
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
    const { loading, datas, page, buyVisbile, payInit, USE } = this.state;
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
          {
            ListData.map((i) => {
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
