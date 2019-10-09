import React, { PureComponent } from 'react';
import {  Breadcrumb, Alert, Tabs } from 'antd';
import './index.less';

import AdressForm from './adressForm.jsx';
import OldAdressTable from './oldAdressTable.jsx';

const { TabPane } = Tabs;

class Adress extends PureComponent {

  cardClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }

  buttonClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }

  render() {
    return (
      <div id="adress" className="adress">
        <Tabs type="card">
          <TabPane tab="新增收货地址" key="1">
            <AdressForm />
            <Alert message="已保存了x条地址，还能保存xx条地址" type="info" />
            <br />
            <OldAdressTable />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Adress;
