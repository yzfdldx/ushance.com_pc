import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';
import './index.less';

class BuyModal extends PureComponent {

  handleCancel = e => {
    this.props.onCancel();
  };

  render() {
    const { visible } = this.props;
    return (
      <div>
        <Modal
          title="直接购买"
          visible={visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName="buy-modal"
        >
          <Button type="primary" size="large">立即购买</Button>
          <Button size="large" style={{ marginLeft: 20 }}>平台垫付</Button>
        </Modal>
      </div>
    );
  }
}

export default BuyModal;