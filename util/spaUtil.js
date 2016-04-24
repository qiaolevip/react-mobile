String.prototype.format = function() {
  if (arguments.length == 0) return this;
  for (var s = this, i = 0; i < arguments.length; i++)
    s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
  return s;
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
  console.log(url);
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

export var getConstellation = function(param) {
  var constellations = [
    {en: 'Aries', cn: '白羊座', date: '3月21日～4月19日', nickname: '牡羊座', symbol: '♈', range: '321,419'},
    {en: 'Taurus', cn: '金牛座', date: '4月20日～5月20日', nickname: '金牛座', symbol: '♉', range: '420,520'},
    {en: 'Gemini', cn: '双子座', date: '5月21日～6月21日', nickname: '双子座', symbol: '♊', range: '521,621'},
    {en: 'Cancer', cn: '巨蟹座', date: '6月22日～7月22日', nickname: '巨蟹座', symbol: '♋', range: '622,722'},
    {en: 'Leo', cn: '狮子座', date: '7月23日～8月22日', nickname: '狮子座', symbol: '♌', range: '723,822'},
    {en: 'Virgo', cn: '处女座', date: '8月23日～9月22日', nickname: '室女座', symbol: '♍', range: '823,922'},
    {en: 'Libra', cn: '天秤座', date: '9月23日～10月23日', nickname: '天平座', symbol: '♎', range: '923,1023'},
    {en: 'Scorpio', cn: '天蝎座', date: '10月24日～11月22日', nickname: '天蝎座', symbol: '♏', range: '1024,1122'},
    {en: 'Sagittarius', cn: '射手座', date: '11月23日～12月21日', nickname: '人马座', symbol: '♐', range: '1123,1221'},
    {en: 'Capricorn', cn: '摩羯座', date: '12月22日～1月19日', nickname: '山羊座', symbol: '♑', range: '1222,119'},
    {en: 'Aquarius', cn: '水瓶座', date: '1月20日～2月18日', nickname: '宝瓶座', symbol: '♒', range: '120,218'},
    {en: 'Pisces', cn: '双鱼座', date: '2月19日～3月20日', nickname: '双鱼座', symbol: '♓', range: '219,320'}
  ];
  var result = constellations[9];
  var isDate = /^\d/.test(param);
  if (isDate) param = param.replace(/(\D)(\d)$/,'$10$2').replace(/^(\d{4}\D?)|\D/g,'') * 1;
  for (var k in constellations) {
    var v = constellations[k];
    var range = v.range.split(',');
    var range1 = range[0] * 1;
    var range2 = range[1] * 1;
    if (param == v.cn || (isDate && param >= range1 && param <= range2)) {
      result = v;
      break;
    }
  }
  return param ? result : constellations;
};

export var getChineseZodiac = function(param) {
  var animals = [
    {cn: '鼠', py: 'Shu', en: 'Rat', symbol: '🐁', date: 1900},
    {cn: '牛', py: 'Niu', en: 'Ox', symbol: '🐂', date: 1901},
    {cn: '虎', py: 'Hu', en: 'Tiger', symbol: '🐅', date: 1902},
    {cn: '兔', py: 'Tu', en: 'Rabbit', symbol: '🐇', date: 1903},
    {cn: '龙', py: 'Long', en: 'Dragon', symbol: '🐉', date: 1904},
    {cn: '蛇', py: 'She', en: 'Snake', symbol: '🐍', date: 1905},
    {cn: '马', py: 'Ma', en: 'Horse', symbol: '🐎', date: 1906},
    {cn: '羊', py: 'Yang', en: 'Sheep', symbol: '🐑', date: 1907},
    {cn: '猴', py: 'Hou', en: 'Monkey', symbol: '🐒', date: 1908},
    {cn: '鸡', py: 'Ji', en: 'Rooster', symbol: '🐓', date: 1909},
    {cn: '狗', py: 'Gou', en: 'Dog', symbol: '🐕', date: 1910},
    {cn: '猪', py: 'Zhu', en: 'Pig', symbol: '🐖', date: 1911}
  ];
  var result = animals[0];
  var theYear = new Date().getFullYear();
  var theAnimalNum = (theYear - result.date) % 12;
  var isDate = /^\d{4}/.test(param);
  if (isDate) param = param.match(/^\d{4}/)[0] * 1;
  for (var k in animals) {
    var v = animals[k];
    var diffNum = (theYear - v.date) % 12;
    v.date = diffNum <= theAnimalNum ? theYear - diffNum : theYear + 12 - diffNum;
    v.relateDate = [];
    for (var j = -3; j <= 6; j++) {
      var theDate = new Date(v.date, 1, 1);
      theDate.setFullYear(theDate.getFullYear() - j * 12);
      v.relateDate.push(theDate.getFullYear());
    }
    if (param == v.cn || (isDate && Math.abs(param - v.date) % 12 == 0)) {
      if(isDate) v.date = param;
      result = v;
      break;
    }
  }
  return param ? result : animals;
};

export var getAgeFromBirth = function(birthday) {
  return new Date().getFullYear() - birthday.replace(/(\d{4}).+/, '$1') * 1;
};