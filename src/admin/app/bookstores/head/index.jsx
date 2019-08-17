import React from 'react';
import './index.css';
import { NavBar, Icon, Modal, SearchBar, List, PullToRefresh, Toast } from 'antd-mobile';
import {connect} from 'yzf-react-storage';
import ReactDOM from 'react-dom';

const Item = List.Item;
const Brief = Item.Brief;


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //
    };
  }
  // static getDerivedStateFromProps(nextProps, nextState){
  //   return null
  // }
  componentDidMount () {
      //
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const {
      //
    } = this.state;
    const {
      bookstores
    } = this.props;
    const {search_books_list} = bookstores
    
    return (<div className="bookstores_header">
      <NavBar
        mode="dark"
        // leftContent={<Icon type="user" />}
        // leftContent="23"
        // onLeftClick={() => {this.setState({Modal_visible: !Modal_visible})}}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => {window.location.href = "/search.html"}} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >书城市场</NavBar>

    </div>);
  }
}

const IndexPageFn = (model) => {
  return model
};
export default connect(App, IndexPageFn);
