import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Button, Form, Col, Row, Card } from 'react-bootstrap'
import logo from '../../assets/img/logo.png'
import { loginUser } from '../../actions/authActions'
import { FaSignInAlt } from 'react-icons/fa'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      <>
        <video className="background__video" autoPlay muted loop>
          <source src={require('../../assets/img/background.mp4')} type="video/mp4" />
        </video>
        <Container className="background__glassy--medium background__video d-flex flex-column wrapper justify-content-center align-items-center">
          <Card className="p-5 background__glassy--low">
            <div className="justify-content-center d-flex">
              <img
                src={logo}
                width="150"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </div>
            <h2>Login to PortokaLive</h2>
            <Form onSubmit={this.onSubmit} className="mt-5">
              <Form.Group as={Row} controlId="email">
                <Col><Form.Control type="text" placeholder="Enter your email" value={this.state.username}
                  isInvalid={!!errors.email} onChange={this.onChange} />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="password">
                <Col>
                  <Form.Control type="password" placeholder="Enter your password" value={this.state.password}
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
          </Card>
        </Container>
      </>
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