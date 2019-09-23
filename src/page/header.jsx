import React from 'react';
import './index.less';
import { Input, Tabs  } from 'antd';
// import { browserHistory } from 'react-router';
const { Search } = Input;
const { TabPane } = Tabs;
import LoadModel from './loadModel.jsx';
import RegisterModel from './registerModel.jsx';

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

const SetCookie = (name, value, expiredays) => { // 设置cookie
  const exdate = new Date();
  // exdate.setDate(exdate.getDate() + expiredays);
  exdate.setTime(exdate.getTime() + expiredays);
  // name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString())
  document.cookie = `${name}=${escape(value)}` +
  `${(expiredays == null) ? '' : ';expires='}` +
  `${exdate.toGMTString()}`;
};

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      TabPaneList: [
        {key: '1', title:'设备共享', imgUrl: '/img/head/tab1.png', imgUrlSelect: '/img/head/tab1-1.png'},
        {key: '2', title:'仿真模拟', imgUrl: '/img/head/tab2.png', imgUrlSelect: '/img/head/tab2-1.png'},
        {key: '3', title:'数据分析', imgUrl: '/img/head/tab3.png', imgUrlSelect: '/img/head/tab3-1.png'},
        {key: '4', title:'建材检测', imgUrl: '/img/head/tab4.png', imgUrlSelect: '/img/head/tab4-1.png'},
        {key: '5', title:'我要接单', imgUrl: '/img/head/tab5.png', imgUrlSelect: '/img/head/tab5-1.png'},
        {key: '6', title:'商城', imgUrl: '/img/head/tab6.png', imgUrlSelect: '/img/head/tab6-1.png'},
        {key: '7', title:'合作', imgUrl: '/img/head/tab7.png', imgUrlSelect: '/img/head/tab7-1.png'},
        {key: '8', title:'我的', imgUrl: '/img/head/tab8.png', imgUrlSelect: '/img/head/tab8-1.png'},
      ],
      value: null,
      LoadModelVisible: false,
      LoadModelData: null,
      RegisterModelVisible: false,
    };
  }
  componentDidMount () {
    const UseData = GetCookie('UseData');
    // console.log('UseData', UseData)
    if (UseData) {
      try {
        SetCookie('UseData', UseData, 60 * 60 * 1000)
        this.setState({
          LoadModelData: JSON.parse(UseData),
        });
      } catch (error) {
        //
      }
    }
    this.init(this.props)
    function getScrollTop() {
      var scrollTop = 0;
      if(document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if(document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    }
    function upScroll(){
      const scrollTo = getScrollTop()
     //  console.log('up', scrollTo)
    }
    function downScroll(){
      const scrollTo = getScrollTop()
      // console.log('down', scrollTo)
    }
  
     var scrollFunc = function (e) { 
        e = e || window.event;
        if (e.wheelDelta) { //第一步：先判断浏览器IE，谷歌滑轮事件    
         if (e.wheelDelta > 0) { //当滑轮向上滚动时 
    //       console.log("滑轮向上滚动"); 
          upScroll()
         } 
         if (e.wheelDelta < 0) { //当滑轮向下滚动时 
    //       console.log("滑轮向下滚动"); 
          downScroll()
        } 
        } else if (e.detail) { //Firefox滑轮事件 
         if (e.detail> 0) { //当滑轮向上滚动时 
    //       console.log("滑轮向上滚动"); 
          upScroll()
         } 
         if (e.detail< 0) { //当滑轮向下滚动时 
            downScroll()
         } 
        } 
     }
     //给页面绑定滑轮滚动事件 
     if (document.addEventListener) {//firefox 
      document.addEventListener('DOMMouseScroll', scrollFunc, false); 
     } 
     //滚动滑轮触发scrollFunc方法 //ie 谷歌 
     window.onmousewheel = document.onmousewheel = scrollFunc;
  }
  componentWillReceiveProps (next) {
    this.init(next)
  }
  init = (next) => {
    const { params: { key } } = next;
    this.setState({
      value: key,
    })
  }
  tabChange = (key) => {
    this.setState({
      value: key,
    })
    location.hash = `/TabPage/${key}`;
  }
  loadBackFn = (e) => {
    delete e.USE_PASSWORD;
    this.setState({LoadModelData:e});
    const Da = JSON.stringify(e);
    SetCookie('UseData', Da, 60 * 60 * 1000)
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const {
      TabPaneList, value,
      LoadModelVisible, LoadModelData,
      RegisterModelVisible
    } = this.state;
    const { children, params } = this.props;
    return (<div className="appHeader">
      <div>
        <div className="appHeader_ad" style={{display: 'none'}}>
          <div className="appHeader_ad_left">
            <div onClick={() => {window.location.href = "#/index"}}>首页</div>
            <div>关注公众号</div>
            <div>关于我们</div>
            <div>服务方入驻</div>
            <div>热线：1234214432</div>
          </div>
          <div className="appHeader_ad_right">
            <div>
              <span>注册 </span>
              /
              <span> 登录</span>
            </div>
            <div>实验家俱乐部</div>
          </div>
        </div>
        <div className="appHeader_search">
          <div className="appHeader_search_left">
            <img onClick={() => {window.location.href = "#/index"}} src={`${window.imgSrc}/img/head/logo.png`}/>
            {/* <img onClick={() => {window.location.href = "#/index"}} src="//statics.shiyanjia.com/c/2018/images/newhead09/logo.svg"/> */}
          </div>
          <div className="appHeader_buttom">
            {
              TabPaneList.map(e => <div
                onClick={this.tabChange.bind(this, e.key)}
                key={e.key}
                className={value === e.key ? 'appHeader_buttom_selected' : ''}
              >
                <img src={`${window.imgSrc}${value !== e.key ? e.imgUrl : e.imgUrlSelect}`} /><br/>
                {e.title}
              </div>)
            }
          </div>
          <div className="appHeader_search_right">
            <Search size="small" placeholder="例：场发射电子显微镜" enterButton />
          </div>
          <div className="appHeader_search_load">
            {
              LoadModelData ? <span>
                <span style={{color: 'rgb(255, 192, 0)'}}>
                  {LoadModelData.USE_NAME}
                </span>
                <span> / </span>
                <span onClick={()=>{this.setState({LoadModelData: null}); SetCookie('UseData', '', 100)}}>退出</span>
              </span> : <span>
                <span onClick={()=>{this.setState({LoadModelVisible: true})}}>
                  登录
                </span>
                <span> / </span>
                <span onClick={()=>{this.setState({RegisterModelVisible: true})}}>注册</span>
              </span>
            }
          </div>
        </div>
        <div className="appHeader_tab" style={{display: 'none'}}>
        <Tabs onChange={this.tabChange} activeKey={value} defaultActiveKey={params.key || ''}>
          {
            TabPaneList.map(e => <TabPane tab={e.title} key={e.key} />)
          }
        </Tabs>
      </div>
      </div>
      {
        LoadModelVisible ? <LoadModel backFn={this.loadBackFn} visibleFn={(e) => {this.setState({LoadModelVisible: false})}} /> : null
      }
      {
        RegisterModelVisible ? <RegisterModel backFn={this.loadBackFn} visibleFn={(e) => {this.setState({RegisterModelVisible: false})}} /> : null
      }
    </div>);
  }
}

export default App;
