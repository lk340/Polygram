import React from 'react';

export default (props) => {
  let footer = "footer-container";
  let footerLinks = "footer-links";
  let footerCopy = "footer-copy";

  // if (props.footerPath === "/") {
  //   footer += " splashFooter";
  //   footerLinks = " splashFooter";
  //   footerCopy += " splashFooter splashFooterCopy";
  // }

  return (
    <footer className={ footer } >
      <div className={ footerLinks }>
        <a href="#">ABOUT US</a> &nbsp; &nbsp;
        <a href="#">SUPPORT</a> &nbsp; &nbsp;
        <a href="#">PRESS</a> &nbsp; &nbsp;
        <a href="#">API</a> &nbsp; &nbsp;
        <a href="#">JOBS</a> &nbsp; &nbsp;
        <a href="#">PRIVACY</a> &nbsp; &nbsp;
        <a href="#">TERMS</a> &nbsp; &nbsp;
        <a href="#">DIRECTORY</a> &nbsp; &nbsp;
        <a href="#">PROFILES</a> &nbsp; &nbsp;
        <a href="#">HASHTAGS</a> &nbsp; &nbsp;
        <a href="#">LANGUAGE</a>
        <a className={ footerCopy }>&copy; 2019 POLYGRAM</a>

        {/* <div className="copyright"> */}
        {/* </div> */}
      </div>

      
    </footer>
  )
}