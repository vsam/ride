import React from 'react';
import './Loader.css';

export default function Loader(props) {
    let loaderStyle;
    if (!props.loading) {
      loaderStyle = { visibility: 'hidden' };
    }

    return (
        <div className="placeholder" style={loaderStyle}>
          <div className="loader"/>
        </div>
    );
};
