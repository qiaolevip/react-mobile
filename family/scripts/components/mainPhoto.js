import React from 'react';
import BaseComponent from './baseComponent';
import PersonInfo from './personInfo';
import ScrollTop from './scrollTop';
import { default as apiUrl } from '../util/constant';
import { ajax } from '../../../util/spaUtil';

class MainPhoto extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('showInfo', 'hideInfo');

    this.state = {
      isShowInfo: false,
      photos: [],
      person: null,
      page: 0,
      isLoading: false,
      isLoadFinished: false
    }
  }

  componentDidMount() {
    let url = apiUrl.photoList;
    let loadList = () => {
      let page = this.state.page;
      if (!this.state.isLoading) {
        this.setState({
          isLoading: true
        });
        ajax.load(url + page, function(data) {
          if (data.status == 'success') {
            this.setState({
              photos: this.state.photos.concat(data.data),
              page: page + 1,
              isLoadFinished: page == data.pageCount - 1,
              isLoading: false
            });
          } else {
            this.setState({
              isLoadFinished: true,
              isLoading: false
            });
          }
        }.bind(this), function() {
          this.setState({
            isLoadFinished: true
          });
        }.bind(this));
      }
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
        <ScrollTop />
        {
          state.isShowInfo ? <PersonInfo person={state.person} hideInfo={this.hideInfo} /> :
            <ul className="photo-list-container">
              {
                state.photos.map((item, index) =>
                  <li key={index} style={{marginRight: `${index%2==0?2:0}%`}}>
                    <a onClick={e => this.showInfo(item, e)}>
                      <img src={this._resizeImg(item.icon)} />
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