import React from 'react';

export default (props) => {
  let footerContainer = "footer-container";
  let footerLinks = "footer-links";
  let footerCopy = "footer-copy";

  // if (props.footerPath === "/") {
  //   footer += " splashFooter";
  //   footerLinks = " splashFooter";
  //   footerCopy += " splashFooter splashFooterCopy";
  // }

  return (
    <footer className={ footerContainer } >
      <nav>
        {/* <div className={footerLinks}> */}
          {/* <a href="#">ABOUT US</a> &nbsp; &nbsp;
          <a href="#">SUPPORT</a> &nbsp; &nbsp;
          <a href="#">PRESS</a> &nbsp; &nbsp;
          <a href="#">API</a> &nbsp; &nbsp;
          <a href="#">JOBS</a> &nbsp; &nbsp;
          <a href="#">PRIVACY</a> &nbsp; &nbsp;
          <a href="#">TERMS</a> &nbsp; &nbsp;
          <a href="#">DIRECTORY</a> &nbsp; &nbsp;
          <a href="#">PROFILES</a> &nbsp; &nbsp;
          <a href="#">HASHTAGS</a> &nbsp; &nbsp;
          <a href="#">LANGUAGE</a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a className={footerCopy}>&copy; 2019 POLYGRAM</a> */}

        <div className={footerLinks}>
          <a href="https://github.com/lk340" target="_blank">GITHUB</a> &nbsp; &nbsp;
          <a href="#" target="_blank">LINKEDIN</a> &nbsp; &nbsp;
          <a href="https://www.instagram.com/" target="_blank">INSTAGRAM</a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a className={footerCopy}>&copy; 2019 POLYGRAM</a>
        </div>
      </nav>
      
    </footer>
  )
}