import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Button, Form, Col, Row, Alert } from 'react-bootstrap'
import logo from '../../assets/img/logo.webp'
import { loginUser } from '../../actions/authActions'
import { FaSignInAlt } from 'react-icons/fa'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      company: "",
      username: "",
      password: "",
      passwordConfirm: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const loginUser = {
      company: this.state.company,
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(loginUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <Container>
        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
          {errors.alert ? <Alert variant="danger">
            {errors.alert}
          </Alert> : <div></div>}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <img
              src={logo}
              width="150"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </div>
          <h2>Login to IFSC</h2>
          <Form onSubmit={this.onSubmit} style={{ marginTop: '50px' }}>
            <Form.Group as={Row} controlId="company">
              <Form.Label column sm="4">Company</Form.Label>
              <Col sm="8"><Form.Control type="text" placeholder="Enter Company" value={this.state.company}
                isInvalid={!!errors.company} onChange={this.onChange} />
                <Form.Control.Feedback type="invalid">
                  {errors.company}
                </Form.Control.Feedback></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="username">
              <Form.Label column sm="4">Username</Form.Label>
              <Col sm="8"><Form.Control type="text" placeholder="Enter Company" value={this.state.username}
                isInvalid={!!errors.username} onChange={this.onChange} />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="password">
              <Form.Label column sm="4">Password</Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Enter Password" value={this.state.password}
                  isInvalid={!!errors.password} onChange={this.onChange} />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback></Col>
            </Form.Group>
            <Button block variant="primary" type="submit" style={{ marginTop: '50px' }}>
              <FaSignInAlt style={{ fontSize: '20px', marginRight: '10px' }} />
    Login to Dashboard
  </Button>
            <p style={{ textAlign: 'center', marginTop: '5px' }}>No Account Yet? <Link to="/register">Sign up here</Link> </p>
          </Form>
        </Col>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser })(withRouter(Login));