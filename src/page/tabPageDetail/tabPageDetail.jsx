import React, { Component } from 'react';
import { Spin, Tabs, Steps, Collapse, Icon, Input, Tag, Alert, Button, Form, Checkbox, Timeline, Row, Col } from 'antd';

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
      }, {
        title: 'B组样品',
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.location.href = "#/TabPageDetail_resee/0"
      }
    });
  }
  addSpellList = () => {
    let { spellList } = this.state;
    spellList = spellList || [];
    spellList.push({
      Len: 12, // 样品数量
      TestName: 'as', // 标样名称
      TestLen: 1, // 标样数量
      vlaue: {},
      current: 0,
    })
    this.setState({
      spellList
    })
  }
  deleteSpellList = (k, e) => {
    e.stopPropagation();
    let { spellList } = this.state;
    spellList = spellList || [];
    spellList.splice(k, 1);
    this.setState({
      spellList
    })
  }
  pre = (e) => { // 上一步
    const { spellList } = this.state;
    e.current = e.current - 1;
    this.setState({
      spellList
    })
  }
  next = (e) => { // 下一步
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     const { current } = this.state;
    //     this.setState({
    //       current: current + 1
    //     })
    //   }
    // });
    const { spellList } = this.state;
    e.current = e.current + 1;
    this.setState({
      spellList
    })
  }
  calFn = () => {
    this.props.form.resetFields();
    history.go(-1);
  }
  pay = () => {

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
          <Button style={{verticalAlign: 'top', marginLeft: '16px'}} onClick={this.addSpellList} type="primary">新增分组</Button>
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
                          })(<Input onClick={(e)=>{e.stopPropagation()}} size="small" placeholder={e.Len} style={{width: '150px', marginLeft: '8px'}} />)}
                        </Form.Item>
                        <span onClick={this.deleteSpellList.bind(this, k)} style={{ lineHeight: '38px' }}>删除分组</span>
                      </div>}
                      key={`${k}`}
                      style={customPanelStyle}
                    >
                      <Steps size="small" current={e.current} style2={{marginLeft: '24px'}}>
                        <Step title="样品" />
                        <Step title="元素" />
                        <Step title="其它" />
                        <Step title="阅览" />
                      </Steps>
                      <div className="tab_page_detail_Timeline" style={e.current !== 0 ? {display: 'none'} : null}>
                        <Timeline>
                          <Timeline.Item>
                            <Form.Item label={`样品数量`}>
                              {getFieldDecorator(`fz${k + 1}_step1_number`, {
                                rules: [{ required: true, message: '请输入样品数量' }],
                                initialValue: 1,
                              })(<Input onClick={(e)=>{e.stopPropagation()}} size="small" placeholder={e.Len} style={{width: '150px', marginLeft: '8px'}} />)}
                            </Form.Item>
                          </Timeline.Item>
                          <Timeline.Item>
                            <Form.Item label={`样品形态`}>
                              {getFieldDecorator(`fz${k + 1}_step1_type`, {
                                rules: [{ required: true, message: '请选择样品形态' }],
                              }, {
                                // initialValue: ['A', 'B'],
                              })(
                                <Checkbox.Group style={{ display: 'none' }}>
                                  {
                                    typeList.map((e2, k2) => <Checkbox key={k2} style={{marginBottom: '8px'}} value={e2}>{e2}</Checkbox>)
                                  }
                                </Checkbox.Group>,
                              )}
                              <div>
                              {
                                typeList.map((e2, k2) => <Tag
                                  key={k2}
                                  style={{marginBottom: '8px'}}
                                  color={step1_type && step1_type.find(e3 => e3 === e2) ? '#1890ff' : 'gold'}
                                  onClick={() => {
                                    const Json = {};
                                    step1_type = step1_type ? [] : [];
                                    step1_type.push(e2);
                                    Json[`fz${k + 1}_step1_type`] = step1_type;
                                    setFieldsValue(Json)
                                  }}
                                >{e2}</Tag>)
                              }
                              </div>
                              {
                                step1_type ? <Alert message={`待测样品尺寸: ${step1_type}`} type="warning" /> : null
                              }
                            </Form.Item>
                          </Timeline.Item>
                          <Timeline.Item>
                            <Form.Item label={`样品尺寸`}>
                              {getFieldDecorator(`fz${k + 1}_step1_size`, {
                                rules: [{ required: true, message: '请选择样品尺寸' }],
                              }, {
                                // initialValue: ['A', 'B'],
                              })(
                                <Checkbox.Group style={{ display: 'none' }}>
                                  {
                                    sizeList.map((e2, k2) => <Checkbox key={k2} style={{marginBottom: '8px'}} value={e2}>{e2}</Checkbox>)
                                  }
                                </Checkbox.Group>,
                              )}
                              {
                                sizeList.map((e2, k2) => <Tag
                                  key={k2}
                                  style={{marginBottom: '8px'}}
                                  color={step1_size && step1_size.find(e3 => e3 === e2) ? '#1890ff' : 'gold'}
                                  onClick={() => {
                                    const Json = {};
                                    step1_size = step1_size ? [] : [];
                                    step1_size.push(e2);
                                    Json[`fz${k + 1}_step1_size`] = step1_size;
                                    setFieldsValue(Json)
                                  }}
                                >{e2}</Tag>)
                              }
                              {
                                step1_size ? <Alert message={`待测样品尺寸: ${step1_size}`} type="warning" /> : null
                              }
                            </Form.Item>
                          </Timeline.Item>
                          <Timeline.Item>
                            <Form.Item label={`含有成分`}>
                              {getFieldDecorator(`fz${k + 1}_step1_element`, {
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
                                  color={step1_element && step1_element.find(e3 => e3 === e2) ? '#1890ff' : 'gold'}
                                  onClick={() => {
                                    const Key = step1_element && step1_element.findIndex(e3 => e3 === e2);
                                    const Json = {};
                                    if ((Key && Key !== -1) || Key === 0) {
                                      step1_element.splice(Key, 1);
                                      Json[`fz${k + 1}_step1_element`] = step1_element;
                                      setFieldsValue(Json);
                                    } else {
                                      step1_element = step1_element ? step1_element : [];
                                      step1_element.push(e2);
                                      Json[`fz${k + 1}_step1_element`] = step1_element;
                                      setFieldsValue(Json);
                                    }
                                  }}
                                >{e2}</Tag>)
                              }
                              {
                                step1_element && step1_element.length ? <Alert message={`待测含有元素: ${step1_element.join(', ')}`} type="warning" /> : null
                              }
                            </Form.Item>
                          </Timeline.Item>
                          <Timeline.Item>
                            <Form.Item label={`不含成分`}>
                              {getFieldDecorator(`fz${k + 1}_step1_un_element`, {
                                rules: [{ required: true, message: '请选择样品中需要测试不含元素' }],
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
                                  color={step1_un_element && step1_un_element.find(e3 => e3 === e2) ? '#1890ff' : 'gold'}
                                  onClick={() => {
                                    const Key = step1_un_element && step1_un_element.findIndex(e3 => e3 === e2);
                                    const Json = {};
                                    if ((Key && Key !== -1) || Key === 0) {
                                      step1_un_element.splice(Key, 1);
                                      Json[`fz${k + 1}_step1_un_element`] = step1_un_element;
                                      setFieldsValue(Json);
                                    } else {
                                      step1_un_element = step1_un_element ? step1_un_element : [];
                                      step1_un_element.push(e2);
                                      Json[`fz${k + 1}_step1_un_element`] = step1_un_element;
                                      setFieldsValue(Json);
                                    }
                                  }}
                                >{e2}</Tag>)
                              }
                              {
                                step1_un_element && step1_un_element.length ? <Alert message={`待测不含元素: ${step1_un_element.join(', ')}`} type="warning" /> : null
                              }
                            </Form.Item>
                          </Timeline.Item>
                        </Timeline>
                      </div>
                      <div className="tab_page_detail_Timeline" style={e.current !== 1 ? {display: 'none'} : null}>
                        <Timeline>
                          <Timeline.Item>
                            <Form.Item label={`元素数量`}>
                              {getFieldDecorator(`fz${k + 1}_step2_number`, {
                                rules: [{ required: true, message: '请输入元素数量' }],
                                initialValue: 1,
                              })(<Input onClick={(e)=>{e.stopPropagation()}} size="small" placeholder={e.Len} style={{width: '150px', marginLeft: '8px'}} />)}
                            </Form.Item>
                          </Timeline.Item>
                          <Timeline.Item>
                            <Form.Item label={`元素种类`}>
                              {getFieldDecorator(`fz${k + 1}_step2_type`, {
                                rules: [{ required: true, message: '请输入元素种类' }],
                                initialValue: 1,
                              })(<Input onClick={(e)=>{e.stopPropagation()}} size="small" placeholder={e.Len} style={{width: '150px', marginLeft: '8px'}} />)}
                            </Form.Item>
                          </Timeline.Item>
                          <Timeline.Item>
                            <Form.Item label={`微量元素`}>
                              {getFieldDecorator(`fz${k + 1}_step2_small_element`, {
                                rules: [{ required: true, message: '请选择样品中需要测试不含元素' }],
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
                                  color={step2_small_element && step2_small_element.find(e3 => e3 === e2) ? '#1890ff' : 'gold'}
                                  onClick={() => {
                                    const Key = step2_small_element && step2_small_element.findIndex(e3 => e3 === e2);
                                    const Json = {};
                                    if ((Key && Key !== -1) || Key === 0) {
                                      step2_small_element.splice(Key, 1);
                                      Json[`fz${k + 1}_step2_small_element`] = step2_small_element;
                                      setFieldsValue(Json);
                                    } else {
                                      step2_small_element = step2_small_element ? step2_small_element : [];
                                      step2_small_element.push(e2);
                                      Json[`fz${k + 1}_step2_small_element`] = step2_small_element;
                                      setFieldsValue(Json);
                                    }
                                  }}
                                >{e2}</Tag>)
                              }
                              {
                                step2_small_element && step2_small_element.length ? <Alert message={`待测微量元素: ${step2_small_element.join(', ')}`} type="warning" /> : null
                              }
                            </Form.Item>
                          </Timeline.Item>
                        </Timeline>
                      </div>
                      <div className="tab_page_detail_Timeline" style={e.current !== 2 ? {display: 'none'} : null}>
                        <Timeline>
                          <Timeline.Item>
                            <Form.Item label={`其它要求`}>
                              {getFieldDecorator(`fz${k + 1}_step2_otherList`, {
                                rules: [{ required: true, message: '请选择其它要求' }],
                              }, {
                                // initialValue: ['A', 'B'],
                              })(
                                <Checkbox.Group style={{ display: 'none' }}>
                                  {
                                    otherList.map((e2, k2) => <Checkbox key={k2} style={{marginBottom: '8px'}} value={e2}>{e2}</Checkbox>)
                                  }
                                </Checkbox.Group>,
                              )}
                              <div>
                              {
                                otherList.map((e2, k2) => <Tag
                                  key={k2}
                                  style={{marginBottom: '8px'}}
                                  color={step2_otherList && step2_otherList.find(e3 => e3 === e2) ? '#1890ff' : 'gold'}
                                  onClick={() => {
                                    const Json = {};
                                    step2_otherList = step2_otherList ? [] : [];
                                    step2_otherList.push(e2);
                                    Json[`fz${k + 1}_step2_otherList`] = step2_otherList;
                                    setFieldsValue(Json)
                                  }}
                                >{e2}</Tag>)
                              }
                              </div>
                              {
                                step2_otherList ? <Alert message={`其它: ${step2_otherList}`} type="warning" /> : null
                              }
                            </Form.Item>
                          </Timeline.Item>
                        </Timeline>
                      </div>
                      <div className="tab_page_detail_Timeline" style={e.current !== 3 ? {display: 'none'} : null}>
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
                      {
                        e.current === 0 ?<div style={{ textAlign: 'center' }}>
                          <Button disabled type="primary" style={{ marginRight: '32px' }}>上一步</Button>
                          <Button onClick={this.next.bind(this, e)} type="primary">下一步</Button>
                        </div> : null
                      }
                      {
                        e.current === 1 || e.current === 2 ?<div style={{ textAlign: 'center' }}>
                          <Button onClick={this.pre.bind(this, e)} type="primary" style={{ marginRight: '32px' }}>上一步</Button>
                          <Button onClick={this.next.bind(this, e)} type="primary">下一步</Button>
                        </div> : null
                      }
                      {
                        e.current === 3 ? <div style={{ textAlign: 'center' }}>
                          <Button onClick={this.pre.bind(this, e)} type="primary" style={{ marginRight: '32px' }}>上一步</Button>
                          <Button disabled type="primary">下一步</Button>
                        </div> : null
                      }
                    </Panel>
                  </Collapse>)})
              }
            </Form>
            <Alert message="本次测试一共需要300元" type="success" />
            <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '16px' }}>
              <Button onClick={this.pay} type="primary" style={{ marginRight: '32px' }}>去支付</Button>
              <Button onClick={this.calFn}>返回</Button>
            </div>
          </div>
        </Spin>
      </div>
    </div>);
  }
}

{/* <Steps direction="vertical" size="small" current={0} style={{marginLeft: '24px'}}>
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
</Steps> */}

const TabPageDetailForm = Form.create()(TabPageDetail);
export default TabPageDetailForm;
