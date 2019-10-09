import React, { PureComponent } from 'react';
import './index.less';

class Card extends PureComponent {

  cardClick = (title) => {
    const { params: { name }, data } = this.props;
    location.hash = `#/ShopPage/BuildMaterial/CardDetail/{data.type}`;
  }

  render() {
    const { data } = this.props;
    return (
      <div className="card" onClick={this.cardClick}>
        <img className="img-header" src={data.img} />
        <div className="title">{data.name}</div>
        <div className="price">￥{data.price}</div>
      </div>
    );
  }
}

export default Card;
