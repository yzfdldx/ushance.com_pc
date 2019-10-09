import React, { PureComponent } from 'react';
import { Tabs, Alert } from 'antd';
import './index.less';
import ListTable from '../component/listTable/listTable';

const { TabPane } = Tabs;

// 待发货/试验 页面

class Order extends PureComponent {

  renderTab = () => {
    return (
      <Tabs defaultActiveKey="1" onChange={this.tabsChange}>
        <TabPane tab="补开发票" key="1" />
        <TabPane tab="增票资质" key="2" />
        <TabPane tab="发票帮助中心" key="3" />
      </Tabs>
    );
  }


  render() {
    return (
      <div id="invoice">
        <div className="my-tab">
          {this.renderTab()}
        </div>
        <Alert message={(<div>
            温馨提示： <br/>
            一、发票换开： <br/>
            1、订单完成后一年内可支持换开发票一次。 <br/>
            2、增值税专用发票需将原票寄回京东，邮寄地址详见收票人信息页。 <br/>
            3、不支持“企业抬头”变更。 <br/>
            二、补开发票规则： <br/>
            1、增值税普通发票订单完成后1年内可补开发票，增值税专用发票订单完成10天后，1年内可以补开发票。 <br/>
            三、企业发票： <br/>
            1、增值税专用发票资质维护入口：我的-账户设置-增票资质。 <br/>
            2、企业用户集中开票，请联系客户经理或前往电脑端“我的京东-账户设置-企业发票”进行自主开票。<br/> 
            四、暂不支持补开、换开发票类型： <br/>
            1、第三方卖家订单、全球购订单暂不支持发票补开与换开。<br/>
        </div>)} type="warning" />
        <ListTable />
      </div>
    );
  }
}

export default Order;
