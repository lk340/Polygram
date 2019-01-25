import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="upload-bar" >
      <div><Link to="/"> { <i class="fas fa-home"></i> } </Link></div>
      <div><Link to="/"> { <i class="fas fa-search"></i> } </Link></div>
      <div><Link to="/"> { <i class="far fa-plus-square"></i> } </Link></div>
      <div><Link to="/"> { <i class="far fa-heart"></i> } </Link></div>
      <div><Link to="/"> { <i class="far fa-user"></i> } </Link></div>
    </div>
  )
}