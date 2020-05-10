import React from "react";
import { Navbar } from "react-bootstrap";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export const Home = ({ history }: any) => {
  return (
    <Router>
      <div className="App wrapper">
        <Navbar className="shadow-sm" bg="light" fixed="top" expand="lg">
          <Navbar.Brand href="/app" className="d-flex align-items-center">
            <img
              src={logo}
              width="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <h2>
              <span style={{ color: "orange" }}>Portoka</span>Live
            </h2>
          </Navbar.Brand>
        </Navbar>
        <Switch></Switch>
      </div>
    </Router>
  );
};
