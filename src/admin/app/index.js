import React from 'react';
import {connect} from 'yzf-react-storage';
import './index.css';
import Bookshelf from './bookshelf/index.jsx';
import Bookstores from './bookstores/index.jsx';
import { TabBar } from 'antd-mobile';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 'bookshelf',
      bookstores_badge: null,
    };
  }
  componentDidMount() {
    let cat = localStorage.getItem('xiaoshuo_TabBarValue');
    this.setState({
      selectedTab: cat ? cat : 'bookshelf',
    })
  }
  render() {
    const { admin } = this.props;
    const {
      selectedTab,
      bookstores_badge
    } = this.state;
    return(<div className="app">
      {/* {JSON.stringify(admin)}
      <br/> */}
      {
        // admin && admin.foot_visible ? <div className="app_footer"><Foot /></div> : null
      }
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        // hidden={!admin.foot_visible}
      >
        <TabBar.Item
          title="书架"
          key="bookshelf"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
          />}
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
          />}
          selected={selectedTab === 'bookshelf'}
          // badge={1} // 信息提示
          onPress={() => {
            localStorage.setItem('xiaoshuo_TabBarValue', 'bookshelf');
            this.setState({
              selectedTab: 'bookshelf',
            });
          }}
          // data-seed="logId"
        >
          <Bookshelf
            badgeBack={(e) => {this.setState({bookstores_badge:e})}}
          />
        </TabBar.Item>
        <TabBar.Item
          title="书城"
          key="bookstores"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
          />}
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
          />}
          selected={selectedTab === 'bookstores'}
          badge={bookstores_badge} // 信息提示
          onPress={() => {
            localStorage.setItem('xiaoshuo_TabBarValue', 'bookstores');
            this.setState({
              selectedTab: 'bookstores',
            });
          }}
          // data-seed="logId"
        >
          <Bookstores
            badgeBack={(e) => {this.setState({bookstores_badge:e})}}
          />
        </TabBar.Item>
        <TabBar.Item
          title="我的"
          key="my"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
          />}
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
          />}
          selected={selectedTab === 'my'}
          // badge={1} // 信息提示
          onPress={() => {
            localStorage.setItem('xiaoshuo_TabBarValue', 'my');
            this.setState({
              selectedTab: 'my',
            });
          }}
          // data-seed="logId"
        >
          我的我的我的我的
        </TabBar.Item>
      </TabBar>
    </div>)
  }
}

const IndexPageFn = (model) => {
  return model
};
export default connect(App, IndexPageFn);
