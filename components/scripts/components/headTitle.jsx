import React from 'react';

class HeadTitle extends React.Component {

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
  title: React.PropTypes.string.isRequired,
  more: React.PropTypes.string,
  link: React.PropTypes.string,
  color: React.PropTypes.string
};

export default HeadTitle;