import React from 'react';
import SingleGrid from './single-grid.jsx';

export default (props) => {
  const list = props.list;//Array.apply(null, {length: 6}).map(Number.call, Number);

  return (
    <div className="grids-container container-area">
      <ul className="inline-ul">
        {
          list.map((item, index) =>
            <li key={index}>
              <SingleGrid item={item} />
            </li>
          )
        }
      </ul>
    </div>
  );
};