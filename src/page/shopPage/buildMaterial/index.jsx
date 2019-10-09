import React, { PureComponent } from 'react';
import Card from './card';
import { Row, Col, Spin, Tag, Button, Empty  } from 'antd';
import { data } from './serverData.js';

import './index.less';
import reqwest from 'reqwest';

const { CheckableTag } = Tag;

class BuildMaterial extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      itemData: [],
      selectedTags: [],
      tagServerOne: ['全部', '化学试剂', '实验耗材', '试验设备', '实验室建设', '建材', '外加剂', '矿山设备', '劳防用品'],
      tagServerTwo: ['全部', '通用试剂', '高纯试剂', '色谱应用', '分析标准品', '合成砌块', '合成试剂', '稳定性同位素', '材料化学', '分析试剂'],
      tagServerThree: ['全部', 'AR', 'CP', 'GR', 'ACS', '无水级', '合成级', '其他级别', 'LR', '有机', '无机', '工业级', '氧化和过氧化物', '无机酸', '无机碱', '单质', '无机盐'],
    };
  }
  componentDidMount () {
    this.getData();
  }

  getData = () => {
    const { params: { name } } = this.props;
    reqwest({
      url: 'https://www.ushance.com/web/index/my/getGoodsList.json',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.result === 'succeed') {
          const itemData = res.data;
          // debugger
          // console.log(itemData.filter((i) => (i.type === name)))
          // this.setState({
          //   itemData: itemData.filter((i) => (i.type === name)),
          // });
          this.setState({
            itemData,
          });
        } else {
          message.error(val.message || '请求异常');
        }
      }
    })
  }

  handleChange = (tag, checked) => {
    const { selectedTags, cardDatas } = this.state;
    const { params: { key } } = this.props;
    const oldCardData = data[key];
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
    const { selectedTags, tagServerOne, tagServerTwo, tagServerThree } = this.state;
    return (
      <div style={{ marginBottom: 20, marginTop: '32px' }}>
        {/* <h5 style={{ margin: '0px 8px 20px 10px', display: 'inline'  }}>分类导航:</h5> */}
        {tagServerOne.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
        <br/>
        {tagServerTwo.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
         <br/>
        {tagServerThree.map(tag => (
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

  // 全部、其他列表
  datasHtml = (cardDatas) => (<Row>{cardDatas.map((item, index) => (<Col key={index} span={6}><Card {...this.props} data={item} /></Col>))}</Row>)

  render() {
    const { loading, itemData } = this.state;
    return (<div id="build-material">
      { this.checkableTagHtml() }
      <Spin spinning={loading}>
        <div style={{ padding: '0 8px'}}>
          {/* {true ? this.datasHtml(data['材料检测']) : <Empty description={false} />} */}
          {true ? this.datasHtml(itemData) : <Empty description={false} />}
        </div>
      </Spin>
      {
        itemData && itemData.length ?
        (<div className="load-more">
          <Button type="primary">给我更多</Button>
        </div>) : null
      }
    </div>);
  }
}

export default BuildMaterial;
