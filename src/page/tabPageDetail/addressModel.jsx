import React from 'react';
import { Modal, Form, message, Select } from 'antd';
const { Option } = Select;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //
    };
  }
  componentDidMount() {
    const { SelectVal } = this.props;
    this.setState({
      SelectVal: SelectVal
    })
  }
  handleOk = () => {
    const { backFn, visibleFn } = this.props;
    const { SelectVal } = this.state;
    visibleFn();
    if (SelectVal) {
      this.props.backFn(SelectVal);
    } else {
      message.error('您还没有地址，去添加地址');
      setTimeout(() => {
        window.location.href = '#/MyPage/Adress';
      }, 1000);
    }
  }
  handleCancel = () => {
    this.props.visibleFn();
  }
  addressChange = e => {
    this.setState({
      SelectVal: e,
    });
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const { userAddressLIst } = this.props;
    const { SelectVal } = this.state;
    return (<Modal
      title="请选择地址"
      visible={true}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消"
    >
      <div style={{ marginBottom: '12px' }}>
        <span>地址选择: </span>
        <Select value={SelectVal} style={{ width: '350px' }} onChange={this.addressChange}>
          {
            userAddressLIst.map((e, k) => <Option
              value={JSON.stringify({
                address: e.address,
                default: e.default,
                detail: e.detail,
                name: e.name,
                phone: e.phone
              })}
              key={k}
            >{e.address[e.address.length - 1]}-{e.detail}-{e.name}{e.default ? '-默认' : ''}</Option>)
          }
        </Select>
      </div>
    </Modal>);
  }
}

const AppForm = Form.create()(App);
export default AppForm;
