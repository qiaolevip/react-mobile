import React from 'react';
import PersonInfo from './personInfo';
import { ajax } from '../../../util/spaUtil';

class MainPhoto extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowInfo: false,
      photos: [],
      person: null,
      page: 0,
      isLoadFinished: false
    }
  }

  componentDidMount() {
    let url = '/api/data/tools?type=familyHome&&page=';
    let loadList = () => {
      let page = this.state.page;
      ajax.load(url + page, function(data) {
        if (data.status == 'success') {
          this.setState({
            photos: this.state.photos.concat(data.data),
            page: page + 1,
            isLoadFinished: page == data.pageCount - 1
          });
        } else {
          this.setState({
            isLoadFinished: true
          });
        }
      }.bind(this), function() {
        this.setState({
          isLoadFinished: true
        });
      }.bind(this));
    };

    let handleScroll = () => {
      let isLoadFinished = this.state.isLoadFinished;
      if (isLoadFinished) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        let scrollTop = document.body.scrollTop;
        let inHeight = window.innerHeight;
        let offsetHeight = document.body.scrollHeight;
        if (scrollTop + inHeight + 40 > offsetHeight) loadList();
      }
    };

    loadList();
    window.addEventListener('scroll', handleScroll);
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
                      <img src={item.icon} />
                      <span>{item.title}</span>
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