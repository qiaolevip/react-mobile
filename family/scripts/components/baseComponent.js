import React from 'react';

class BaseComponent extends React.Component {
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  _resizeImg(img, type) {
    type = type || 'thumb180';
    return /sinaimg\.cn/.test(img) ? img.replace(img.split('/')[3], type) : img;
  }

  _scrollTo(height) {
    let interval = setInterval(function() {
      const scrollTop = document.body.scrollTop;
      document.body.scrollTop = scrollTop + (height / 100);
      if (scrollTop >= height) clearInterval(interval);
    }, 5);
  }

  _scrollToTop() {
    let interval = setInterval(function() {
      const scrollTop = document.body.scrollTop;
      document.body.scrollTop = scrollTop / 1.5;
      if (scrollTop < 1) clearInterval(interval);
    }, 5);
  }
}

export default BaseComponent;