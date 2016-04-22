String.prototype.format = function() {
  if (arguments.length == 0) return this;
  for (var s = this, i = 0; i < arguments.length; i++)
    s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
  return s;
};
String.prototype.includes = function(str) {
  return this.indexOf(str) != -1;
};

export var getParameterByName = function(name, url) {
  url = url || location.search;
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export var urlParams = function(params) {
  return Object.keys(params).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  }).join('&');
};

export var ajax = {
  type: {
    GET: 'GET',
    POST: 'POST'
  },
  postType: {
    formData: 'formData',
    formUrl: 'formUrl',
    json: 'json'
  },
  contentHeader: {
    formUrl: 'application/x-www-form-urlencoded',
    json: 'application/json'
  },
  postJSON: function(url, data, success, error) {
    var obj = {
      url: url,
      type: this.type.POST,
      data: data,
      postType: this.postType.json
    };
    this.load(obj, success, error);
  },
  load: function(obj, success, error) {
    if (!obj) return console.error('Error: Ajax Object required!');
    else if (typeof obj === 'function') return obj('Error: Ajax Object required!');

    var url = obj, type = this.type.GET, postType, isText = false, data = null;
    if (typeof obj === 'object') {
      url = obj.url;
      type = obj.type || type;
      isText = obj.isText;
      data = obj.data;
      postType = obj.postType;
    }
    var isGet = type.toUpperCase() === this.type.GET;
    var xhr = new XMLHttpRequest();
    if (isGet && data) url += (url.indexOf('?') != -1 ? '' : '?') + urlParams(data);
    xhr.open(type, url, true);
    if (isGet) {
      xhr.send();
    } else if (data) {
      switch (postType) {
        case this.postType.formData:
          var formData = new FormData();
          for (var key in data) {
            formData.append(key, data[key]);
          }
          xhr.send(formData);
          break;

        case this.postType.formUrl:
          xhr.setRequestHeader('Content-Type', this.contentHeader.formUrl);
          xhr.send(urlParams(data));
          break;

        default:
          xhr.setRequestHeader('Content-Type', this.contentHeader.json);
          xhr.send(JSON.stringify(data));
      }
    }
    xhr.onload = function () {
      if (xhr.status === 200) {
        var text = xhr.responseText;
        if (success) success(isText ? text : JSON.parse(text));
      } else {
        if (error) error(xhr);
      }
    };
  }
};

export var goUrl = function(url) {
  window.location.href = url;
};

export var numberFormat = function(num) {
  return (num + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export var formatDate = function(date, fmt) {
  fmt = fmt == 'date' ? 'yyyy-MM-dd' : fmt == 'time' ? 'hh:mm:ss' : fmt;
  fmt = fmt || 'yyyy-MM-dd';
  date = date ? new Date(date) : new Date();
  var o = {
    'M+' : date.getMonth() + 1,                     //月份
    'd+' : date.getDate(),                          //日
    'h+' : date.getHours(),                         //小时
    'm+' : date.getMinutes(),                       //分
    's+' : date.getSeconds(),                       //秒
    'q+' : Math.floor((date.getMonth() + 3 ) / 3),  //季度
    'S'  : date.getMilliseconds()                   //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp('('+ k +')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
  return fmt;
};