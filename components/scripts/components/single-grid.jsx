import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  const item = props.item;

  return (
    <Link to={item.url} className="grid-container text-center">
      <p>{item.title}</p>
    </Link>
  );
};