import React from 'react';
import logo from "../assets/img/logo.png";

export const LogoImage = () => (
  <div className="justify-content-center d-flex">
    <img
      src={logo}
      width="150"
      className="d-inline-block align-top"
      alt="Logo"
    />
  </div>
)