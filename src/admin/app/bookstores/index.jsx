import React from 'react';
import './index.less';
import Header from './head/index.jsx';
import { Grid } from 'antd-mobile';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bookshelf: {
        "7094": {
          author: "二十二刀流 / 著",
          id: "7094",
          img: "https://img.xiashutxt.com/cover/7/7094.jpg",
          name: "末世大回炉"
        },
        "246311": {
          author: "许你万水千山 / 著",
          id: "246311",
          img: "https://img.xiashutxt.com/cover/246/246311.jpg",
          name: "末世之最强军团"
        },
        "15280": {
          author: "无言123 / 著",
          id: "15280",
          img: "https://img.xiashutxt.com/cover/15/15280.jpg",
          name: "校园修仙"
        },
      }
    };
  }
  static getDerivedStateFromProps(nextProps, nextState){
    return null
  }
  componentDidMount () {
    // console.log('componentDidMount', this.props, this.state)
  }
  openFn = (val) => {
    const { bookshelf } = this.state;
    const Url = '/preview.html?' + escape(`page=${val.page ? val.page : '1'}&id=${val.id}&name=${val.name}&author=${val.author}&img=${val.img}`);
    window.location.href = Url;
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const { bookshelf } = this.state;
    // console.log('render')
    return (<div className="bookstores" onClick={this.onClick}>
      <Header />
      <h4 className="bookstores_Recommend">好书推荐</h4>
      <Grid
        data={bookshelf ? Object.keys(bookshelf).map(e => ({
          icon: bookshelf[e] && bookshelf[e].img ? bookshelf[e].img : 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
          text: bookshelf[e].name,
          ...bookshelf[e]
        })) : []}
        square={false}
        className="not-square-grid"
        onClick={this.openFn}
      />
    </div>);
  }
}

export default App;
