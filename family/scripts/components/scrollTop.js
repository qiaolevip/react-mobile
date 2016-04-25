import React from 'react';
import BaseComponent from './baseComponent';

class ScrollTop extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('backTopTop');

    this.state = {
      isShowBack: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', function() {
      const scrollTop = document.body.scrollTop;
      this.setState({
        isShowBack: scrollTop >= this.props.top
      });
    }.bind(this));
  }

  backTopTop() {
    this._scrollToTop();
  }

  render() {
    return <span className={'back-to-top'+(this.state.isShowBack?'':' hidden')} onClick={this.backTopTop}></span>
  }

}

ScrollTop.defaultProps = {
  top: 1000
};

ScrollTop.propTypes = {
  top: React.PropTypes.number
};

export default ScrollTop;