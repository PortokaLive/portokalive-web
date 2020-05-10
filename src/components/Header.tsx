import React from "react";
import { Navbar } from "react-bootstrap";
import { LogoImage } from "./LogoImage";

export const Header = () => {
  return (
    <Navbar className="shadow-sm" bg="light" fixed="top" expand="lg">
      <Navbar.Brand href="/app" className="d-flex align-items-center">
        <LogoImage width={40} />
        <h2>
          <span style={{ color: "orange" }}>Portoka</span>Live
        </h2>
      </Navbar.Brand>
    </Navbar>
  );
};
