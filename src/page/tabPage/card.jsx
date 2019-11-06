import React, { PureComponent } from 'react';
import './tabPage.less';

class Card extends PureComponent {
  cardClick = (title) => {
    location.hash = `#/shebei/TabPageDetail_resee/${title}`;
  }
  buttonClick = (title) => {
    location.hash = `#/shebei/TabPageDetail_resee/${title}`; 
  }
  render() {
    const { data, type } = this.props;
    return (
      <div className="card" style={{ border: type === 'search' ? '1px solid #32D693' : '' }}>
        {
          !data.usable ? <div className="card_none" style={{ cursor: 'not-allowed' }}>
            此设备暂时不可下单
          </div> : null
        }
        <div>
          <a onClick={data.usable ? () => this.cardClick(data.id) : null}>
            <img className="img-header" src={data.img} />
          </a>
          <div className="title" onClick={data.usable ? () => this.cardClick(data.id) : null}>{data.abbreviat}</div>
          <div className="sub-title">{data.name}</div>
          <div className="price">
            <a onClick={data.usable ? () => this.buttonClick(data.id) : null} className="btnbook">
              立即预约
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
