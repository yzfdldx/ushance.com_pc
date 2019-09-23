import React, { Component } from 'react';
import { List, Skeleton, Avatar, Button, Row } from 'antd';

import './order.less';

class Order extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cardDatas: [], // 全部数据
      initLoading: false,
      loading: false,
      selectedTags: [],
      searchDatas: [], // 搜索到的数据
      searchType: false, // 搜索打标
      list: [{
        name: {
          title: 'X射线荧光光谱仪（XRF）',
          subTitle: 'PANalytical Axios； RIGAKU ZSX Priums',
        },
        loading: false,
      }, {
        name: {
          title: 'XPS',
          subTitle: '同步辐射光源',
        },
        loading: false,
      }],
    };
  }

  onLoadMore = () => {
    const { list } = this.state;
    const addData = [{
      name: {
        title: 'X射线荧光光谱仪（XRF）1',
        subTitle: 'PANalytical Axios； RIGAKU ZSX Priums1',
      },
      loading: true,
    }];
    const newList = [...list, ...addData];
    this.setState({
      list: newList,
    });
    setTimeout(() => {
      newList[newList.length - 1].loading = false;
      this.setState({
        list: newList,
      });
    }, 300);
  };

  render() {
    const { cardDatas, searchDatas, loading, searchType, initLoading, list } = this.state;
    const { params: { name } } = this.props;
    const loadMore =
      !initLoading && !loading ? (
        <div style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}>
          <Button onClick={this.onLoadMore}>更多</Button>
        </div>
      ) : null;
    return (<div id="order">
      <div className="title">{name}</div>
      <div className="center">
        <div className="center-left">
          <div className="person-info">
            <div className="avatar">
              <img src="//statics.shiyanjia.com/c/2018/images/tx_sex2.png" />
            </div>
            <span>仪器负责人</span>
            <p>
              谢老师<br />
              400-831-0631
            </p>
          </div>
          <div className="remind">
            <div className="warn">
              <img src="//statics.shiyanjia.com/c/2018/images/auto-order/warn.png" />
            </div>
            <div className="warn-content">
              <p className="remind-title">预约须知</p>
              <div>
                <p><span style={{ color: 'rgb(247, 150, 70)' }}><strong>单模式8折，两种模式低至6折！</strong></span></p><p>1，样品是否可回收请联系经理确认！</p><p>2，粉末样品需要至少1g；</p><p>3，样品在测试之前尽量干燥；</p><p>4，含碳元素含量超过10%的样品，请先将样品烧成灰，再测试；</p><p>5，非粉末样品等特殊需求，有任何问题，请联系相关负责老师谢老师进行沟通，电话18310719335。</p><p><br /></p>
              </div>
            </div>
          </div>
        </div>
        <div className="center-right">
          <Row className="header">
            <Button size="large" style={{ marginRight: 30 }}>单独购买</Button>
            <Button type="primary" size="large">发起拼单</Button>
          </Row>
          <List className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => {
              return (
              <List.Item actions={[<a key="list-loadmore-edit">去拼单</a>]}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a>{item.name.title}</a>}
                    description={item.name.subTitle}
                  />
                </Skeleton>
              </List.Item>
            )}}
          />
        </div>
      </div>
    </div>);
  }
}

export default Order;
