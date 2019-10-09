import React, { PureComponent } from 'react';
import { Row, Col, Alert, InputNumber, Button, Icon, Tabs, Comment, Tooltip, List, Avatar, Form, Input, Table } from 'antd';

import './index.less';
import moment from 'moment';
import Carousel from '../component/carousel.jsx';

const { TabPane } = Tabs;
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        添加评论
      </Button>
    </Form.Item>
  </div>
);

class CardDetail extends PureComponent {
  state = {
    comments: [],
    submitting: false,
    value: '',
    data: [
      {
        actions: [<span key="comment-list-reply-to-0">回复</span>],
        author: '赵大爷',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            商品中的战斗机！！！！！！哦也！！！！
          </p>
        ),
        datetime: (
          <Tooltip
            title={moment()
              .subtract(1, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
            <span>
              {moment()
                .subtract(1, 'days')
                .fromNow()}
            </span>
          </Tooltip>
        ),
      },
      {
        actions: [<span key="comment-list-reply-to-0">回复</span>],
        author: '王大哥',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            商品还可以，衣服是很好，面料也穿着舒服，因为一次买了两件，所以对他期望特别高，还有这个领子对领特别舒服.面料不错，上身效果也可以，薄厚刚好，其他的颜色也没有什么色差，领子是属于半高领，穿着特别舒服，不像高领堆到脖子那个地方让人不舒服，还有面料特别柔软，也不掉色，非常好的一次购物
          </p>
        ),
        datetime: (
          <Tooltip
            title={moment()
              .subtract(2, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
            <span>
              {moment()
                .subtract(2, 'days')
                .fromNow()}
            </span>
          </Tooltip>
        ),
      },
    ],
  };
  formChange = () => {
    //
  }
  renderHeaderRight = () => {
    return (
      <div>
        {/* 商品名称 */}
        <h1>VOC</h1>
        {/* 商品介绍 */}
        <h3>VOC环境释放仓</h3>
        {/* 商品价格 */}
        <Alert message={
          <Row>
            {/* <Col span="2">价格：</Col> */}
            <Col span="21">价格：￥30000</Col>
          </Row>
        } type="info" />
        <br />
        {/* 信息 */}
        <ul className="shop-panel">
          <li className="shop-item">
            <div><span className="shop-label">国药：80087117</span></div>
          </li>
          <li className="shop-item">
            <div><span className="shop-label">原厂：80087117</span></div>
          </li>
			  </ul>
        <ul className="shop-panel">
          <li className="shop-item">
            <div><span className="shop-label">品牌：沪试</span></div>
          </li>
          <li className="shop-item">
            <div><span className="shop-label">规格：AR</span></div>
          </li>
			  </ul>
        <ul className="shop-panel">
          <li className="shop-item">
            <div><span className="shop-label">包装：20g</span></div>
          </li>
          <li className="shop-item">
            <div><span className="shop-label">库存：10</span></div>
          </li>
			  </ul>
        <ul className="shop-panel">
          <li className="shop-item">
            <div><span className="shop-label">包装瓶：玻璃瓶</span></div>
          </li>
          <li className="shop-item">
            <div><span className="shop-label">装箱数：25瓶/箱</span></div>
          </li>
			  </ul>
        {/* 销量评价等信息 */}
        <ul className="shop-panel">
          <li className="shop-item">
            <div><span className="shop-label">月销量: </span><span className="shop-count">5</span></div>
          </li>
          <li className="shop-item">
            <div><span className="shop-label">累计评价: </span><span className="shop-count">2</span></div>
          </li>
			  </ul>
        {/* 运费 */}
        <Row className="box" style={{ marginTop: '15px' }}>
          <Col span="2"><span>运费</span></Col>
          <Col span="21">
            浙江嘉兴至 杭州 快递: 0.00
          </Col>
        </Row>
        <br />
        {/* 商品数量 */}
        <Row className="box">
          <Col span="2"><span>数量</span></Col>
          <Col span="21">
            <InputNumber min={1} max={99999} defaultValue={1} onChange={this.formChange} />
            <span style={{ margin: '0 20px 0 10px' }}>件</span>
            <span>库存{'xx'}件</span>
          </Col>
        </Row>
        <Row className="box box-footer">
          <Col offset="2">
            <Button type="primary" size="large" onClick={() => {location.hash = '#/ShopPage/buy'}}>直接购买</Button>
            <Button size="large" style={{ marginLeft: 20 }}><Icon type="shopping-cart" />加入购物车</Button>
          </Col>
        </Row>
      </div>
    );
  }
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  }
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
    });
    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        data: [
          {
            author: '王大哥',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.data,
        ],
      });
    }, 1000);
  }
  renderEvaluate = () => {
    const { comments, submitting, value, data } = this.state;
    return (
      <div>
        {/* 评价展示部分 */}
        <List
          className="comment-list"
          header={`${data.length}个评论`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              >
                <Comment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </Comment>
            </li>
          )}
        />
        {/* 评价 */}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="王大爷"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
  render() {
    const dataSource = [
      {
        key: '1',
        name: '中文别名',
        other: '环境释放仓',
      },
      {
        key: '2',
        name: '英文名字',
        other: 'voc',
      },
    ];
    const columns = [
      {
        title: 'title',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: '其它',
        dataIndex: 'other',
        key: 'other',
      }
    ];
    return (
      <div id="card-detail">
        <div className="header">
          <div className="header-left">
            <Carousel />
          </div>
          <div className="header-right">
            {this.renderHeaderRight()}
          </div>
        </div>
        <div className="center">
          <Tabs type="card">
            <TabPane tab="商品属性" key="1">
              <Table bordered showHeader={false} pagination={false} dataSource={dataSource} columns={columns} />
            </TabPane>
            {/* <TabPane tab="基本信息" key="2">
              基本信息
            </TabPane>
            <TabPane tab="质检信息" key="3">
              质检信息
            </TabPane> */}
            <TabPane tab="累计评价" key="4">
              {this.renderEvaluate()}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default CardDetail;
