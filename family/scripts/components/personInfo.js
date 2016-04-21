import React from 'react';

const PersonInfo = (props) => {
  const info = props.person;
  return (
    <div className="person-info-container">
      <div className="person-img">
        <img src={info.photo} />
      </div>
      <div className="person-card">
        <div className="title">
          <span className="lemma-title">{info.name}</span>
        </div>
      </div>
      <div className="base-info">
        <ul>
          <li>
            <div className="info-title">中文名</div>
            <div className="info-content">{info.name}</div>
          </li>
          <li>
            <div className="info-title">出生日期</div>
            <div className="info-content">{info.birthday}</div>
          </li>
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