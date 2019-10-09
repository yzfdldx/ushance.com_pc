import React, { PureComponent } from 'react';
import { Tabs, Breadcrumb, Alert } from 'antd';
import './index.less';

import Index from '../index.jsx';
import BaseInfor from './baseInfor.jsx';

const { TabPane } = Tabs;

class PersonalInformation extends PureComponent {

  cardClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }

  buttonClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }

  render() {
    const { children } = this.props;
    return (
      <div id="personal-information">
        <Tabs type="card">
          <TabPane tab="基本资料" key="1">
            <Alert message="亲爱的yzf，填写真实的资料，有助于好友找到你哦。" type="warning" />
            <BaseInfor />
          </TabPane>
          <TabPane tab="头像照片" key="2">
            头像照片
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PersonalInformation;
