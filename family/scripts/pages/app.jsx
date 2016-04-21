import React from 'react';
import MainPhoto from '../components/mainPhoto';

const App = (props) => {
  return (
    <div className="container">
      <div className="header">
        <h1>我的一家</h1>
        <p>有你，有我，有他</p>
      </div>
      <MainPhoto />
    </div>
  );
};

export default App;