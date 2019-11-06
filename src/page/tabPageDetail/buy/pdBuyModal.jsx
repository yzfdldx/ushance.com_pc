import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';

class pdBuyModal extends PureComponent {

  handleCancel = e => {
    this.props.onCancel();
  };

  render() {
    const { visible } = this.props;
    return (
      <div>
        <Modal
          title="拼单"
          visible={visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName="pd-buy-modal"
        >
          <Button type="primary" size="large">立即购买</Button>
          <Button size="large" style={{ marginLeft: 20 }}>平台垫付</Button>
        </Modal>
      </div>
    );
  }
}

export default pdBuyModal;