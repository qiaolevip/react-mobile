import React from 'react';
import { goUrl } from '../../../util/spaUtil';

const PersonInfo = (props) => {
  const info = props.person;
  const etcInfo = info.desc;
  return (
    <div className="person-info-container">
      <div className="person-img">
        <a href={info.url ? info.url : 'weixin://dl/chat'}>
          <img src={info.icon} />
        </a>
      </div>
      <div className="person-card">
        <div className="title">
          <span className="lemma-title">{info.title}</span>
        </div>
      </div>
      <div className="base-info">
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
            etcInfo.birthday ?
              <li>
                <div className="info-title">出生日期</div>
                <div className="info-content">{etcInfo.birthday}</div>
              </li> : ''
          }
        </ul>
      </div>

      <footer className="footer">
        <div className="back" onClick={props.hideInfo}>
          <span></span>
        </div>
      </footer>
    </div>
  );
};

export default PersonInfo;