import React, { Component } from 'react';
import Card from './card';
import { Table, Tag, message } from 'antd';
import { data } from './serverData.js';
import { baomiFn } from './baomi.jsx';
 
import './tabPage.less';

const GetCookie = (name) => { // 获取cookie
  let start;
  let end;
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(`${name}=`); // name + "="
    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(";", start); // eslint-disable-line
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
};

const { CheckableTag } = Tag;
const tagsFromServer = ['全部', '能谱类', '电镜类', '热分析类', '吸附类', '波谱类', '光谱类', '色谱质谱类', '成分分析类', '物理性能测试'];

class TabPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cardDatas: [], // 全部数据
      loading: true,
      selectedTags: [],
      searchDatas: [], // 搜索到的数据
      searchType: false, // 搜索打标,
      Height: window.innerHeight - 220,
      //
      receiptTableData: [{
        father: '设备共享',
        list: [{
          father: '材料检测',
          list: [{
            name: '订单1',
            site: '坐标：上海',
            device: '设备：XRD',
            sample: '样品：粉末状，3个',
            endTime: '截止时间：2019.9.10前'
          }, {
            name: '订单1',
            site: '坐标：上海',
            device: '设备：XRD',
            sample: '样品：粉末状，3个',
            endTime: '截止时间：2019.9.10前'
          }]
        }, {
          father: '生物检测',
        }, {
          father: '医学检测',
        }, {
          father: '环境检测',
        }]
      }, {
        father: '仿真模拟',
        list: [{
          father: '有限元分析'
        }, {
          father: '运动学仿真'
        }]
      }, {
        father: '数据分析',
        list: [{
          father: ''
        }]
      }, {
        father: '建材检测',
        list: [{
          father: ''
        }]
      }],
      spellList: [{
        img: '/img/background/img/1.png',
        background: '/img/background/1/back1.png',
        name: '设备共享',
        baseHeight: 88,
        baseA: 85,
        baseB: 22,
        height: 70,
        card: [
          {
            name: '环境检测',
            clickUrl: '#shebei/CardList/设备共享-环境检测',
            list: ['土类 水类', '气体类']
          },  {
            name: '医学检测',
            clickUrl: '#shebei/CardList/设备共享-医学检测',
            list: ['血细胞分析仪', '电解质分析仪']
          }, {
            name: '生物检测',
            clickUrl: '#shebei/CardList/设备共享-生物检测',
            list: ['TEM SEP', '荧光定量PCR']
          }, {
            name: '材料检测',
            clickUrl: '#/shebei/CardList/设备共享-材料检测',
            list: ['XRD XPS', 'SEM TEM']
          }
        ],
      }, {
        img: '/img/background/img/2.png',
        background: '/img/background/2/back1.png',
        name: '仿真模拟',
        baseHeight: 88,
        baseA: 85,
        baseB: 22,
        height: 70,
        card: [{name: '运动学仿真'}, {name: '有限元分析'}],
        list: [{
          name1: ['XRD', 'XPS', 'SEM'],
          name2: ['XRD', 'XPS', 'SEM'],
          name3: [],
          name4: [],
        }, {
          name1: '有限元分析',
          name2: '运动学仿真',
          name3: '',
          name4: '',
        }]
      }, {
        img: '/img/background/img/3.png',
        background: '/img/background/3/back1.png',
        name: '数据分析',
        baseA: 85,
        baseB: 22,
        height: 70,
        baseHeight: 88,
        card: [{name: '论文润色'}, {name: '翻译'}, {name: '科研作图'}, {name: '数据分析'}],
        list: [{
          name1: ['XRD', 'XPS', 'SEM'],
          name2: ['论文插图', '数据作图'],
          name3: ['翻译', '查重'],
          name4: ['材料类', '生科类', '医学类' , '机械类'],
        }, {
          name1: '数据分析',
          name2: '辅助作图',
          name3: '翻译及查重',
          name4: '论文润色',
        }]
      }, {
        img: '/img/background/img/4.png',
        background: '/img/background/4/back1.png',
        name: '建材检测',
        baseA: 62,
        baseB: 8,
        height: 46,
        baseHeight: 82,
        min: true,
        card: [{name: '防水材料'}, {name: '外加剂'}, {name: '保温材料'}, {name: '砂浆类'}, {name: '墙体'}, {name: '外掺料'}, {name: '混泥土'}, {name: '水泥'}],
        list: [{
          name1: ['硅酸盐水泥', '铝酸盐水泥', '石膏'],
          name2: ['粉煤灰', '矿渣', '偏高岭土'],
          name3: ['干混砂浆', '灌浆料', '胶粘剂'],
          name4: ['防水剂', '速凝剂' , '膨胀剂'],
        }, {
          name1: '水泥',
          name2: '外掺料',
          name3: '砂浆类',
          name4: '外加剂',
        }]
      }, {
        img: '/img/background/img/6.png',
        background: '/img/background/7/back1.png',
        name: '接单',
        baseA: 85,
        baseB: 22,
        height: 70,
        baseHeight: 88,
        card: [{name: '发单', clickUrl: '#/jiedan/jiedanCardList/问呗'}, {name: '接单', clickUrl: '#/jiedan/jiedanCardList/帮呗'}],
      }, {
        img: '/img/background/img/5.png',
        background: '/img/background/6/back1.png',
        name: '商城',
        baseA: 60,
        baseB: 9,
        height: 46,
        baseHeight: 85,
        min: true,
        card: [{name: '实验室建设', clickUrl: '/#/ShopPage/BuildMaterial/CardList/实验室建设'}, {name: '劳防用品', clickUrl: '/#/ShopPage/BuildMaterial/CardList/劳防用品'}, {name: '实验设备', clickUrl: '/#/ShopPage/BuildMaterial/CardList/实验设备'}, {name: '矿山设备', clickUrl: '/#/ShopPage/BuildMaterial/CardList/矿山设备'}, {name: '化学试剂', clickUrl: '/#/ShopPage/BuildMaterial/CardList/化学试剂'}, {name: '外加剂', clickUrl: '/#/ShopPage/BuildMaterial/CardList/外加剂'}, {name: '实验耗材', clickUrl: '/#/ShopPage/BuildMaterial/CardList/实验耗材'}, {name: '建材', clickUrl: '/#/ShopPage/BuildMaterial/CardList/建材'}],
        list: [{
          name1: ['溴', '萘', '铜片'],
          name2: ['培养皿', '离心管', '天平'],
          name3: ['移液器', '磁力搅拌器'],
          name4: ['口罩', '手套' , '防毒面具'],
        }, {
          name1: '化学试剂',
          name2: '实验耗材',
          name3: '实验设备',
          name4: '实验室建设及安防',
        }]
      }, {
        img: '/img/background/img/6.png',
        background: '/img/background/7/back1.png',
        name: '合作',
        baseA: 85,
        baseB: 22,
        height: 70,
        baseHeight: 88,
        card: [{name: '个人合作者'}, {name: '机构合作者'}],
        list: [{
          name1: ['高校', '科研院所', '检测机构'],
          name2: ['课题组', '教师', '学生']
        }, {
          name1: '机构合作者',
          name2: '个人合作者',
        }]
      }, {
        img: '/img/background/img/6.png',
        background: '/img/background/8/back.png',
        name: '我的',
        baseA: 170,
        baseB: 75,
        height: 50,
        baseHeight: 78,
        min: true,
        card: [{name: '客户', clickUrl: '#/MyPage/Information'}, {name: '订单及接单', clickUrl: '#/MyPage/Order'}, {name: '售后'}],
      }],
    };
  }
  componentDidMount () {
    const { params: { key } } = this.props;
    this.setState({
      // cardDatas: data[key],
      loading: false,
      Height: window.innerHeight - 220,
    });
    window.onresize = () => {
      this.setState({
        Height: window.innerHeight - 220,
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.key !== this.props.params.key) {
      this.setState({
        loading: true,
      });
      const { key } = nextProps.params;
      setTimeout(() => {
        this.setState({
          selectedTags: [],
          // cardDatas: data[key],
          loading: false,
        });
      }, 300);
    }
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
    const { selectedTags } = this.state;
    return (
      <div style={{ marginBottom: 20 }}>
        <h5 style={{ margin: '0px 8px 20px 10px', display: 'inline'  }}>分类导航:</h5>
        {tagsFromServer.map(tag => (
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
      <div style={{ marginLeft: 10 }}>搜索结果：</div>
      {searchDatas && searchDatas.length > 0 ?
        searchDatas.map((item, index) => (<Card {...this.props} type='search' data={item} key={index} />)) :
        <p style={{ margin: '30px 0px 30px 10px' }}>未查询到仪器</p>
      }
    </div>
  );
  // 全部、其他列表
  datasHtml = (cardDatas) => (<div>{cardDatas.map((item, index) => (<Card {...this.props} data={item} key={index} />))}</div>)
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
  // 记录表格
  TableFn = (TableData) => {
    const receiptColumns11 = [{
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    }, {
      title: 'site',
      dataIndex: 'site',
      key: 'site',
      width: 100,
    }, {
      title: 'device',
      dataIndex: 'device',
      key: 'device',
      width: 100,
    }, {
      title: 'sample',
      dataIndex: 'sample',
      key: 'sample',
      width: 100,
    }, {
      title: 'endTime',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 150,
    }, , {
      title: 'elt',
      key: 'elt',
      width: 100,
      render: (item) => <div><a>更多</a> <a>接单</a></div>
    }];
    const receiptColumns1 = [{
      title: 'father',
      dataIndex: 'father',
      key: 'father',
      width: '100',
      className: 'index_receipt_col1'
    },
    {
      title: 'list',
      dataIndex: 'list',
      key: 'list',
      width: '1100',
      className: 'index_receipt_col',
      render: (text) => {
        return <Table className="index_receipt_table1" bordered showHeader={false} pagination={false} columns={receiptColumns2} dataSource={text} />
      }
    }];
    const receiptColumns2 = [{
      title: 'father',
      dataIndex: 'father',
      key: 'father',
      width: '100',
      className: 'index_receipt_col2'
    },
    {
      title: 'list',
      dataIndex: 'list',
      key: 'list',
      width: '900',
      className: 'index_receipt_col',
      render: (text) => {
        return <Table className="index_receipt_table2" bordered showHeader={false} pagination={false} columns={receiptColumns11} dataSource={text} />
      }
    }];
    const receiptTableData = TableData;
    return <Table className="index_receipt_table3" bordered showHeader={false} pagination={false} columns={receiptColumns1} dataSource={receiptTableData} />
  }
  spellTable = (data, Json) => {
    const columns = Object.keys(data[0]).map(i => ({
      title: i,
      dataIndex: i,
      key: i,
      width: 100,
      className: 'index_spell_conten_list',
      render: (text) => {
        if (typeof(text) === 'string') {
          return text
        }
        return <div>
          {
            text.map((e, k) => <div key={k}>
              <span onClick={() => {window.location.href = `#/TabPageDetail/${e}`}} style={{cursor: 'pointer'}}>{e}</span>
            </div>)
          }
          <a href={`#/CardList/0-${Json[i]}`}>更多</a>
        </div>
      }
    }))
    return <Table bordered showHeader={false} pagination={false} columns={columns} dataSource={data} />
  }
  baomi = () => {
    return <div className="baomi">32</div>
  }
  TableListFn = () => {
    const { cardDatas, searchDatas, loading, searchType, receiptTableData, spellList, Height } = this.state;
    const { params: { key } } = this.props;
    let Dom = '';
    const Height2 = Height < 500 ? 500 : Height;
    const Rate = Height2 / 500;
    const Width2 = window.innerWidth < 1200 ? 1200 : window.innerWidth
    const Rate2 = Width2 / 1200;
    const spellFn = (spell, K, order) => {
      return <div className="index_spell" style={{height: `${Height2}px`, backgroundImage: `url(${window.imgSrc}${spell.background})`}}>
        <div className="index_spell_card">
          {
            spell.card.map((e, k) => {
              const a = parseInt(k / 2);
              const b = k % 2;
              const Height = spell.baseHeight * Rate + spell.baseA * a * Rate + spell.baseB * b * Rate;
              // debugger
              return (<div
                onClick={() => {
                  const UseData = GetCookie('UseData');
                  if ((e.clickUrl && !order) || (e.clickUrl && UseData)) {
                    window.location.href = e.clickUrl;
                  } else if (e.clickUrl && order && !UseData) {
                    message.warning('请先登录')
                  }
                }}
                key={k}
                style={b ? {bottom: `${Height}px`, right: !spell.min ? `${76 * Rate2}px` : `${37 * Rate2}px`, height: `${spell.height}px`} : {bottom: `${Height}px`, left: !spell.min ? `${76 * Rate2}px` : `${58 * Rate2}px`, textAlign: 'left', height: `${spell.height}px`}}
              >
                {
                  !b ? <div>
                    <h3>{e.name}</h3>
                    {
                      e.list ? e.list.map((e2, k2) => <p key={k2}>{e2}</p>) : null
                    }
                    >更多
                  </div> : null
                }
                <div style={{textAlign: !b ? 'left' : 'right'}}>
                  {
                    K + 1 !== 8 ? <img style={spell.min ? {height: '43px'} : null} src={`${window.imgSrc}/img/background/${K + 1}/${spell.card.length - k }.png`} /> : null
                  }
                </div>
                {
                  b ? <div>
                    <h3>{e.name}</h3>
                    {
                      e.list ? e.list.map((e2, k2) => <p key={k2}>{e2}</p>) : null
                    }
                    >更多
                  </div> : null
                }
              </div>)
            })
          }
        </div>
      </div>
    }
    switch(key) {
      case '1':
        Dom = spellFn(spellList[0], 0);
        break;
      case '2':
          Dom = spellFn(spellList[1], 1);
        break;
      case '3':
            Dom = spellFn(spellList[2], 2);
          break;
      case '4':
          Dom = spellFn(spellList[3], 3);
        break;
      case '5':
          Dom = spellFn(spellList[4], 4);
        break;
          // Dom = <div className="index_receipt">
          //   <div>
          //     <h3>我要接单</h3>
          //     <div>
          //       {
          //         this.TableFn(receiptTableData)
          //       }
          //     </div>
          //   </div>
          // </div>
          // break;
      case '6':
          Dom = spellFn(spellList[5], 5);
        break;
      case '7':
            Dom = spellFn(spellList[6], 6);
          break;
      case '8':
          Dom = spellFn(spellList[7], 7, 'order');
        break;
      case '9':
          // Dom = this.baomi();
          Dom = baomiFn();
        break;  
      default:
        Dom = ''
    }
    return Dom;
  }
  render() {
    const { cardDatas, searchDatas, loading, searchType } = this.state;
    return (<div id="tab-page">
      {this.TableListFn()}
    </div>);
  }
}

export default TabPage;
