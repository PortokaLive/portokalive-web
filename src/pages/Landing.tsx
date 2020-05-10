import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "../utils/store";

export const Landing = ({ history }: any) => {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/app");
    }
  }, [auth, history]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center wrapper">
      <h1 className="logo">
        <span role="img" aria-label="logo-emoji">
          🍊
        </span>
        PortokaLive
      </h1>
      <NavLink to="/app">Start the app</NavLink>
    </Container>
  );
};
