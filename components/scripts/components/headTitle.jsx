import React, {
  Component,
  PropTypes,
} from 'react';

class HeadTitle extends Component {

  render() {
    const props = this.props;
    const bgColor = {
      background: props.color
    };

    return (
      <div className="head-title-container">
        <div className="left-part gray-text66">
          <span className="ribbon" style={bgColor}></span>
          <span>{props.title}</span>
        </div>
        <div className="right-part gray-text96">
          <a href={props.link}>
            {props.more} &gt;
          </a>
        </div>
      </div>
    );
  }
}

HeadTitle.defaultProps = {
  more: '更多推荐',
  color: '#00bc8d'
};

HeadTitle.propTypes = {
  title: PropTypes.string.isRequired,
  more: PropTypes.string,
  link: PropTypes.string,
  color: PropTypes.string
};

export default HeadTitle;