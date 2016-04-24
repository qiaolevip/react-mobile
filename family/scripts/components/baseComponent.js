import React from 'react';

class BaseComponent extends React.Component {
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  _resizeImg(img, type) {
    type = type || 'thumb180';
    return /sinaimg\.cn/.test(img) ? img.replace(img.split('/')[3], type) : img;
  }
}

export default BaseComponent;