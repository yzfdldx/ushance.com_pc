import React, { PureComponent } from 'react';
import {  Breadcrumb, Alert, Tabs } from 'antd';
import './index.less';

import DeviceForm from './deviceForm.jsx';
import OldDeviceTable from './oldDeviceTable.jsx';

const { TabPane } = Tabs;

class Device extends PureComponent {

  cardClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }

  buttonClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }

  render() {
    return (
      <div id="device">
        <Tabs type="card">
          <TabPane tab="新增设备" key="1">
            <DeviceForm />
            <Alert message="已保存的设备" type="info" />
            <br />
            <OldDeviceTable />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Device;
