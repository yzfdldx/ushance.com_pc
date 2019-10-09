import React, { PureComponent } from 'react';
import { Icon, Popover, Input } from 'antd';
import './index.less';

const { Search } = Input;

class Header extends PureComponent {

  renderMenu = () => {
    const menu = (
      <div className="pover-box">
        <div className="box-card left">
          <p className="title">安全设置</p>
          <p><a href="">修改登录密码</a></p>
          <p><a href="">手机绑定</a></p>
          <p><a href="">其他</a></p>
        </div>
        <div className="box-card center">
          <p className="title">个人资料</p>
          <p><a href="#/MyPage/Adress">收货地址</a></p>
          <p><a href="#/MyPage/Information">修改头像昵称</a></p>
          <p><a href="#/MyPage/Device">添加我的设备</a></p>
        </div>
        <div className="box-card right">
          <p className="title">账号绑定</p>
          <p><a href="">支付宝绑定</a></p>
          <p><a href="">微博绑定</a></p>
          <p><a href="">分享绑定</a></p>
        </div>
      </div>
    );
    return menu;
  }

  render() {
    const { children } = this.props;
    return (
      <div className="my-header">
        <ul className="my-header-ul">
          {/* <li className="my-header-ul-li">
            <a href="#/" className="my-header-ul-li-a">首页</a>
          </li> */}
          <li className="my-header-ul-li">
            <Popover placement="bottom" content={this.renderMenu()} trigger="hover">
              <a href="#/" className="my-header-ul-li-a">账户设置<Icon type="down" /></a>
            </Popover>
          </li>
          <li className="my-header-ul-li">
            <a href="#/" className="my-header-ul-li-a">消息</a>
          </li>
        </ul>
        <div className="my-header-right">
          {/* <Search
            placeholder="请输入搜索条件"
            enterButton="搜索"
            size="small"
            onSearch={value => console.log(value)}
          /> */}
        </div>
      </div>
    );
  }
}

export default Header;
