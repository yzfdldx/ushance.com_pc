import React, { PureComponent } from 'react';
import './tabPage.less';

class Card extends PureComponent {

  cardClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }

  buttonClick = (title) => {
    location.hash = `#/TabPageDetail_resee/${title}`;
  }

  render() {
    const { data, type } = this.props;
    const {
      imgs,
      titles: { title },
      subTitle,
      prices,
      // details,
    } = data;
    // const buttonName = {
    //   timeOrder: '限时预约',
    //   order: '立即预约',
    //   price: `低至${prices.price}折`,
    // };
    return (
      <div className="card" style={{ border: type === 'search' ? '1px solid #32D693' : '' }}>
        <div title={title}>
          <a onClick={() => this.cardClick(title)}>
            <img className="img-header" src={imgs.img} />
          </a>
          <div className="title" title={title} onClick={() => this.cardClick(title)}>{title}</div>
          <div className="sub-title">{subTitle}</div>
          <div className="price">
            <a onClick={() => this.buttonClick(title)} className="btnbook" style2={{ backgroundColor: prices.type !== 'order' ? '#fc916d' : '' }}>
              {/* {buttonName[prices.type]} */}
              立即预约
            </a>
          </div>
          {/* <div className="footer">
            已测试
            <span style={{ color: '#fc916d' }}>{details.tested}</span>
            次&nbsp;平均
            <span style={{ color: '#fc916d' }}>{details.average}</span>
            日完成<br />
            <span style={{ color: '#fc916d' }}>{details.total}</span>
            对测试结果满意
          </div> */}
        </div>
      </div>
    );
  }
}

export default Card;
