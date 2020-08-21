import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';

const Footer = () => {
  return (
    <MDBFooter
      color="backgroundFooterColor"
      id="footer-portal"
      className="font-small pt-4 mt-4 center-on-small-only pt-0 mt-5 fixed-bottom"
    >
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href="https://www.esfera.com.vc">
            {' '}
            esfera.com.vc / App version {process.env.REACT_APP_VERSION}
          </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
