import React from 'react'
import { Container, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import store from "./store";
import { setCurrentUser, logoutUser } from './actions/authActions'

if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token') || '';
  const decoded = jwt_decode<any>(token);
  store.dispatch(setCurrentUser(decoded))
  const currenDate = Date.now() / 1000;

  if (decoded.exp < currenDate) {
    logoutUser();
    window.location.href = './login'
  }
}

export const NotFound = () => {
  return (
    <Container>
      <Col lg={{ span: 6, offset: 3 }} xs={12}>
        <h1>4<span>0</span>4</h1>
        <h2>Page Not Found, <Link to="/">Back to Home</Link></h2>
      </Col>
    </Container>
  );
}