import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="app-user-profile-splitter">
      {/* <Link to="/"><i className="fas fa-th"></i> POSTS</Link>
      <Link to="/"><i className="fas fa-tv"></i> IGTV</Link>
      <Link to="/"><i className="far fa-bookmark"></i>SAVED</Link>
      <Link to="/"><i className="fal fa-id-card-alt"></i> TAGGED</Link> */}
      <a href="#"><i className="fas fa-home"></i> HOMEPAGE</a>
      <a href="https://github.com/lk340" target="_blank"><i className="fab fa-github-square"></i> GITHUB</a>
      <a href="https://www.linkedin.com/in/loyd-k-b58176166/" target="_blank"><i className="fab fa-linkedin"></i> LINKEDIN</a>
      {/* <a href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i> INSTAGRAM</a> */}
      <a href="https://angel.co/loyd-kim-1?al_content=view+your+profile&al_source=transaction_feed%2Fnetwork_sidebar" target="_blank"><i class="fab fa-angellist"></i> ANGEL-LIST</a>
      <a href="http://www.loydkim.com/" target="_blank"><i class="fas fa-paper-plane"></i> WEBSITE</a>
    </div>
  )
};