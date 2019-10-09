import React, { PureComponent } from 'react';
import './tabPage.less';

class Card extends PureComponent {
  cardClick = (title) => {
    location.hash = `#/jiedanTabPageDetail_resee/${title}`;
  }
  render() {
    const { data, type } = this.props;
    return (
      <div className="jiedan_card" style={{ border: type === 'search' ? '1px solid #32D693' : '' }}>
        <div onClick={() => this.cardClick(data.title)}>
          <div className="site">{data.site}</div>
          <div className="title">{data.title}</div>
          <div className="sub-title">{data.number}</div>
          <div className="time">{data.time}</div>
          <div className="price">
            <a onClick={() => this.cardClick(data.title)} className="btnbook">
              了解更多
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
