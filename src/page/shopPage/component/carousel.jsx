import React, { PureComponent } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './index.less';

export default class Carousel extends PureComponent {
  state = {
    slideIndex: 0,
    updateCount: 0,
    imgData: [
      'https://www.ushance.com/img/shebei/cailiao/1.png',
      'https://www.ushance.com/img/shebei/cailiao/2.png',
      'https://www.ushance.com/img/shebei/cailiao/3.png',
      'https://www.ushance.com/img/shebei/cailiao/4.png',
      'https://www.ushance.com/img/shebei/cailiao/5.png',
    ],
    imgUrl: [
      'https://www.ushance.com/img/shebei/cailiao/1.png',
      'https://www.ushance.com/img/shebei/cailiao/2.png',
      'https://www.ushance.com/img/shebei/cailiao/3.png',
      'https://www.ushance.com/img/shebei/cailiao/4.png',
      'https://www.ushance.com/img/shebei/cailiao/5.png',
    ][0],
  };

  imgClick = (imgUrl) => {
    this.setState({
      imgUrl,
    })
  }

  render() {
    const { imgData, imgUrl } = this.state;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    return (
      <div className="carousel">
        <div className="img-box">
          <img src={imgUrl} alt="图片" />
        </div>
        <div className="bottom-box">
          <Slider {...settings}>
            {
              imgData.map((i, k) => (<div>
                <img src={i} alt="图片" className="footer-img" onMouseOver={() => this.imgClick(i)} />
              </div>))
            }
          </Slider>
        </div>
      </div>
    );
  }
}