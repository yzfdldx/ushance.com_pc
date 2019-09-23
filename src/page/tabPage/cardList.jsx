import React, { Component } from 'react';
import Card from './card';
import { Row, Col, Spin, Tag } from 'antd';
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
      Id: [],
    };
  }
  componentDidMount () {
    const { params: { key } } = this.props;
    const KList = key.split('-');
    this.setState({
      Id: KList,
      loading: false,
    });
    try {
      this.setState({
        cardDatas: data[KList[1]] ? data[KList[1]] : [],
        tagsFromServer: tagsFromList[KList[1]] ? tagsFromList[KList[1]] : [],
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
      const KList = key.split('-');
      key = KList[0];
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
    const oldCardData = data[Id[1]];
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
        {/* <h5 style={{ margin: '0px 8px 20px 10px', display: 'inline'  }}>分类导航:</h5> */}
        {['全部', '材料检测', '生物检测', '医学检测', '环境检测'].map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
        <br/>
        {this.state.tagsFromServer.map(tag => (
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
  datasHtml = (cardDatas) => (<Row>{cardDatas.map((item, index) => (<Col key={index} span={6}><Card {...this.props} data={item} /></Col>))}</Row>)
  // releaseRequirement发布需求
  releaseRequirement = () => (
    <div className="release-box">
      <div className="release-left">如果找不到仪器，您可以发布您的需求，由我们来帮您挑选最优的服务商</div>
      <div className="release-right">
        <a href="###" style={{ textDecoration: 'none' }}>
          <div className="release-jump">发布需求</div>
        </a>
      </div>
    </div>
  )
  render() {
    const { cardDatas, searchDatas, loading, searchType } = this.state;
    return (<div id="tab_page_cardList">
      {this.checkableTagHtml()}
      <Spin spinning={loading}>
        <div style={{ padding: '0 8px'}}>
          {searchType ?
            this.searchDatasHtml(searchDatas) : null}
          {searchType ? <Row style={{ marginLeft: 10 }}>其他结果：</Row> : null}
          {this.datasHtml(cardDatas)}
        </div>
      </Spin>
      {this.releaseRequirement()}
    </div>);
  }
}

export default TabPage;
