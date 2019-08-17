import React from 'react';
import './index.css';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Text: '32'
    };
  }
  static getDerivedStateFromProps(nextProps, nextState){
    // if(nextProps.age !== nextState.age){
    //     return {
    //         age: nextProps.age
    //     }
    // }
    // console.log('getDerivedStateFromProps', App.state)
    // console.log('getDerivedStateFromProps', nextProps, nextState)
    // if (nextState.Text === '233232323232') {
    //   return {
    //     Text: '32----12'
    //   }
    // }
    return null
  }
  // getSnapshotBeforeUpdate (prevPros, prevState) {
  //   console.log('getSnapshotBeforeUpdate', prevPros, this.props, prevState, this.state)
  //   return this.state;
  // }
  componentDidMount () {
    console.log('componentDidMount', this.props, this.state)
  }
  // componentDidUpdate (props, state, snaptshot) {
  //   // 新增的参数 snapshot 即是之前调用 getSnapshotBeforeUpdate 的返回值
  //   console.log('componentDidUpdate', props, state, snaptshot)
  // }
  onClick = async () => {
    const A = () => {
      // return new Promise(function (resolve, reject) {
      //   setTimeout(() => {
      //     // console.log('setTimeout')
      //     resolve('setTimeout');
      //   }, 1000)
      // });
      // return new Promise(function (resolve, reject) {
      //   setTimeout(() => {
      //     console.log('setTimeout')
      //     resolve('setTimeout');
      //   }, 1000)
      // });
    }
    console.log('onClick');
    this.setState({
      Text: '233232323232'
    })
    // const aa = await A();
    // console.log('await')
  }
  render() { // 活动效果监测与分析 / 辅助活动方案决策 / 圈人、圈店、圈券、圈商品
    const { Text } = this.state;
    console.log('render')
    return (<div className="my" onClick={this.onClick}>
      
    </div>);
  }
}

export default App;
