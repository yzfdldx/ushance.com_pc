import React from 'react';
import './index.less';
import Header from './page/header.jsx';
import Footer from './page/footer.jsx';
import reqwest from 'reqwest';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //
    };
  }
  componentDidMount () {
    // this.init();
  }
  init = () => {
    reqwest({
      url: 'http://www.ushance.com/web/index/test_data.json',
      method: 'get',
      data: {
        host: {
          host: '149.129.177.101',
          database: 'my_web',
          user: 'yzf',
          password: 'Yzf-1234'
        },
        // data: "select * from my_web.USE order by USE_ID desc", // 查询全部 - ok
        // data: "INSERT INTO my_web.USE (USE_PASSWORD, USE_NAME, USE_EMAIL, USE_ODER, USE_MESSAGE) VALUES ( 123456, 'yzf', 'yzflhez@126.com', '', '')",
        data: `UPDATE my_web.USE SET CREATE_DATE='2019-09-15 21:38:52' WHERE USE_ID=2`, // 更新
        // data: "DELETE FROM my_web.USE WHERE USE_ID=1" // 删除

        // data: "select * from my_web.USE order by USE_ID desc"
        // data: 'select ' + '*' + ' from ' + 'use' + ' where ' + `name = "${query.name}" and password = "${query.password}"`
        // data: 'insert into ' + 'USE' + '(' + 'USE_PASSWORD ' + 'USE_NAME ' + ') values(' + '123456 ' + 'yzf ' + ')',
      },
      success: function (resp) {
        qwery('#content').html(resp)
      }
    })
  }
  render() {
    const { children } = this.props;
    return (<div className="appMenu" style={{ backgroundColor: 'rgb(242, 245, 244)' }}>
      <Header {...this.props} />
      {
        children
      }
      <Footer />
    </div>);
  }
}

export default App;
