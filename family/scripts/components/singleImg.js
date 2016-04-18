import React from 'react';

class SingleImg extends React.Component {

  static defaultProps = {
    autoPlay: false,
    maxLoops: 10,
  }

  static propTypes = {
    autoPlay: React.PropTypes.bool.isRequired,
    maxLoops: React.PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>img</li>
    );
  }

}

export default SingleImg;