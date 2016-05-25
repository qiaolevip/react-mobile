import React from 'react';
import Grids from '../components/grids.jsx';

export default () => {
  const homeMenu = [
    {title: '悟空优惠券', url: 'wukong-coupon'}
  ];

  return (
    <div className="home-container">
      <h1 className="page-title text-center">欢迎进入&lt;组件库&gt;</h1>
      <Grids list={homeMenu} />
    </div>
  );
};