import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter,Link } from 'react-router-dom'
import { Container,Button,Form,Col,Row,Alert } from 'react-bootstrap'
import logo from '../../assets/img/logo.webp'
import { registerUser } from '../../actions/authActions'
import { IoIosCheckmarkCircle } from 'react-icons/io'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      company: "",
      username: "",
      fullname: "",
      password: "",
      passwordConfirm: "",
      errors: {}
    };
  }

componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.history.push('/');
  }
}

componentWillReceiveProps(nextProps) {
    if(nextProps){
        this.setState({errors:nextProps.errors})
    }
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      company: this.state.company,
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };
console.log(newUser);
this.props.registerUser(newUser,this.props.history);
  };
render() {
    const { errors } = this.state;
return (
    <Container>
        <Col lg={{ span: 6, offset: 3 }} xs={12}>
        { errors.alert ? <Alert variant="danger">
       {errors.alert}
       </Alert> : <div></div>}
            <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
        <img
        src={logo}
        width="150"
        className="d-inline-block align-top"
        alt="Logo"
      />
      </div>
      <h2>Sign Up to IFSC</h2>
        <Form onSubmit={this.onSubmit} style={{marginTop:'50px'}}>
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
    <Col sm="8"><Form.Control type="text" placeholder="Enter Username" value={this.state.username}
    isInvalid={!!errors.username}  onChange={this.onChange} />
        <Form.Control.Feedback type="invalid">
        {errors.username}
          </Form.Control.Feedback></Col>
  </Form.Group>
  <Form.Group as={Row} controlId="fullname">
    <Form.Label column sm="4">Full Name</Form.Label>
    <Col sm="8"><Form.Control type="text" placeholder="Enter Full Name" value={this.state.fullname}
    isInvalid={!!errors.fullname}  onChange={this.onChange} />
        <Form.Control.Feedback type="invalid">
        {errors.fullname}
          </Form.Control.Feedback></Col>
  </Form.Group>
  <Form.Group as={Row} controlId="password">
    <Form.Label column sm="4">Password</Form.Label>
    <Col sm="8">
    <Form.Control type="password" placeholder="Enter Password" value={this.state.password}
    isInvalid={!!errors.password}  onChange={this.onChange} />
        <Form.Control.Feedback type="invalid">
        {errors.password}
          </Form.Control.Feedback></Col>
  </Form.Group>
  <Form.Group as={Row} controlId="passwordConfirm">
    <Form.Label column sm="4">Confirm Password</Form.Label>
    <Col sm="8">
    <Form.Control type="password" placeholder="Enter Password Again" value={this.state.passwordConfirm}
    isInvalid={!!errors.passwordConfirm} onChange={this.onChange} />
        <Form.Control.Feedback type="invalid">
        {errors.passwordConfirm}
          </Form.Control.Feedback>
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="checkbox" style={{marginTop:'40px',marginBottom:'30px'}}>
  <Form.Label column sm="3"></Form.Label>
  <Col sm="9">
    <Form.Check required type="checkbox" label="I agree all the Terms & Condition" />
    </Col>
  </Form.Group>
  <Button block variant="primary" type="submit">
      <IoIosCheckmarkCircle style={{fontSize: '20px', marginRight:'10px'}} />
    Register
  </Button>
  <p style={{textAlign:'center',marginTop:'5px'}}>Already have an account? <Link to="/login">Login here</Link> </p>
</Form>
        </Col>
    </Container>
    );
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:   state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    {registerUser})(withRouter(Register));