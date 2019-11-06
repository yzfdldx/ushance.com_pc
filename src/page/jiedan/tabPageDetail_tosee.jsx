import React, { Component } from 'react';
import { Spin, Tabs, Steps, Collapse, Icon, Input, Tag, Alert, Button, Form, message, Row, Col } from 'antd';

const { TabPane } = Tabs;
const { Step } = Steps;
const { Panel } = Collapse;

import './tabPageDetail.less';

class TabPageDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: '',
      cardDatas: [], // 全部数据
      loading: true,
      selectedTags: [],
      searchDatas: [], // 搜索到的数据
      searchType: false, // 搜索打标
      // 预约
      spellList: [{
        title: 'A组样品',
        Len: 12, // 样品数量
        TestName: 'as', // 标样名称
        TestLen: 1, // 标样数量
        vlaue: {},
        current: 0,
      }],
      // step1
      TagList: [ // 元素
        'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O',
        'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S',
        'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr',
        'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge',
        'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
        'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd',
      ],
      sizeList: ['5%以上', '1%-5%', '0.5%-1%', '0.5%一下另议'], // 尺寸
      typeList: ['粉末态', '块状', '薄膜'], // 尺寸
      otherList: ['俄歇谱', '价带谱', '刻蚀(小于5nm)']
    };
  }
  componentDidMount () {
    const { params: { name } } = this.props;
    this.setState({
      loading: false,
      id: name
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.key !== this.props.params.key) {
      this.setState({
        loading: true,
      });
      const { key } = nextProps.params;
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 300);
    }
  }
  okFn = () => {
    message.success('接单成功');
    setTimeout(() => {
      location.hash = `#/jiedan/jiedanCardList/帮呗`;
    }, 1000)
  }
  calFn = () => {
    history.go(-1);
  }
  render() {
    const { cardDatas, searchDatas, loading, searchType } = this.state;
    // 预约
    const {
      id,
      spellList,
      TagList, typeList, sizeList, otherList
    } = this.state;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };
    return (<div id="tab-page-detail">
      <div>
        <Spin spinning={loading}>
        <div className="title">
          {id}
        </div>
          <div className="tab-page-spell">
            <Form layout="inline">
              {
                spellList.map((e, k) => {
                  //
                  let step1_type = getFieldValue(`fz${k + 1}_step1_type`); // 形态
                  let step1_size = getFieldValue(`fz${k + 1}_step1_size`); // 尺寸
                  let step1_element = getFieldValue(`fz${k + 1}_step1_element`); // 含有元素
                  let step1_un_element = getFieldValue(`fz${k + 1}_step1_un_element`); // 不含元素
                  //
                  let step2_small_element = getFieldValue(`fz${k + 1}_step2_small_element`); // 微量元素
                  // _step2_otherList
                  let step2_otherList = getFieldValue(`fz${k + 1}_step2_otherList`); // other
                  return (<Collapse
                    defaultActiveKey={['0']}
                    bordered={false}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                  >
                    <Panel
                      header={<div>
                        <Form.Item label={`第${k + 1}组 - 分组测试数量`}>
                          {getFieldDecorator(`fz${k + 1}_number`, {
                            rules: [{ required: true, message: '请输入样品数量' }],
                            initialValue: 1
                          })(<Input disabled onClick={(e)=>{e.stopPropagation()}} size="small" placeholder={e.Len} style={{width: '150px', marginLeft: '8px'}} />)}
                        </Form.Item>
                      </div>}
                      key={`${k}`}
                      style={customPanelStyle}
                    >
                      <div className="tab_page_detail_Timeline">
                        <table className="tab_page_detail_Timeline_result" gutter2={16}>
                          <tr>
                            <td span={6} className="tab_page_detail_Timeline_result_Col">1.样品</td>
                            <td span={18}>
                              <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col tab_page_detail_Timeline_result_Col_mar">1) 数量</Col>
                              <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col tab_page_detail_Timeline_result_Col_mar">232</Col>
                              <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col">2) 形态</Col>
                              <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col">粉末</Col>
                              <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col">3) 尺寸</Col>
                              <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col">5%以上</Col>
                              <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col">4) 含有元素</Col>
                              <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col">Fe, Co, Ni</Col>
                              <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col">5) 不含元素</Col>
                              <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col">Fe, Co, Ni</Col>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ height: '12px' }}></td>
                          </tr>
                          <tr>
                            <td style={{ marginTop: '12px' }} className="tab_page_detail_Timeline_result_Col">2.元素</td>
                            <td style={{ marginTop: '12px' }}>
                              <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col tab_page_detail_Timeline_result_Col_mar">1) 数量</Col>
                              <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col tab_page_detail_Timeline_result_Col_mar">232</Col>
                              <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col">2) 种类</Col>
                              <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col">2313</Col>
                              <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col">3) 微量元素</Col>
                              <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col">Co, Ni, C</Col>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ height: '12px' }}></td>
                          </tr>
                          <tr>
                            <td style={{ marginTop: '12px' }} className="tab_page_detail_Timeline_result_Col">3.其它</td>
                            <td style={{ marginTop: '12px' }}>
                              <Col span={23} offset={1} className="tab_page_detail_Timeline_result_Col tab_page_detail_Timeline_result_Col_mar">刻蚀(小于5nm)</Col>
                            </td>
                          </tr>
                        </table>
                        <Alert message="本组测试价格价格为120元" type="warning" />
                      </div>
                    </Panel>
                  </Collapse>)})
              }
            </Form>
            <Alert message="本次测试一共需要300元" type="success" />
            <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '16px' }}>
              <Button onClick={this.okFn} type="primary" style={{ marginRight: '32px' }}>接单</Button>
              <Button onClick={this.calFn}>返回</Button>
            </div>
          </div>
        </Spin>
      </div>
    </div>);
  }
}

const TabPageDetailForm = Form.create()(TabPageDetail);
export default TabPageDetailForm;
