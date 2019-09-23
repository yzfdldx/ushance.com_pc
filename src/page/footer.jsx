import React from 'react';
import './index.less';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Text: '32'
    };
  }
  componentDidMount () {
    //
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    // const { Text } = this.state;
    // const { children } = this.props;
    return (<div className="foot">
      <div>
        <span>关于我们</span>
        <span>加入我们</span>
        <span>用户协议</span>
        <span>隐私条款</span>
        <span>新手帮助</span>
        <span>意见反馈</span>
      </div>
      <p>
        上海YOU闪 服务热线：123-456-7890（周一至周五9:00—17:30）可信网站
      </p>
    </div>);
  }
}

export default App;
