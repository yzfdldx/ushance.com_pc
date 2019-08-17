import React from 'react';
import './index.less';
import Header from './page/header.jsx'

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //
    };
  }
  componentDidMount () {
    //
  }
  render() {
    const { children } = this.props;
    return (<div className="appMenu">
      <Header/>
      {
        children
      }
    </div>);
  }
}

export default App;
