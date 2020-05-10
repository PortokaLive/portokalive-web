import React from "react";
import { Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./utils/actions/actionUser";

export const NotFound = () => {
  return (
    <Container>
      <Col lg={{ span: 6, offset: 3 }} xs={12}>
        <h1>
          4<span>0</span>4
        </h1>
        <h2>
          Page Not Found, <Link to="/">Back to Home</Link>
        </h2>
      </Col>
    </Container>
  );
};
