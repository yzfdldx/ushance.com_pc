import React, { Component } from 'react';
import { Spin, Tabs, Steps, Collapse, Icon, Input, Tag, Alert, Button, Form, Checkbox } from 'antd';

const { TabPane } = Tabs;
const { Step } = Steps;
const { Panel } = Collapse;

import './tabPageDetail.less';

class TabPageDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
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
      }],
      TagList: [
        'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O',
        'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S',
        'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr',
        'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge',
        'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
        'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd',
      ],
      contentList: ['5%以上', '1%-5%', '0.5%-1%', '0.5%一下另议']
    };
  }
  componentDidMount () {
    const { params: { key } } = this.props;
    this.setState({
      loading: false,
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.location.href = "#/TabPageDetail_resee/0"
      }
    });
  }
  calFn = () => {
    this.props.form.resetFields();
  }
  render() {
    const { cardDatas, searchDatas, loading, searchType } = this.state;
    // 预约
    const {
      spellList,
      TagList, contentList
    } = this.state;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };
    let all_type = getFieldValue('all_type');
    let need_type = getFieldValue('need_type');
    return (<div id="tab-page-detail">
      <div>
        <Spin spinning={loading}>
          <div className="title">X射线荧光光谱仪（XRF）</div>
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
              <Tabs defaultActiveKey="1">
                <TabPane tab="仪器预约" key="1">
                  <div className="tab-page-spell">
                    <Form layout="inline">
                      <Collapse
                        defaultActiveKey={['0']}
                        bordered={false}
                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                      >
                        {
                          spellList.map((e, k) => <Panel
                            header={<div>
                              <Form.Item label={e.title}>
                                {getFieldDecorator('name', {
                                  rules: [{ required: true, message: '请输入样品名称' }],
                                })(<Input size="small" placeholder={e.title} style={{width: '150px', marginLeft: '8px'}} />)}
                              </Form.Item>
                              <Form.Item label="样品数量">
                                {getFieldDecorator('number', {
                                  rules: [{ required: true, message: '请输入样品数量' }],
                                })(<Input size="small" placeholder={e.Len} style={{width: '150px', marginLeft: '8px'}} />)}
                              </Form.Item>
                            </div>}
                            key={`${k}`}
                            style={customPanelStyle}
                          >
                            <Steps direction="vertical" size="small" current={0} style={{marginLeft: '24px'}}>
                              <Step
                                title="样品中需要测试的元素"
                                description={<div style={{width: '500px'}}>
                                  <Form.Item>
                                    {getFieldDecorator('all_type', {
                                      rules: [{ required: true, message: '请选择样品中需要测试的元素' }],
                                    }, {
                                      // initialValue: ['A', 'B'],
                                    })(
                                      <Checkbox.Group style={{ display: 'none' }}>
                                        {
                                          TagList.map((e2, k2) => <Checkbox key={k2} style={{marginBottom: '8px'}} value={e2}>{e2}</Checkbox>)
                                        }
                                      </Checkbox.Group>,
                                    )}
                                    {
                                      TagList.map((e2, k2) => <Tag
                                        key={k2}
                                        style={{marginBottom: '8px'}}
                                        color={all_type && all_type.find(e3 => e3 === e2) ? '#1890ff' : 'gold'}
                                        onClick={() => {
                                          const Key = all_type && all_type.findIndex(e3 => e3 === e2);
                                          if ((Key && Key !== -1) || Key === 0) {
                                            all_type.splice(Key, 1);
                                            setFieldsValue({
                                              all_type
                                            })
                                          } else {
                                            all_type = all_type ? all_type : [];
                                            all_type.push(e2);
                                            setFieldsValue({
                                              all_type
                                            })
                                          }
                                        }}
                                      >{e2}</Tag>)
                                    }
                                    <Alert message="请选择需要测试的元素" type="warning" />
                                  </Form.Item>
                                </div>}
                              />
                              <Step
                                title="待测元素含量"
                                description={<div style={{width: '500px'}}>
                                  <Form.Item>
                                    {getFieldDecorator('need_type', {
                                      rules: [{ required: true, message: '请选择待测元素含量' }],
                                    }, {
                                      // initialValue: ['A', 'B'],
                                    })(
                                      <Checkbox.Group style={{ display: 'none' }}>
                                        {
                                          contentList.map((e2, k2) => <Checkbox key={k2} style={{marginBottom: '8px'}} value={e2}>{e2}</Checkbox>)
                                        }
                                      </Checkbox.Group>,
                                    )}
                                    {
                                      contentList.map((e2, k2) => <Tag
                                        key={k2}
                                        style={{marginBottom: '8px'}}
                                        color={need_type && need_type.find(e3 => e3 === e2) ? '#1890ff' : 'gold'}
                                        onClick={() => {
                                          const Key = need_type && need_type.findIndex(e3 => e3 === e2);
                                          if ((Key && Key !== -1) || Key === 0) {
                                            need_type.splice(Key, 1);
                                            setFieldsValue({
                                              need_type: need_type
                                            })
                                          } else {
                                            need_type = need_type ? need_type : [];
                                            need_type.push(e2);
                                            setFieldsValue({
                                              need_type
                                            })
                                          }
                                        }}
                                      >{e2}</Tag>)
                                    }
                                    <Alert message="不同含量测试的价格不同" type="warning" />
                                  </Form.Item>
                                </div>}
                              />
                              <Step
                                title="需要测试的标样"
                                description={<div style={{width: '500px'}}>
                                  <Form.Item>
                                    {getFieldDecorator('needname', {
                                      rules: [{ required: true, message: '请输入需要测试的标样' }],
                                    })(<Input size="small" placeholder={e.TestName} style={{width: '150px', marginLeft: '8px'}} />)}
                                  </Form.Item>
                                </div>}
                              />
                              <Step
                                title="需要测试的标样数量"
                                description={<div style={{width: '500px'}}>
                                  <Form.Item>
                                    {getFieldDecorator('needNumder', {
                                      rules: [{ required: true, message: '请输入需要测试的标样数量' }],
                                    })(<Input size="small" placeholder={e.TestLen} style={{width: '150px', marginLeft: '8px'}} />)}
                                  </Form.Item>
                                </div>}
                              />
                            </Steps>
                          </Panel>)
                        }
                      </Collapse>
                    </Form>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={this.okFn} type="primary" style={{ marginRight: '32px' }}>立即预约</Button>
                    <Button onClick={this.calFn}>取消</Button>
                  </div>
                </TabPane>
                <TabPane tab="仪器详情" key="2">
                  <div className="equip-detail-box">
                    <div className="equip-name">X射线荧光光谱仪（XRF）</div>
                    <div className="equip-modal">
                      <div className="modal-col1">型号：</div>
                      <div className="modal-col2">PANalytical Axios； RIGAKU ZSX Priums</div>
                    </div>
                    <div className="question-name">测试项目：</div>
                    <div className="fee-list">
                      <p>可测元素范围：11Na-92U</p>
                    </div>
                    <div className="question-name">样品要求：</div>
                    <div className="fee-list">
                      <p>1. 样品状态：可为粉末、块状、薄膜样品</p>
                      <p>2. 粉末样品：粉末样品需要至少1 g ，最好3 g以上，样品在测试之前尽量干燥，200目以下；含碳元素含量超过10%的样品，请先将样品烧成灰，再测试</p>
                      <p>3. 块状、薄膜样品：块状样品必须有一边大于2.5 cm，标明测试面。</p>
                    </div>
                    <div className="question-name">常见问题及回答：</div>
                    <div className="question-box">
                      <div className="question-title">
                        <p className="question-issue">为什么要求XRF测试粉末样品用量最好达到3 g以上？</p>
                        <p className="question-answer">因为需要和淀粉一起压片做，如果样品量太少的，需要加很多淀粉容易导致结果不准确。</p>
                        <img src="//statics.shiyanjia.com/c/2018/images/equip-detail/question.png" />
                      </div>
                    </div>
                    <div className="question-name">结果展示：</div>
                    <div className="question-result" style={{ paddingBottom: 30 }}>
                      <p>测试结果给出的是txt格式或者word版测试结果。如下图分别为单质和氧化物模式的测试结果。</p>
                      <p><img src="http://admin.shiyanjia.com/ueditor/php/upload/image/20180929/1538202136773472.png" title="1538202136773472.png" alt="图片1.png" width="354" height="160" /></p>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Spin>
      </div>
    </div>);
  }
}

const TabPageDetailForm = Form.create()(TabPageDetail);
export default TabPageDetailForm;
