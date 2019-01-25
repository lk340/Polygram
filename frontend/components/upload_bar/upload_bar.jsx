import React from 'react';
import { Link } from 'react-router-dom';

// REMINDER: THIS IS FOR MOBILE VERSION (when width becomes small enough)!

export default () => {
  return (
    <div className="upload-bar" >
      <div><Link to="/"> { <i className="fas fa-home"></i> } </Link></div>
      <div><Link to="/"> { <i className="fas fa-search"></i> } </Link></div>
      <div><Link to="/uploadpost"> { <i className="far fa-plus-square"></i> } </Link></div>
      <div><Link to="/"> { <i className="far fa-heart"></i> } </Link></div>
      <div><Link to="/"> { <i className="far fa-user"></i> } </Link></div>
    </div>
  )
}