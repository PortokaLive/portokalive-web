import React from 'react'
import { Navbar, Button, Modal, DropdownButton, Dropdown, Col, Form, Row, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Map from './Map'
import Live from './Live'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import logo from '../assets/img/logo.webp'
import { logoutUser, deleteUser, editUser } from '../actions/authActions'
import store from "../store";

class Entry extends React.Component {
  state = {
    showLogout: false,
    showDeactivate: false,
    showEditProfile: false,
    errors: {},
    password: '',
    passwordConfirm: '',
    fullname: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ errors: nextProps.errors })
    }
  }
  componentDidMount() {
    this.setState({ fullname: this.props.auth.user.fullname })
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onClickLogout = () => {
    this.handleShowLogout();
  }
  onClickEditProfile = () => {
    this.setState({ errors: {} })
    this.handleShowEditProfile();
  }
  onClickDeactivateAccount = () => {
    this.handleShowDeactivate();
  }

  handleCloseLogout = () => this.setState({ showLogout: false });
  handleShowLogout = () => this.setState({ showLogout: true });
  handleCloseDeactivate = () => this.setState({ showDeactivate: false });
  handleShowDeactivate = () => this.setState({ showDeactivate: true });
  handleCloseEditProfile = () => this.setState({ showEditProfile: false });
  handleShowEditProfile = () => this.setState({ showEditProfile: true });


  deleteUser = e => {
    e.preventDefault();
    store.dispatch(deleteUser({ password: this.state.passwordConfirm }))
  }
  editProfile = e => {
    e.preventDefault();
    store.dispatch(editUser({ fullname: this.state.fullname, password: this.state.password }))
  }
  logoutUser = () => {
    store.dispatch(logoutUser())
    window.location.href = './login'
  }

  render() {
    const { errors } = this.state;
    return (
      <Router>
        <div className="App wrapper">
          <Navbar bg="light" fixed="top" expand="lg">
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="100"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as:
    </Navbar.Text>
              <DropdownButton variant="secondary" style={{ marginRight: "20px", color: 'orange' }} id="dropdown"
                title={`${this.props.auth.user.fullname}@${this.props.auth.user.company}`}>
                <Dropdown.Item onClick={this.onClickEditProfile}>Edit Profile</Dropdown.Item>
                <Dropdown.Item onClick={this.onClickDeactivateAccount}>Deactivate Account</Dropdown.Item>
              </DropdownButton>
              <Button variant="outline-primary" onClick={this.onClickLogout}>Logout</Button>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route path="/live" component={Live} />
          </Switch>
          <Modal show={this.state.showLogout} onHide={this.handleCloseLogout}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to logout?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseLogout}>
                Close
          </Button>
              <Button variant="primary" onClick={this.logoutUser}>
                Proceed
          </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showDeactivate} onHide={this.handleCloseDeactivate}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to deactivate your account?<br />
        You need to enter your <strong>password</strong> to deactivate your account.</Modal.Body>
            <Modal.Body> <Form onSubmit={this.deleteUser}><Form.Group as={Row} controlId="passwordConfirm">
              <Form.Label column sm="4">Password</Form.Label>
              <Col sm="8"><Form.Control type="password" placeholder="Enter your password" value={this.state.passwordConfirm}
                isInvalid={!!errors.password} onChange={this.onChange} />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback></Col>
            </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseDeactivate}>
                  Close
          </Button>
                <Button variant="primary" type="submit">
                  Proceed
          </Button>
              </Modal.Footer></Form>
            </Modal.Body>
          </Modal>
          <Modal show={this.state.showEditProfile} onHide={this.handleCloseEditProfile}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            {errors.success ? <Alert variant="success">
              Success Updating Profile!
        </Alert> : <div></div>}
            <Modal.Body> <Form onSubmit={this.editProfile}><Form.Group as={Row} controlId="fullname">
              <Form.Label column sm="4">Full Name</Form.Label>
              <Col sm="8"><Form.Control type="text" placeholder="Enter your full name" value={this.state.fullname}
                isInvalid={!!errors.fullname} onChange={this.onChange} />
                <Form.Control.Feedback type="invalid">
                  {errors.fullname}
                </Form.Control.Feedback></Col>
            </Form.Group>
              <Form.Group as={Row} controlId="password">
                <Form.Label column sm="4">Password</Form.Label>
                <Col sm="8"><Form.Control required type="password" placeholder="Enter your password" value={this.state.password}
                  isInvalid={!!errors.password} onChange={this.onChange} />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback></Col>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseEditProfile}>
                  Close
          </Button>
                <Button variant="primary" type="submit">
                  Update
          </Button>
              </Modal.Footer></Form>
            </Modal.Body>
          </Modal>
        </div>
      </Router>
    )
  }
}

Entry.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps)(Entry);