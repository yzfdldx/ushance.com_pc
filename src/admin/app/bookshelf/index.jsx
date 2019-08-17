import React from 'react';
import { NavBar, Icon, Grid } from 'antd-mobile';
import './index.less';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bookshelf: {}
    };
  }
  // static getDerivedStateFromProps(nextProps, nextState){
  //   return null
  // }
  // getSnapshotBeforeUpdate (prevPros, prevState) {
  //   console.log('getSnapshotBeforeUpdate', prevPros, this.props, prevState, this.state)
  //   return this.state;
  // }
  componentDidMount () {
    let cat = localStorage.getItem('xiaoshuo_bookshelf');
    try {
      let bookshelfJson = JSON.parse(cat);
      if (bookshelfJson) {
        this.setState({
          bookshelf: bookshelfJson,
        })
      }
    } catch (error) {
      //
    }
  }
  openFn = (val) => {
    const { bookshelf } = this.state;
    const Url = '/preview.html?' + escape(`page=${val.page ? val.page : '1'}&id=${val.id}&name=${val.name}&author=${val.author}&img=${val.img}`);
    window.location.href = Url;
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const { bookshelf } = this.state;
    return (<div className="bookshelf" onClick={this.onClick}>
      <NavBar
        mode="dark"
        // leftContent={<Icon type="user" />}
        // leftContent="23"
        // onLeftClick={() => {this.setState({Modal_visible: !Modal_visible})}}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => {window.location.href = "/search.html"}} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >我的书架</NavBar>
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
