import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="app-user-profile-splitter">
      <Link to="/"><i className="fas fa-th"></i> POSTS</Link>
      <Link to="/"><i className="fas fa-tv"></i> IGTV</Link>
      <Link to="/"><i className="far fa-bookmark"></i>SAVED</Link>
      <Link to="/"><i className="fal fa-id-card-alt"></i> TAGGED</Link>
    </div>
  )
};