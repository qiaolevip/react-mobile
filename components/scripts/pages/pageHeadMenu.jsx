import React, {
  Component
} from 'react';

class PageHeadMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeMenu: 'all',
      products: Array.apply(null, {length: 6}).map(Number.call, Number)
    };
  }

  componentDidMount() {
    document.title = '页面头部菜单';
  }

  setActiveMenu(menu) {
    this.setState({
      activeMenu: menu
    });
  }

  singleProduct(item, index) {
    const product = {
      time: '2016-05-31 20:30',
      status: '已发货',
      desc: 'iPhone6 Plus 16G 颜色多选 人满开奖 只要一元就能购买'
    };

    return <div className="my-product-item" key={index}>
      <div className="line line1 gray-text96">
        <div className="left-part">{product.time}</div>
        <div className="right-part">{product.status}</div>
      </div>
      <div className="line">
        <p>{product.desc}</p>
      </div>
    </div>;
  }

  render() {
    const state = this.state;
    const activeMenu = state.activeMenu;

    return (
      <div className="page-head-menu-container">
        <div className="head-menu">
          <div className={activeMenu == 'all' ? 'active' : ''} onClick={this.setActiveMenu.bind(this, 'all')}>全部</div>
          <div className={activeMenu == 'none' ? 'active' : ''} onClick={this.setActiveMenu.bind(this, 'none')}>未发货</div>
          <div className={activeMenu == 'wait' ? 'active' : ''} onClick={this.setActiveMenu.bind(this, 'wait')}>待发货</div>
        </div>
        {
          state.products.map((item, index) =>
            this.singleProduct(item, index)
          )
        }
      </div>
    );
  }
}

export default PageHeadMenu;