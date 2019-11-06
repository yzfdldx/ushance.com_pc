import React, { Component } from 'react';
import {
  Spin, Tabs, Steps, Collapse, Icon, Input, Tag, Alert,
  Button, Form, Checkbox, Timeline, message, Col, InputNumber,
  Radio, Select
} from 'antd';

const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;
const { Panel } = Collapse;
import reqwest from 'reqwest';
import './tabPageDetail.less';
import Fun from 'yzflhez-js-function';
const { GetCookie, SetCookie } = Fun;
import AddressModel from './addressModel';

const Div = (e) => {
  return <table>{e.children}</table>;
}

class TabPageDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: '',
      init: null,
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
      otherList: ['俄歇谱', '价带谱', '刻蚀(小于5nm)'],
      // 需要测试的参数
      test_parameter2: {
        1: {
          title: '样品',
          list: {
            1: {
              title: '样品数量',
              inputType: 'input', // checkbox input radio
              price: 1,
              defaultValue: 1,
              // stepType: 'state', // step相加 state相乘
            },
            2: {
              title: '样品形态',
              inputType: 'radio',
              defaultValue: '粉末态',
              // stepType: 'step',
              keyToValue: [{
                key: '粉末态',
                title: '粉末态',
                price: 1,
              }, {
                key: '块状',
                title: '块状',
                price: 1.2,
              }, {
                key: '薄膜',
                title: '薄膜',
                price: 1.5,
              }]
            },
            3: {
              title: '样品尺寸',
              inputType: 'radio',
              defaultValue: '5%以上',
              // stepType: 'step',
              keyToValue: [{
                key: '5%以上',
                title: '5%以上',
                price: 1,
              }, {
                key: '1%-5%',
                title: '1%-5%',
                price: 1.2,
              }, {
                key: '0.5%-1%',
                title: '0.5%-1%',
                price: 1.5,
              }, {
                key: '0.5%一下另议',
                title: '0.5%一下另议',
                price: 2,
              }]
            },
            4: {
              title: '含有成分',
              inputType: 'checkbox',
              defaultValue: ['Fe'],
              // stepType: 'step',
              keyToValue: [{
                key: 'H',
                title: 'H',
                price: 10,
              }, {
                key: 'Fe',
                title: 'Fe',
                price: 1.2,
              }]
            },
            5: {
              title: '不含成分',
              inputType: 'checkbox',
              defaultValue: ['H'],
              // stepType: 'step',
              keyToValue: [{
                key: 'H',
                title: 'H',
                price: 10,
              }, {
                key: 'Fe',
                title: 'Fe',
                price: 1.2,
              }]
            },
          }
        },
        2: {
          title: '元素',
          list: {
            1: {
              title: '元素数量',
              inputType: 'input', // checkbox input radio
              price: 1,
              defaultValue: 1,
              // stepType: 'state', // step相加 state相乘
            },
            2: {
              title: '元素种类',
              inputType: 'input', // checkbox input radio
              price: 1,
              defaultValue: 1,
              // stepType: 'state', // step相加 state相乘
            },
            3: {
              title: '微量元素',
              inputType: 'checkbox',
              defaultValue: ['S'],
              // stepType: 'step',
              keyToValue: [{
                key: 'H',
                title: 'H',
                price: 10,
              }, {
                key: 'S',
                title: 'S',
                price: 10,
              }, {
                key: 'Fe',
                title: 'Fe',
                price: 3,
              }]
            },
          }
        },
        3: {
          title: '其它',
          list: {
            1: {
              title: '其它要求',
              inputType: 'radio',
              defaultValue: '俄歇谱',
              // stepType: 'step',
              keyToValue: [{
                key: '俄歇谱',
                title: '俄歇谱',
                price: 1,
              }, {
                key: '价带谱',
                title: '价带谱',
                price: 1.2,
              }, {
                key: '刻蚀(小于5nm)',
                title: '刻蚀(小于5nm)',
                price: 2,
              }]
            },
          }
        }
      },
      test_parameter: {},
      // 提交的数据
      parameter: {},
      userAddressLIst: [], // 用户地址
      SelectVal: undefined,
      User: null,
      loading: false,
      AddressModelVisible: false,
      AddressModelonoff: () => {},
    };
  }
  componentDidMount () {
    const { params: { name } } = this.props;
    let User = GetCookie('UseData');
    if (User) {
      User = JSON.parse(User)
    } else {
      User = {};
    }
    this.setState({
      loading: true,
      id: name,
      User
    }, () => {
      this.getAddressFn()
    });
    reqwest({
      url: `${window.imgSrc}/web/index/my/getDeviceList.json`, // https://www.ushance.com
      method: 'get',
      data: {
        id: name
      },
      success: (res) => {
        this.setState({
          loading: false,
        });
        if (res.result === 'succeed') {
          if (res.data && res.data[0] && res.data[0].parameter) {
            this.setState({
              init: {
                ...res.data[0],
                parameter: res.data[0].parameter ? JSON.parse(res.data[0].parameter) : '',
              },
              test_parameter: res.data[0].test_parameter ? JSON.parse(res.data[0].test_parameter) : {},
            });
          }
        } else {
          message.error(res.message || '请求异常');
        }
      }
    })
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
  getAddressFn = () => { // 获取地址列表
    const { User } = this.state;
    this.setState({
      loading: true,
    });
    if (!User.USE_ID) {
      message.error('请先登录');
    } else {
      reqwest({
        url: `${window.imgSrc}/web/index/my/getAddress.json`, // https://www.ushance.com
        method: 'get',
        data: {
          id: User.USE_ID,
        },
        success: (res) => {
          this.setState({
            loading: false,
          });
          if (res.result === 'succeed') {
            if (res.data && res.data.length) {
              let SelectVal = JSON.stringify({
                address: res.data[0].address,
                default: res.data[0].default,
                detail: res.data[0].detail,
                name: res.data[0].name,
                phone: res.data[0].phone
              });
              res.data.forEach((e, k) => {
                if (e.default && k) {
                  SelectVal = JSON.stringify({
                    address: e.address,
                    default: e.default,
                    detail: e.detail,
                    name: e.name,
                    phone: e.phone
                  });
                }
              })
              this.setState({
                userAddressLIst: res.data,
                SelectVal,
              });
            } else {
              message.error('您还没有地址，去添加地址');
              setTimeout(() => {
                window.location.href = '#/MyPage/Adress';
              }, 1000);
            }
          } else {
            message.error(res.message || '请求异常');
          }
        }
      })
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
  pre = (k, current, e) => { // 上一步
    const { spellList } = this.state;
    e.current = e.current - 1;
    this.setState({
      spellList
    });
    // this.props.form.validateFields((err, values) => {
    //   if (!err && values) {
    //     const { spellList } = this.state;
    //     e.current = e.current - 1;
    //     this.setState({
    //       spellList
    //     }, () => {
    //       this.valueFn(k, current, e, values)
    //     });
    //   }
    // });
  }
  next = (k, current, e) => { // 下一步
    this.props.form.validateFields((err, values) => {
      if (!err && values) {
        const { spellList } = this.state;
        e.current = e.current + 1;
        this.setState({
          spellList
        }, () => {
          this.valueFn(k, current, e, values)
        });
      }
    });
  }
  valueFn = (k, current, e, values) => {
    const { test_parameter, parameter } = this.state;
    const { getFieldValue } = this.props.form;
    // console.log(k, current, e, values, test_parameter)
    // debugger
    if (!parameter[`${k}`]) {
      parameter[`${k}`] = {
        title: `分组${k}`,
        price: 0,
      };
    }
    Object.keys(values).forEach(item => {
      if (item === 'fz') { // 分组数量
        let Num = parseFloat(values[item]);
        Num = Num !== NaN ? Num : 1;
        parameter[`${k}`].number = Num;
      } else {
        try {
          const Arr = item.split('_');
          const Json = test_parameter[Arr[1]];
          const showTitle = getFieldValue(`${k}_${e.current}`);
          let Data = {};
          if (Json && Json.inputType === 'radio' && showTitle) {
            Data = Json[showTitle];
          } else if (Json && Json.inputType === 'radio') {
            Data = {};
          } else if (Json && Json.list) {
            Data = Json ? Json.list : {};
          }
          if (Arr[1] && Arr[2] && Data[Arr[2]]) {
            const Item = Data[Arr[2]];
            if (Item.inputType === 'input') {
              let Num = parseFloat(values[item]);
              Num = Num !== NaN ? Num : 1;
              let price = parseFloat(Item.price);
              price = price !== NaN ? price : 1;
              parameter[`${k}`][Item.title] = Num;
              parameter[`${k}`][`${Item.title}_price`] = Num * price;
            } else if (Item.inputType === 'text') {
              let price = parseFloat(Item.price);
              price = price !== NaN ? price : 1;
              parameter[`${k}`][Item.title] = values[item];
              parameter[`${k}`][`${Item.title}_price`] = price;
            } else if (Item.inputType === 'word') {
              if (!parameter[`${k}`][Item.title]) {
                let price = parseFloat(Item.price);
                price = price !== NaN ? price : 1;
                parameter[`${k}`][Item.title] = values[item];
                parameter[`${k}`][`${Item.title}_price`] = price;
              } else {
                parameter[`${k}`][Item.title] += `, ${values[item]}`;
              }
            } else {
              let price = 0;
              values[item].forEach(val => {
                let price2 = Item.keyToValue.find(e => e.key === val);
                price2 = parseFloat(price2 ? price2.price : 0);
                price2 = price2 !== NaN ? price2 : 0;
                price += price2;
              })
              parameter[`${k}`][Item.title] = values[item];
              parameter[`${k}`][`${Item.title}_price`] = price;
            }
          }
        } catch (error) {
          //
        }
      }
    });
    let price = 0;
    Object.keys(parameter[`${k}`]).forEach(item => {
      if (item.includes('_price')) {
        price += parameter[`${k}`][item];
      }
    });
    price = price * parameter[`${k}`].number;
    parameter[`${k}`].price = price;
    this.setState({
      parameter: JSON.parse(JSON.stringify(parameter)),
    });
  }
  calFn = () => {
    this.props.form.resetFields();
    history.go(-1);
  }
  pay = () => {
    const { init, parameter, SelectVal, User } = this.state;
    if (!init) {
      message.error('请选择仪器');
    } else {
      const cook = window.shebeiOrder;
      let Json = {};
      try {
        Json = cook ? cook : {};
      } catch (error) {
        //
      }
      try {
        this.setState({
          AddressModelVisible: true,
          AddressModelonoff: (address) => {
            Json[`${User.USE_ID}_${init.id}`] = {
              ID: User.USE_ID,
              NAME: User.USE_NAME,
              ADDRESS: address,
              GIVE_ID: init.USE_ID,
              payment: 0,
              type: 0,
              device_id: init.id,
              device_name: init.name,
              number: 1,
              test_parameter: JSON.stringify(parameter ? parameter : {})
            }
            window.shebeiOrder = Json
            window.location.href = `#/shebei/Order/buy/${User.USE_ID}_${init.id}`;
          }
        });
      } catch (error) {
        window.shebeiOrder = {},
        message.error('代码处理出现问题，请再点击试一试');
      }
    }
  }
  Loadpay = () => {
    const { init, parameter, SelectVal, User } = this.state;
    this.setState({
      AddressModelVisible: true,
      AddressModelonoff: (address) => {
        this.setState({
          loading: true,
        })
        reqwest({
          url: `${window.imgSrc}/web/index/my/order/addOrder.json`,
          method: 'get',
          data: {
            ID: User.USE_ID,
            NAME: User.USE_NAME,
            ADDRESS: address,
            GIVE_ID: init.USE_ID,
            payment: 0,
            type: 0,
            device_id: init.id,
            device_name: init.name,
            number: 1,
            test_parameter: JSON.stringify(parameter ? parameter : {})
          },
          success: (res) => {
            this.setState({
              loading: false,
            })
            if (res.result === 'succeed') {
              message.success('下单成功');
              setTimeout(() => {
                window.location.href = '#/MyPage/Order';
              }, 1000)
            } else {
              message.error(res.message || '请求异常');
            }
          }
        })
      }
    })
  }
  AddressModelBack = (address) => {
    const { AddressModelonoff } = this.state;
    if (AddressModelonoff) AddressModelonoff(address);
  }
  test_parameterHtml = (test_parameter, parameter, e, k) => {
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    if (test_parameter && test_parameter[e.current + 1]) {
      const Json = test_parameter[e.current + 1];
      const showTitle = getFieldValue(`${k}_${e.current + 1}`);
      let Data = {};
      if (Json.inputType === 'radio' && showTitle) {
        Data = Json[showTitle];
      } else if (Json.inputType === 'radio') {
        Data = {};
      } else if (Json.list) {
        Data = Json.list;
      }
      return Object.keys(Data).map((K) => {
        const Item = Data[K];
        if (Item.inputType !== 'word') {
          let inputType = <Input placeholder={`请输入${Item.title}`} onClick={(e)=>{e.stopPropagation()}} size="small" style={{width: '250px'}} />
          let selectLIst = null;
          let showTitle = null;
          if (Item.inputType === 'radio' && Item.keyToValue) {
            inputType = <Checkbox.Group style={{ display: 'none' }}>
              {
                Item.keyToValue.map((e2, k2) => <Checkbox key={k2} style={{marginBottom: '8px'}} value={e2.key}>{e2.title}</Checkbox>)
              }
            </Checkbox.Group>;
            selectLIst = Item.keyToValue;
            showTitle = getFieldValue(`${k}_${e.current + 1}_${K}`); // 选择的值
          } else if (Item.inputType === 'checkbox' && Item.keyToValue) { 
            inputType = <Checkbox.Group style={{ display: 'none' }}>
              {
                Item.keyToValue.map((e2, k2) => <Checkbox key={k2} style={{marginBottom: '8px'}} value={e2.key}>{e2.title}</Checkbox>)
              }
            </Checkbox.Group>;
            selectLIst = Item.keyToValue;
            showTitle = getFieldValue(`${k}_${e.current + 1}_${K}`); // 选择的值
          } else if (Item.inputType === 'input') {
            inputType = <InputNumber placeholder={`请输入${Item.title}`} onClick={(e)=>{e.stopPropagation()}} size="small" style={{width: '100px'}} />
          }
          let initVal = undefined;
          if (parameter && parameter[k] && parameter[k][Item.title]) {
            showTitle = getFieldValue(`${k}_${e.current + 1}_${K}`);
            if (!showTitle) {
              initVal = parameter[k][Item.title];
              setTimeout(() => {
                const Json = {};
                Json[`${k}_${e.current + 1}_${K}`] = initVal;
                setFieldsValue(Json)
              }, 200)
            }
          }
          // debugger
          return (<Timeline.Item key={K}>
            <Form.Item label={Item.title} style={{ position: 'relative' }}>
              {getFieldDecorator(`${k}_${e.current + 1}_${K}`, {
                rules: [{ required: true, message: `请${Item.inputType === 'radio' || Item.inputType === 'checkbox' ? '选择' : '输入'}${Item.title}` }],
                // initialValue: Item.defaultValue ? Item.defaultValue : undefined,
                // initialValue: initVal
              })(inputType)}
              {
                Item.afterTitle ? <div style={{ position: 'absolute', top: '-2px', left: '104px', width: '500px' }}>
                  {Item.afterTitle}  
                </div> : null
              }
            </Form.Item>
            <div>
              {
                selectLIst && Item.inputType === 'radio' ? selectLIst.map((e2, k2) => <Tag
                  key={k2}
                  style={{marginBottom: '8px'}}
                  color={showTitle && showTitle.length && typeof(showTitle) === 'object' && showTitle.find(e3 => e3 === e2.key) ? '#1890ff' : 'gold'}
                  onClick={() => {
                    const Json = {};
                    showTitle = showTitle ? [] : [];
                    showTitle.push(e2.key);
                    Json[`${k}_${e.current + 1}_${K}`] = showTitle;
                    setFieldsValue(Json)
                  }}
                >{e2.title}</Tag>) : null
              }
              {
                selectLIst && Item.inputType === 'checkbox' ? selectLIst.map((e2, k2) => <Tag
                  key={k2}
                  style={{marginBottom: '8px'}}
                  color={showTitle && showTitle.find(e3 => e3 === e2.key) ? '#1890ff' : 'gold'}
                  onClick={() => {
                    const Key = showTitle && showTitle.findIndex(e3 => e3 === e2.key);
                    const Json = {};
                    if ((Key && Key !== -1) || Key === 0) {
                      showTitle.splice(Key, 1);
                      Json[`${k}_${e.current + 1}_${K}`] = showTitle;
                      setFieldsValue(Json);
                    } else {
                      showTitle = showTitle ? showTitle : [];
                      showTitle.push(e2.key);
                      Json[`${k}_${e.current + 1}_${K}`] = showTitle;
                      setFieldsValue(Json);
                    }
                  }}
                >{e2.title}</Tag>) : null
              }
            </div>
            {
              showTitle && Item.inputType === 'radio' ? <Alert message={`待测${Item.title}: ${showTitle}`} type="warning" /> : null
            }
            {
              showTitle && Item.inputType === 'checkbox' ? <Alert message={`待测${Item.title}: ${showTitle.join(', ')}`} type="warning" /> : null
            }
          </Timeline.Item>)
        } else {
          const inputType = <InputNumber placeholder={`请输入`} onClick={(e)=>{e.stopPropagation()}} size="small" style={{width: '100px'}} />
          const textType = <Input placeholder={`请输入`} onClick={(e)=>{e.stopPropagation()}} size="small" style={{width: '100px'}} />
          Item.title
          let textLIst = [];
          try {
            textLIst = Item.title.split('text');
          } catch (error) {
            //
          }
          let initVal = undefined;
          if (parameter && parameter[k] && parameter[k][Item.title]) {
            initVal = parameter[k][Item.title].split(', ');
          }
          return (<Timeline.Item key={K}>
            {
              textLIst.map((text, textk) => {
                if (initVal) {
                  const showTitle = getFieldValue(`${k}_${e.current + 1}_${K}_${textk}`);
                  if (!showTitle) {
                    const Val = initVal[textk];
                    setTimeout(() => {
                      const Json = {};
                      Json[`${k}_${e.current + 1}_${K}_${textk}`] = Val;
                      setFieldsValue(Json)
                    }, 200)
                  }
                }
                return <span key={textk}>
                  {text}
                  {
                    textLIst.length !== textk + 1 ? <Form.Item style={{ marginRight: '0' }}>
                      {getFieldDecorator(`${k}_${e.current + 1}_${K}_${textk}`, {
                        rules: [{ required: true, message: `请输入` }],
                      })(textType)}
                    </Form.Item> : null
                  }
                </span>
              })
            }
          </Timeline.Item>)
        }
      })
    }
    return null
  }
  addressChange = e => {
    this.setState({
      SelectVal: e,
    });
  }
  radioChange = (k, i, e) => {
    const {
      test_parameter, parameter,
    } = this.state;
    const { getFieldValue, resetFields } = this.props.form;
    const showTitle = getFieldValue(`${k}_${i + 1}`);
    resetFields();
    try {
      const Json = {};
      const par = test_parameter[i + 1][showTitle];
      Object.keys(parameter[k]).forEach(e => {
        const aa = Object.keys(par).find(e2 => par[e2].title === e || `${par[e2].title}_price` === e);
        if (!aa) {
          Json[e] = parameter[k][e];
        }
      });
      parameter[k] = Json;
      this.setState({
        parameter,
      }, () => {
        this.savePriceAll(k);
      })
    } catch (error) {
      //
    }
  }
  savePriceAll = (k) => {
    const {
      parameter,
    } = this.state;
    let price = 0;
    Object.keys(parameter[k]).forEach(e => {
      if (e !== 'number' && e !== 'price' && e !== 'title' && e.includes('_price')) {
        price += parseFloat(parameter[k][e])
      }
    });
    parameter[k].price = price;
    this.setState({
      parameter,
    })
  }
  render() {
    const { cardDatas, searchDatas, loading, searchType } = this.state;
    // 预约
    const {
      id, init,
      spellList,
      TagList, typeList, sizeList, otherList,
      test_parameter, parameter,
      userAddressLIst, SelectVal,
      AddressModelVisible
    } = this.state;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };
    let Allprice = 0;
    if (parameter) {
      Object.keys(parameter).forEach(e => {
        if (parameter[e].price) {
          Allprice += parameter[e].price;
        }
      })
    }
    const payOnoffon = () => {
      let onoff = false;
      if (spellList) {
        spellList.forEach(e => {
          if (!test_parameter || Object.keys(test_parameter).length <= e.current) {
            onoff = true;
          }
        });
      }
      return onoff
    }
    const payOnoff = payOnoffon();
    return (<div id="tab-page-detail">
      {
        AddressModelVisible ? <AddressModel userAddressLIst={userAddressLIst} SelectVal={SelectVal} visibleFn={()=>{this.setState({AddressModelVisible: false})}} backFn={this.AddressModelBack}/> : null
      }
      <Spin spinning={loading}>
        <div className="title">
        {
          init ? init.name : ''
        }
        <Button style={{verticalAlign: 'top', marginLeft: '16px'}} onClick={this.addSpellList} type="primary">新增分组</Button>
      </div>
        <div className="tab-page-spell">
          <Form layout="inline">
          {
            spellList.map((e, k) => {
              return (<Collapse
                defaultActiveKey={['0']}
                bordered={false}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel
                  header={<div>
                    <Form.Item label={`第${k + 1}组 - 样品数量`}>
                      {getFieldDecorator(`fz`, {
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
                    {
                      test_parameter ? Object.keys(test_parameter).map((k2, i2) => {
                        return <Step
                          title={<div>
                            {
                              test_parameter[k2] && test_parameter[k2].inputType === 'radio' ? <Form.Item label={test_parameter[k2].title}>
                              {getFieldDecorator(`${k}_${i2 + 1}`, {
                                rules: [{ required: true, message: `请选择` }],
                                initialValue: test_parameter[k2].keyToValue && test_parameter[k2].keyToValue[0] ? test_parameter[k2].keyToValue[0].key : undefined
                              })(<Radio.Group onChange={this.radioChange.bind(this, k, i2)}>
                                {
                                  test_parameter[k2].keyToValue.map((e2, k2) => <Radio key={k2} style={{marginBottom: '8px'}} value={e2.key}>{e2.title}</Radio>)
                                }
                              </Radio.Group>)}</Form.Item> : test_parameter[k2].title
                            }
                          </div>}
                          key={k2}
                        />
                      }) : null
                    }
                    <Step title="阅览" />
                  </Steps>
                  <div className="tab_page_detail_Timeline" style={test_parameter && Object.keys(test_parameter).length > e.current ? null : {display: 'none'}}>
                    <Timeline>
                      {
                        this.test_parameterHtml(test_parameter, parameter, e, k)
                      }
                    </Timeline>
                  </div>
                  <div className="tab_page_detail_Timeline" style={test_parameter && Object.keys(test_parameter).length > e.current ? {display: 'none'} : null}>
                    <div>
                      {
                        test_parameter ? Object.keys(test_parameter).map((Tkey, TK) => {
                          const Json = test_parameter[Tkey];
                          const showTitle = getFieldValue(`${k}_${TK + 1}`);
                          let Data = {};
                          if (Json && Json.inputType === 'radio' && showTitle) {
                            Data = Json[showTitle];
                          } else if (Json && Json.inputType === 'radio') {
                            Data = {};
                          } else if (Json && Json.list) {
                            Data = Json ? Json.list : {};
                          }
                          return (<table style={{ width: '100%' }} className="tab_page_detail_Timeline_result" key={Tkey}>
                            <tr style={{ marginBottom: '12px' }}>
                              <td span={6} style={{ width: '20%' }} className="tab_page_detail_Timeline_result_Col">{Tkey}.{test_parameter[Tkey].title}</td>
                              <td span={18} style={{ width: '80%' }}>
                                {
                                  Data ? Object.keys(Data).map((key2, k2) => {
                                    const Item = Data[key2];
                                    let str = '暂无';
                                    if (parameter && parameter[k]) {
                                      if (parameter[k][Item.title] && typeof(parameter[k][Item.title]) === 'object') {
                                        try {
                                          str = parameter[k][Item.title].join(', ');
                                        } catch (error) {
                                         // 
                                        }
                                      } else if (parameter[k][Item.title]) {
                                        str = parameter[k][Item.title];
                                      }
                                    }
                                    let title = Item ? Item.title : '';
                                    if (Item && Item.inputType === 'word') {
                                      title = title.split('text').join('*')
                                    }
                                    return <Col span={24} style={k ? { paddingTop: '12px' } : null} key={k2}>
                                      <Col span={8} offset={1} className="tab_page_detail_Timeline_result_Col tab_page_detail_Timeline_result_Col_mar">{key2}) {title}</Col>
                                      <Col span={14} offset={1} className="tab_page_detail_Timeline_result_Col tab_page_detail_Timeline_result_Col_mar">
                                        { str }
                                      </Col>
                                    </Col>
                                  }) : null
                                }
                              </td>
                            </tr>
                          </table>)
                        }) : null
                      }
                    </div>
                    <Alert message={`本组测试价格价格为${parameter[k] && parameter[k].price ? parameter[k].price.toFixed(2) : 0}元`} type="warning" />
                  </div>
                  {
                    test_parameter && Object.keys(test_parameter).length > e.current ? <div style={{ textAlign: 'center' }}>
                      <Button disabled={!e.current} onClick={this.pre.bind(this, k, e.current, e)} type="primary" style={{ marginRight: '32px' }}>上一步</Button>
                      <Button onClick={this.next.bind(this, k, e.current, e)} type="primary">下一步</Button>
                    </div> : <div style={{ textAlign: 'center' }}>
                      <Button onClick={this.pre.bind(this, k, e.current, e)} type="primary" style={{ marginRight: '32px' }}>上一步</Button>
                      <Button disabled type="primary">下一步</Button>
                    </div>
                  }
                </Panel>
              </Collapse>)})
          }
          </Form>
          <Alert message={`本次测试一共需要${Allprice ? Allprice.toFixed(2) : 0}元`} type="success" />
          <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '16px' }}>
            <Button disabled={!payOnoff ? true : false} onClick={this.Loadpay} type="primary" style={{ marginRight: '32px' }}>去下单</Button>
            <Button disabled={!payOnoff ? true : false} onClick={this.pay} type="primary" style={{ marginRight: '32px' }}>去支付</Button>
            <Button onClick={this.calFn}>返回</Button>
          </div>
        </div>
      </Spin>
    </div>);
  }
}

const TabPageDetailForm = Form.create()(TabPageDetail);
export default TabPageDetailForm;
