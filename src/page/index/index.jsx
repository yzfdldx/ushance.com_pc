import React from 'react';
import './index.less';
import { Carousel, Row, Col, Button, Tabs } from 'antd';

const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cardList: [{
        name: '材料测试',
        img: 'https://statics.shiyanjia.com/c/v3/images/index/materia.png',
        url: '',
        lap1: [{
          name: 'X射线光电子能谱（XPS）',
          url: ''
        }, {
          name: '透射电子显微镜（TEM）',
          url: ''
        }],
        lap2: [{
          name: '扫描电子显微镜（SEM）',
          url: ''
        }, {
          name: '比表面及孔隙分析仪（BET）',
          url: ''
        }],
      }, {
        name: '生物测试',
        img: 'https://statics.shiyanjia.com/c/v3/images/index/biology.png',
        url: '',
        lap1: [{
          name: 'X射线光电子能谱（XPS）',
          url: ''
        }, {
          name: '透射电子显微镜（TEM）',
          url: ''
        }],
        lap2: [{
          name: '扫描电子显微镜（SEM）',
          url: ''
        }, {
          name: '比表面及孔隙分析仪（BET）',
          url: ''
        }],
      }, {
        name: '科研绘图',
        img: 'https://statics.shiyanjia.com/c/v3/images/index/draw.png',
        url: '',
        lap1: [{
          name: 'X射线光电子能谱（XPS）',
          url: ''
        }, {
          name: '透射电子显微镜（TEM）',
          url: ''
        }],
        lap2: [{
          name: '扫描电子显微镜（SEM）',
          url: ''
        }, {
          name: '比表面及孔隙分析仪（BET）',
          url: ''
        }],
      }, {
        name: '模拟计算',
        img: 'https://statics.shiyanjia.com/c/v3/images/index/simulation.png',
        url: '',
        lap1: [{
          name: 'X射线光电子能谱（XPS）',
          url: ''
        }, {
          name: '透射电子显微镜（TEM）',
          url: ''
        }],
        lap2: [{
          name: '扫描电子显微镜（SEM）',
          url: ''
        }, {
          name: '比表面及孔隙分析仪（BET）',
          url: ''
        }],
      }, {
        name: '数据分析',
        img: 'https://statics.shiyanjia.com/c/v3/images/index/analysis.png',
        url: '',
        lap1: [{
          name: 'X射线光电子能谱（XPS）',
          url: ''
        }, {
          name: '透射电子显微镜（TEM）',
          url: ''
        }],
        lap2: [{
          name: '扫描电子显微镜（SEM）',
          url: ''
        }, {
          name: '比表面及孔隙分析仪（BET）',
          url: ''
        }],
      }],
      shiyanList: [{
        title: '设备榜单',
        nate: '常用实验设备推荐',
        // backIMg: 'https://statics.shiyanjia.com/c/v3/images/index/vip111.png',
        backIMg: '',
        list: [{
          type: 'evt',
          name: '李**',
          time: '12:43',
          pay: '可以测试**'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '可以测试**'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '可以测试**'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '可以测试**'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '可以测试**'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '可以测试**'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '可以测试**'
        }]
      }, {
        title: '订单榜',
        nate: '现发布的设备订单，欢迎各位老师抢单',
        // backIMg: 'https://statics.shiyanjia.com/c/v3/images/index/vip222.png',
        backIMg: '',
        list: [{
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          a: true,
          pay: '去抢单'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          a: true,
          pay: '去抢单'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          a: true,
          pay: '去抢单'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          a: true,
          pay: '去抢单'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          a: true,
          pay: '去抢单'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          a: true,
          pay: '去抢单'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          a: true,
          pay: '去抢单'
        }]
      }, {
        title: '成交榜单',
        nate: '查看最新成交订单，欢迎各位老师根据成交量提供设备',
        // backIMg: 'https://statics.shiyanjia.com/c/v3/images/index/vip333.png',
        backIMg: '',
        list: [{
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '使用微信付款'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '使用微信付款'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '使用微信付款'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '使用微信付款'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '使用微信付款'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '使用微信付款'
        }, {
          type: '气象色谱仪',
          name: '李光*',
          time: '12:43',
          pay: '使用微信付款'
        }]
      }],
      liuCeng: [{
        tabName: '仪器类',
        img: `/img/index/step/1.png`,
        list: [{
          backgroundPosition: '554px 0',
          title: '注册/登陆',
          note: '注册/登陆，畅享平台所有设备及服务'
        }, {
          backgroundPosition: '474px 0',
          title: '加入会员',
          note: '加入YOU闪测课题组，畅享更多积分及加速包'
        }, {
          backgroundPosition: '393px 0',
          title: '预约仪器',
          note: '预约仪器，若无目标设备，可提交要求私人订制'
        }, {
          backgroundPosition: '314px 0',
          title: '填写实验需求',
          note: '确认测试细节及特殊要求'
        }, {
          backgroundPosition: '235px 0',
          title: '确定预约单',
          note: '在承诺时间内保证质量完成制样及测试'
        }, {
          backgroundPosition: '154px 0',
          title: '收到实验结果',
          note: '线上下载结果报告并检测结果及保密要求确认对此进行准确评价'
        }, {
          backgroundPosition: '77px 0',
          title: '支付检测费',
          note: '微信、支付宝、网银，无需个人垫付，可协助测试费用报销；团体支付更优惠'
        }]
      }, {
        tabName: '咨询类',
        img: `/img/index/step/2.png`,
        list: [{
          backgroundPosition: '474px 0',
          title: '注册/登陆',
          note: '注册/登陆，畅享平台所有设备及服务'
        }, {
          backgroundPosition: '393px 0',
          title: '加入会员',
          note: '加入YOU闪测课题组，畅享更多积分及加速包'
        }, {
          backgroundPosition: '314px 0',
          title: '预约服务',
          note: '预约服务，若无目标服务，可提交要求私人订制'
        }, {
          backgroundPosition: '235px 0',
          title: '支付咨询费',
          note: '微信、支付宝、网银，无需个人垫付，可协助测试费用报销；团体支付更优惠'
        }, {
          backgroundPosition: '154px 0',
          title: '初稿审阅',
          note: '承诺若不满意，则全额退款或更换咨询师'
        }, {
          backgroundPosition: '77px 0',
          title: '终稿审阅',
          note: '修改至满意为止'
        }]
      }, {
        tabName: '接单类',
        img: `/img/index/step/3.png`,
        list: [{
          backgroundPosition: '393px 0',
          title: '注册/登陆',
          note: '注册/登陆，畅享平台所有设备及服务'
        }, {
          backgroundPosition: '314px 0',
          title: '加入会员',
          note: '加入YOU闪测课题组，畅享更多积分及加速包'
        }, {
          backgroundPosition: '235px 0',
          title: '资质审核',
          note: '资质审核后，加入YOU闪测工作组'
        }, {
          backgroundPosition: '154px 0',
          title: '填写抢单报告',
          note: '平台展示的可供订单信息栏中若有可胜任订单，则向平台提交接单意向，待平台确认后按时按量完成订单'
        }, {
          backgroundPosition: '77px 0',
          title: '提交成果并支费',
          note: '向平台提交成果，待客户确认无误后，收到酬金'
        }]
      }, {
        tabName: '商城类',
        img: `/img/index/step/4.png`,
        list: [{
          backgroundPosition: '314px 0',
          title: '注册/登陆',
          note: '注册/登陆，畅享平台所有设备及服务'
        }, {
          backgroundPosition: '235px 0',
          title: '选择加入会员',
          note: '选择加入实验家俱乐部享受首样最高优惠200元, 先测试后付费，积分提速'
        }, {
          backgroundPosition: '154px 0',
          title: '选购商品',
          note: '选购商品并确认订单'
        }, {
          backgroundPosition: '77px 0',
          title: '支付费用',
          note: '微信、支付宝、网银，无需个人垫付，可协助测试费用报销；团体支付更优惠'
        }]
      }, {
        tabName: '支付方式',
        img: `/img/index/step/5.png`,
        list: [{
          backgroundPosition: '235px 0',
          title: '支付方式',
          note: '微信、支付宝或网银绑定经费卡后支付'
        }, {
          backgroundPosition: '154px 0',
          title: '其他',
          note: '若途径1不方便，平台垫付费用，且协助费用报销，无需个人垫付'
        }, {
          backgroundPosition: '77px 0',
          title: '支付优惠',
          note: '团体支付畅享积分及折扣福利'
        }]
      }],
    };
  }
  componentDidMount () {
    //
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const {
      cardList,
      shiyanList,
      liuCeng
    } = this.state;
    return (<div className="index">
      <div style={{width: '100%', overflow: 'hidden', background: 'rgb(255,195,124)'}} >
        <div style={{width: '1200px'}} className="index_Carousel">
          <Carousel autoplay2>
            <div>
              <img src={`${window.imgSrc}/img/index/Carousel1.png`} />
            </div>
          </Carousel>
        </div>
      </div>
      <Row className="index_cardList" style={{ display: 'none' }}>
        {
          cardList.map((e, k) => <Col onClick={() => {window.location.href = "#/TabPage/1"}} key ={k} span="8" className="index_card">
            <div><img src={e.img}/></div>
            <h3>{e.name}</h3>
            <div>
              <span>{e.lap1[0].name} </span>
              |
              <span> {e.lap1[1].name}</span>
            </div>
            <div>
              <span>{e.lap2[0].name} </span>
              |
              <span> {e.lap2[1].name}</span>
            </div>
          </Col>)
        }
      </Row>
      <div className="index_shiyan">
        <div>
          <h3>实验榜单录</h3>
          <Row className="index_shiyan_cardList">
            {
              shiyanList.map((item, Key) => <Col span="8" key={Key} className="index_shiyan_card">
                <div>
                  <div className="index_shiyan_card_title" style={{background: `#FFF url(${item.backIMg}) no-repeat -10px -10px`}}>
                    <h3>{item.title}</h3>
                    <p>{item.nate}</p>
                  </div>
                  <div className="index_shiyan_card_center">
                    <div style={{height: '30px', position: 'relative', zIndex: '2'}}>
                      {
                        item.list.length > 4 ? <Carousel slidesToShow={5} dots={false} autoplay dotPosition="left">
                          {
                            item.list.map((e, k) => <Row key={k} className="index_shiyan_card_center_list">
                              <Col span="8">
                                {e.type}
                              </Col>
                              <Col span="4">
                                {e.name}
                              </Col>
                              <Col span="4">
                                {e.time}
                              </Col>
                              <Col span="8">
                                {e.a ? <a style2={{ position: 'relative', zIndex: '1000000' }} href="#/jiedan/jiedanTabPageDetail_resee/XRD">{e.pay}</a> : e.pay}
                              </Col>
                            </Row>)
                          }
                        </Carousel> : <div>
                          {
                            item.list.map((e, k) => <Row key={k} className="index_shiyan_card_center_list">
                              <Col span="8">
                                {e.type}
                              </Col>
                              <Col span="4">
                                {e.name}
                              </Col>
                              <Col span="4">
                                {e.time}
                              </Col>
                              <Col span="8">
                                {e.pay}
                              </Col>
                            </Row>)
                          }
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </Col>)
            }
          </Row>
          <div className="index_shiyan_button">
            <Button onClick={() => { window.location.href = "#/jiedan/jiedanCardList/帮呗" }}>快来抢单</Button>
          </div>
        </div>
      </div>
      <div className="index_liu">
        <div>
          <h3>服务流程</h3>
          <p>标准化管理，全方位、全流程服务各类科研实验</p>
          <div style={{paddingTop: '30px'}}>
          <Tabs defaultActiveKey="0" tabPosition="left">
            {
              liuCeng.map((e, k) => <TabPane tab={e.tabName} key={k}>
                <Row>
                  {
                    e.list.map((e2, k2) => <Col key={k2} span={8} className="index_liu_card">
                      <span style={{backgroundImage: `url(${window.imgSrc}${e.img})`, backgroundPosition: e2.backgroundPosition}}></span>
                      <div>
                        <h4>{e2.title}</h4>
                        <div>{e2.note}</div>
                      </div>
                    </Col>)
                  }
                </Row>
              </TabPane>)
            }
          </Tabs>
        </div>
        </div>
      </div>
    </div>);
  }
}

export default App;
