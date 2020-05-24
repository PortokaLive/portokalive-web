import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "../utils/store";
import { LogoImage } from "../components/LogoImage";

export const Landing = ({ history }: any) => {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/app");
    }
  }, [auth, history]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center wrapper">
      <LogoImage width={200} />
      <NavLink to="/app">Start the app</NavLink>
    </Container>
  );
};
