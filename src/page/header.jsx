import React from 'react';
import './index.less';
import { Input, Tabs  } from 'antd';

const { Search } = Input;
const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      TabPaneList: [
        {key: '1', title:'材料测试'},
        {key: '2', title:'生物测试'},
        {key: '3', title:'环境检测'},
        {key: '4', title:'科研绘图'},
        {key: '5', title:'模拟计算'},
        {key: '6', title:'数据分析'},
        {key: '7', title:'论文润色'},
        {key: '8', title:'纳米商城'},
      ]
    };
  }
  componentDidMount () {
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
      console.log('up', scrollTo)
    }
    function downScroll(){
      const scrollTo = getScrollTop()
      console.log('down', scrollTo)
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
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const { TabPaneList } = this.state;
    const { children } = this.props;
    return (<div className="appHeader">
      <div className="appHeader_ad">
        <div className="appHeader_ad_left">
          <div>首页</div>
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
          <img src="//statics.shiyanjia.com/c/2018/images/newhead09/logo.svg"/>
        </div>
        <div className="appHeader_search_right">
          <Search placeholder="例：场发射电子显微镜" enterButton />
        </div>
      </div>
      <div className="appHeader_tab">
        <Tabs defaultActiveKey="1" >
          {
            TabPaneList.map(e => <TabPane tab={e.title} key={e.key}/>)
          }
        </Tabs>
      </div>
    </div>);
  }
}

export default App;
