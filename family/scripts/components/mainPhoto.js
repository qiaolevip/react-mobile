import React from 'react';
import PersonInfo from './personInfo';
import util from '../../../util/spaUtil';

class MainPhoto extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowInfo: false,
      photos: [],
      person: null
    }
  }

  componentDidMount() {
    let url = '';
    util.load(url, function(data) {
      data = data.data;
      this.setState({
        photos: data
      })
    });
  }

  showInfo(person, e) {
    e.preventDefault();
    this.setState({
      isShowInfo: true,
      person: person
    });
  }

  hideInfo() {
    this.setState({
      isShowInfo: false
    })
  }

  render() {
    let state = this.state;

    return (
      <div>
        {
          state.isShowInfo ? <PersonInfo person={state.person} hideInfo={this.hideInfo.bind(this)} /> :
            <ul className="photo-list-container">
              {
                state.photos.map((item, index) =>
                  <li key={index} style={{marginRight: `${index%3==2?0:2}%`}}>
                    <a onClick={this.showInfo.bind(this, item)}>
                      <img src={item.photo} />
                      <span>{item.name}</span>
                    </a>
                  </li>
                )
              }
            </ul>
        }
      </div>
    );
  }

}

export default MainPhoto;