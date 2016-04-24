import React from 'react';
import BaseComponent from './baseComponent';
import SimilarPic from './similarPic';
import { getConstellation, getChineseZodiac, getAgeFromBirth } from '../../../util/spaUtil';

class PersonInfo extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('switchImg');

    let person = props.person;
    person.icon = this._resizeImg(person.icon, 'mw690');
    this.state = {
      isFullScreen: false,
      person: person,
      isPlaying: false
    };
  }

  switchImg(e) {
    e.preventDefault();
    let isFullScreen = this.state.isFullScreen;
    this.setState({
      isFullScreen: !isFullScreen
    });
  }

  playAudio(text) {
    if (this.state.isPlaying) return;
    text = encodeURI(text);
    let audio = new Audio('http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=9&spd=6&tex=' + text);
    audio.play();
    let audioInterval = setInterval(function() {
      if (audio.paused) clearInterval(audioInterval);
      this.setState({
        isPlaying: !audio.paused
      });
    }.bind(this), 250);
  }

  render() {
    const state = this.state;
    const info = state.person;
    const etcInfo = info.desc;
    const birthday = etcInfo.birthday;
    let isFullScreen = state.isFullScreen;
    let isPlaying = state.isPlaying;

    return (
      <div className="person-info-container">
        <div className={'person-img' + (isFullScreen ? ' full-screen' : '')}>
          <a onClick={e => this.switchImg(e)} href={info.url ? info.url : 'weixin://'}>
            <img src={info.icon} />
          </a>

          {isFullScreen?<SimilarPic url={info.icon} />:''}
        </div>
        <div className={'person-card' + (isFullScreen ? ' full-screen' : '')}>
          <div className="title">
            <span className="lemma-title">{info.title}</span>
            <span className={'voice-play' + (isPlaying ? ' gray-text' : '') + (isFullScreen ? ' hidden' : '')} onClick={this.playAudio.bind(this, `${info.title}${birthday?'出生在'+birthday+'，今年'+getAgeFromBirth(birthday)+'岁':''}`)}>
              <span className={'btn-icon' + (isPlaying ? ' playing' : '')}></span>语音播报
            </span>
          </div>
        </div>
        <div className={'base-info' + (isFullScreen ? ' hidden' : '')}>
          <ul>
            <li>
              <div className="info-title">中文名</div>
              <div className="info-content">{info.title}</div>
            </li>
            {
              etcInfo.en ?
                <li>
                  <div className="info-title">英文名</div>
                  <div className="info-content">{etcInfo.en}</div>
                </li> : ''
            }
            {
              birthday ?
                <li>
                  <div className="info-title">出生日期</div>
                  <div className="info-content">{birthday}</div>
                </li> : ''
            }
            {
              birthday ?
                <li>
                  <div className="info-title">年龄</div>
                  <div className="info-content">{getAgeFromBirth(birthday)}岁</div>
                </li> : ''
            }
            {
              birthday ?
                <li>
                  <div className="info-title">生肖</div>
                  <div className="info-content">{getChineseZodiac(birthday).symbol+getChineseZodiac(birthday).cn}({getChineseZodiac(birthday).en})</div>
                </li> : ''
            }
            {
              birthday ?
                <li>
                  <div className="info-title">星座</div>
                  <div className="info-content">{getConstellation(birthday).symbol+getConstellation(birthday).cn}({getConstellation(birthday).en})</div>
                </li> : ''
            }
          </ul>
        </div>

        <footer className="footer">
          <div className="grid-area" onClick={this.props.hideInfo}>
            <span>&lt; 返回</span>
          </div>
          <div className="grid-area simipic">
            <a onClick={e => this.switchImg(e)}>
              <span>{isFullScreen?'还原 >':'🔍🖼'}</span>
            </a>
          </div>
          <div className="grid-area message">
            <a href="weixin://">
              <span>^ 群聊 ^</span>
            </a>
          </div>
        </footer>
      </div>
    );
  }

}

PersonInfo.propTypes = {
  person: React.PropTypes.object,
  hideInfo: React.PropTypes.func
};

export default PersonInfo;