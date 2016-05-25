import React, {
  Component
} from 'react';
import { ajax } from '../../../util/spaUtil';

class WukongCoupon extends Component {

  constructor() {
    super();
    this.state = {
      coupons: []
    };
  }

  componentDidMount() {
    ajax.load('/data/wukong-coupon.json', function(data) {
      data = data.couponsList;
      this.setState({coupons: data});
    }.bind(this));
  }

  render() {
    return (
      <div className="wukong-coupon-container">
        <ul>
          {
            this.state.coupons.map((item, index) =>
              <li className="couponBgno" key={index}>
                <div className="left couponDetail">
                  <h1>来源：{item.getFrom}</h1>
                  <p>{item.couponsType=='JX'?`+${item.amount}%`:`${item.amount}元`}</p>
                  <div className="div_span">
                    <span>{item.useType}</span>
                  </div>
                </div>
                <div className="left couponType">
                  <div className="lose">
                    <p>已失效</p>
                    <p>{item.endTimeStr} 失效</p>
                  </div>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default WukongCoupon;