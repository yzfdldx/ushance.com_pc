import React, { Component } from 'react';
import { Icon, Button } from 'antd';

import './tabPageDetail_resee.less';

class TabPageDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [
        {
          title: '注意事项',
          list: [
            {
              title: '样品要求',
              list: ['样品质量：20-30mg；', '样品包装：称量纸包好至试管，真空密封；', '样品尺寸：长宽厚<=5*5*3mm']
            },
            {
              title: '特殊要求',
              list: ['刻蚀超过5nm；', '含S,F等元素；', '其它']
            },
            {
              title: '测试说明',
              list: ['含量小于5%可能信号不明显；', '默认测最强峰，若最强峰和其它元素的峰有重叠，默认测次高峰；', '如需增加扫描次数请备注']
            }
          ]
        },
        {
          title: '设备参数',
          list: [
            {
              title: '设备型号',
              list: ['Thermo ESCALAB 250XI；', 'Axis Uitra DLD Kratos AXIS SUPRA；', 'PHI-5000versaprobe']
            },
            {
              title: '常用Q&A',
              list: ['Q：某些价态会扫不出来？\nA：如果扫不出来，可能因受污染或含量少；', 'Q：每种元素检测限一样不？\nA：不同；', 'Q：怎么判断拟合是好是坏？\nA：看波动大小，越小越好以及对应的物理意义']
            }
          ]
        }
      ],
      id: '',
    };
  }
  componentDidMount () {
    try {
      const {params: {name}} = this.props;
      this.setState({
        id: name,
      });
    } catch (error) {
      //
    }
  }
  okFn = () => {
    const { id } = this.state;
    window.location.href = `#/TabPageDetail/${id}`;
  }
  calFn = () => {
    history.go(-1);
  }
  render() {
    const {
      data
    } = this.state;
    return (<div id="tab_page_detail_resee">
      <div>
        {
          data.map((e, k) => <div span={12} className="tab_page_detail_col">
            <div className="tab_page_detail_col_title">{e.title}</div>
            <div className="tab_page_detail_col_content">
              {
                e.list.map((e2, k2) => <div key={k2}>
                  <div className="tab_page_detail_col_content_card">
                    <h3>{k2 + 1}.{e2.title}</h3>
                    {
                      e2.list.map((e3, k3) => <div key={k3}>
                        {k3 + 1}) {e3 ? e3.split('\n').map((e4, k4) => <span key={k4} style={k4 ? { marginLeft: '16px' } : null}>{e4}<br/></span>) : ''}
                      </div>)
                    }
                  </div>
                  {
                    e.list.length !== k2 + 1 ? <div className="tab_page_detail_col_content_jiantou">
                      <div></div>
                      <Icon type="caret-down" />
                    </div> : null
                  }
                </div>)
              }
            </div>
          </div>)
        }
      </div>
      <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
        <Button onClick={this.okFn} type="primary" style={{ marginRight: '32px' }}>去预约测试</Button>
        <Button onClick={this.calFn}>返回上一步</Button>
      </div>
    </div>);
  }
}

export default TabPageDetail;
