import React, { Component } from 'react';
import Card from './card';
import { Row, Col, Spin, Tag } from 'antd';
import { data, tagsFromList } from './serverData.js';
import reqwest from 'reqwest';
import './tabPage.less';

const { CheckableTag } = Tag;

class TabPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      AllcardDatas: [], // 全部数据
      cardDatas: [], // 不同类型的数据
      loading: true,
      type: [], // 仪器分属哪个类型
      selectedTags: ['全部'], // 仪器类型
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
      loading: true,
    });
    reqwest({
      url: `${window.imgSrc}/web/index/my/getDeviceList.json`, // https://www.ushance.com
      method: 'get',
      data: {
        type: '设备共享'
      },
      success: (res) => {
        this.setState({
          loading: false,
        });
        if (res.result === 'succeed') {
          const Arr = res.data ? res.data : [];
          this.setState({
            AllcardDatas: Arr,
            type: [KList[1]],
            cardDatas: Arr.filter(e => e.type === KList[1]),
          });
        } else {
          message.error(res.message || '请求异常');
        }
      }
    })
    try {
      this.setState({
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
  typeChange = (tag, checked) => {
    if (checked) { // 确定切换
      const { AllcardDatas } = this.state;
      if (tag === '全部') {
        this.setState({
          cardDatas: AllcardDatas,
          type: [tag],
          selectedTags: ['全部'],
          tagsFromServer: tagsFromList['全部']
        })
      } else {
        this.setState({
          cardDatas: AllcardDatas.filter(e => e.type === tag),
          type: [tag],
          selectedTags: ['全部'],
          tagsFromServer: tagsFromList[tag]
        })
      }
    }
  }
  handleChange = (tag, checked) => {
    if (checked) { // 确定切换
      const { AllcardDatas, type } = this.state;
      if (tag === '全部') {
        if (type[0] === '全部') {
          this.setState({
            cardDatas: AllcardDatas,
            selectedTags: [tag],
          })
        } else {
          this.setState({
            cardDatas: AllcardDatas.filter(e => e.type === type[0]),
            selectedTags: [tag],
          })
        }
      } else {
        if (type[0] === '全部') {
          this.setState({
            cardDatas: AllcardDatas.filter(e => e.dedail_type === tag),
            selectedTags: [tag],
          })
        } else {
          this.setState({
            cardDatas: AllcardDatas.filter(e => e.type === type[0] && e.dedail_type === tag),
            selectedTags: [tag],
          })
        }
      }
    }
  }
  // 分类导航
  checkableTagHtml = () => {
    const { selectedTags, type } = this.state;
    return (
      <div style={{ marginBottom: 20, marginTop: '32px' }}>
        {/* <h5 style={{ margin: '0px 8px 20px 10px', display: 'inline'  }}>分类导航:</h5> */}
        {['全部', '材料检测', '生物检测', '医学检测', '环境检测'].map(tag => (
          <CheckableTag
            key={tag}
            checked={type.indexOf(tag) > -1}
            onChange={checked => this.typeChange(tag, checked)}
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
      <div className="release-left">如果找不到仪器，您可以问呗发布，或者点击发布订单</div>
      <div className="release-right">
        <a data-href="#/jiedan/jiedanTabPageDetail/发布新订单" style={{ textDecoration: 'none' }}>
          <div className="release-jump">发布订单</div>
        </a>
      </div>
    </div>
  )
  render() {
    const { cardDatas, searchDatas, loading, searchType } = this.state;
    return (<div id="tab_page_cardList">
      {this.checkableTagHtml()}
      <Spin spinning={loading} tip="数据加载中...">
        <div style={{ padding: '0 8px', minHeight: '200px'}}>
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
