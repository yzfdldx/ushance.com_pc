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
    const { Text } = this.state;
    return (<div className="my" style={{height: '900px'}}>
      21123123
    </div>);
  }
}

export default App;
