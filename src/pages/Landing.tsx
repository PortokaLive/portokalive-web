import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

export const Landing = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center wrapper">
      <h1 className="logo"><span role="img" aria-label="logo-emoji">🍊</span>
      PortokaLive
      </h1>
      <NavLink to="/login">Start the app</NavLink>
    </Container>
  )
}