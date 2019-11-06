import React, { Component } from 'react';
import Card from './card';
import { Row, Col, Spin, Tag, Icon } from 'antd';
import { data, tagsFromList } from './serverData.js';

import './tabPage.less';

const { CheckableTag } = Tag;

class TabPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cardDatas: [], // 全部数据
      loading: true,
      selectedTags: [],
      searchDatas: [], // 搜索到的数据
      searchType: false, // 搜索打标,
      tagsFromServer: [],
      Id: '',
    };
  }
  componentDidMount () {
    const { params: { key } } = this.props;
    this.setState({
      Id: key,
      loading: false,
    });
    try {
      this.setState({
        cardDatas: data[key] ? data[key] : [],
        tagsFromServer: tagsFromList[key] ? tagsFromList[key] : [],
      });
    } catch (error) {
      //
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.key !== this.props.params.key) {
      this.setState({
        loading: true,
      });
      let { key } = nextProps.params;
      setTimeout(() => {
        this.setState({
          selectedTags: [],
          cardDatas: data,
          loading: false,
        });
      }, 300);
    }
  }
  handleChange = (tag, checked) => {
    const { selectedTags, cardDatas, Id } = this.state;
    const oldCardData = data[Id];
    const nextSelectedTags = checked ? [tag] : selectedTags.filter(t => t !== tag);
    this.setState({
      loading: true,
      selectedTags: nextSelectedTags,
    });
    if (nextSelectedTags[0] === '全部') {
      setTimeout(() => {
        this.setState({
          searchType: false,
          searchDatas: [],
          cardDatas: oldCardData,
          loading: false,
        });
      }, 300);
    } else {
      setTimeout(() => {
        this.setState({
          searchType: true,
          searchDatas: oldCardData.filter((i) => (i.type.includes(nextSelectedTags[0]))),
          loading: false,
        });
      }, 300);
    }
  }
  // 分类导航
  checkableTagHtml = () => {
    const { selectedTags } = this.state;
    return (
      <div style={{ marginBottom: 20, marginTop: '32px' }}>
        {this.state.tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
        <br/>
        {['全部', '材料检测', '生物检测', '医学检测', '环境检测'].map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
  // 搜索列表
  searchDatasHtml = (searchDatas) => (
    <div style={{ marginBottom: 30 }}>
      <Row style={{ marginLeft: 10 }}>搜索结果：</Row>
      <Row>
        {searchDatas && searchDatas.length > 0 ?
          searchDatas.map((item, index) => (<Col key={index} span={6}><Card {...this.props} type='search' data={item} /></Col>)) :
          <p style={{ margin: '30px 0px 30px 10px' }}>未查询到仪器</p>
        }
      </Row>
    </div>
  );
  // 全部、其他列表
  datasHtml = (cardDatas) => (cardDatas.map((item, index) => (<Col key={index} span={6}><Card {...this.props} data={item} /></Col>)))
  render() {
    const { cardDatas, searchDatas, loading, searchType, Id } = this.state;
    return (<div className="jiedan_cardList">
      {this.checkableTagHtml()}
      <Spin spinning={loading}>
        <div style={{ padding: '0 8px'}}>
          {searchType ?
            this.searchDatasHtml(searchDatas) : null}
          {searchType ? <Row style={{ marginLeft: 10 }}>其他结果：</Row> : null}
          <Row>
            {this.datasHtml(cardDatas)}
            {
              Id === '问呗' ? <Col key={-1} span={6}>
                <div className="jiedan_cardList_card" onClick={() => { window.location.href = `#/jiedan/jiedanTabPageDetail/发布新订单` }}>
                  <Icon type="plus" />
                  <br/>
                  <span>发布订单</span>
                </div>  
              </Col> : null
            }
          </Row>
        </div>
      </Spin>
    </div>);
  }
}

export default TabPage;
