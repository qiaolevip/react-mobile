import React from 'react';
import BaseComponent from './baseComponent';
import { default as apiUrl } from '../util/constant';
import { ajax } from '../../../util/spaUtil';

class SimilarPic extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('handleScroll');

    this.state = {
      photos: [],
      page: 1,
      isLoading: false,
      isLoadFinished: false
    }
  }

  loadList() {
    let page = this.state.page;
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true
      });
      let url = apiUrl.similarPic.format(this.props.url);
      ajax.load(url + page, function(data) {
        if (data.status == 'success') {
          this.setState({
            photos: this.state.photos.concat(data.data.data),
            page: page + 1,
            isLoading: false
          });
          if (page == 1) {
            const offsetTop = document.getElementsByClassName('similar-pic-container')[0].offsetTop;
            this._scrollTo(offsetTop);
          }
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
  }

  handleScroll() {
    let isLoadFinished = this.state.isLoadFinished;
    if (isLoadFinished) {
      window.removeEventListener('scroll', this.handleScroll);
    } else {
      let scrollTop = document.body.scrollTop;
      let inHeight = window.innerHeight;
      let offsetHeight = document.body.scrollHeight;
      if (scrollTop + inHeight + 40 > offsetHeight) this.loadList();
    }
  }

  componentDidMount() {
    this.loadList();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    let state = this.state;

    return (
      <div className="similar-pic-container">
        <div className="title">相似图片</div>
        <ul className="pic-list">
          {
            state.photos.map((item, index) =>
              <li key={index} style={{marginRight: `${index%2==0?2:0}%`}}>
                <a href={item.fromURL}>
                  <img src={this._resizeImg(item.thumbURL)} />
                  <span>{item.fromPageTitle}</span>
                </a>
              </li>
            )
          }
        </ul>
      </div>
    );
  }

}

SimilarPic.propTypes = {
  url: React.PropTypes.string.isRequired
};

export default SimilarPic;