import React from "react";
import logo from "../assets/img/logo.png";

export const LogoImage = ({ width }: any) => (
  <div className="justify-content-center d-flex">
    <img
      src={logo}
      width={width}
      className="d-inline-block align-top"
      alt="Logo"
    />
  </div>
);
