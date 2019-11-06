import React, { Component } from 'react';
import { Icon, Button, Spin } from 'antd';
import reqwest from 'reqwest';
import './tabPageDetail_resee.less';

class TabPageDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      load: false,
      id: '',
    };
  }
  componentDidMount () {
    try {
      const {params: {name}} = this.props;
      this.setState({
        id: name,
        load: true,
      });
      reqwest({
        url: `${window.imgSrc}/web/index/my/getDeviceList.json`, // https://www.ushance.com
        method: 'get',
        data: {
          id: name
        },
        success: (res) => {
          this.setState({
            load: false,
          });
          if (res.result === 'succeed') {
            if (res.data && res.data[0] && res.data[0].parameter) {
              this.setState({
                data: JSON.parse(res.data[0].parameter),
              });
            }
          } else {
            message.error(res.message || '请求异常');
          }
        }
      })
    } catch (error) {
      //
    }
  }
  okFn = () => {
    const { id } = this.state;
    window.location.href = `#/shebei/TabPageDetail/${id}`;
  }
  calFn = () => {
    history.go(-1);
  }
  render() {
    const {
      data,
      load
    } = this.state;
    return (<div id="tab_page_detail_resee">
      <div>
        <Spin tip="数据加载中..." spinning={load} >
          {
            data ? <div>
              <div className="tab_page_detail_col">
                <div className="tab_page_detail_col_title">注意事项</div>
                <div className="tab_page_detail_col_content">
                  {
                    data.note ? data.note.map((e2, k2) => <div key={k2}>
                      <div className="tab_page_detail_col_content_card">
                        <h3>{k2 + 1}.{e2.title}</h3>
                        {
                          e2.data ? e2.data.map((e3, k3) => <div key={k3}>
                            {k3 + 1}) {e3}
                          </div>) : null
                        }
                      </div>
                      {
                        data.note.length !== k2 + 1 ? <div className="tab_page_detail_col_content_jiantou">
                          <div></div>
                          <Icon type="caret-down" />
                        </div> : null
                      }
                    </div>) : null
                  }
                </div>
              </div>
              <div className="tab_page_detail_col">
                <div className="tab_page_detail_col_title">设备参数</div>
                <div className="tab_page_detail_col_content">
                  {
                    data.deviceParameters ? data.deviceParameters.map((e2, k2) => <div key={k2}>
                      <div className="tab_page_detail_col_content_card">
                        <h3>{k2 + 1}.{e2.title}</h3>
                        {
                          e2.data.map((e3, k3) => <div key={k3}>
                            {k3 + 1}) {e3}
                          </div>)
                        }
                      </div>
                      {
                        data.QA.length ? <div className="tab_page_detail_col_content_jiantou">
                          <div></div>
                          <Icon type="caret-down" />
                        </div> : null
                      }
                    </div>) : null
                  }
                  {
                    data.QA ? data.QA.map((e2, k2) => <div key={k2}>
                      <div className="tab_page_detail_col_content_card">
                        <h3>{k2 + 1}.{e2.title}</h3>
                        {
                          e2.data.map((e3, k3) => <div key={k3}>
                            {k3 + 1}) Q: {e3.Q}<br/>
                            <span style={{ marginLeft: '16px' }}>A: {e3.A}</span>
                          </div>)
                        }
                      </div>
                      {
                        data.QA.length !== k2 + 1 ? <div className="tab_page_detail_col_content_jiantou">
                          <div></div>
                          <Icon type="caret-down" />
                        </div> : null
                      }
                    </div>) : null
                  }
                </div>
              </div>
            </div> : <div style={{ height: '200px' }}></div>
          }
        </Spin>
      </div>
      <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
        <Button onClick={this.okFn} type="primary" style={{ marginRight: '32px' }}>去预约测试</Button>
        <Button onClick={this.calFn}>返回上一步</Button>
      </div>
    </div>);
  }
}

export default TabPageDetail;
