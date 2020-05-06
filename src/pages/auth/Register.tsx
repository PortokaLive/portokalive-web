import React, { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
import { registerUser } from "../../actions/authActions";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useSelector } from "../../store";
import { emailRegex } from "../../utils/regex";
import { LogoImage } from "../../components/LogoImage";

export const Register = ({ history }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const inititalError = { email: "", password: "" };

  const reducerError = (state: any = inititalError, action: any) => {
    switch (action.type) {
      case "email":
        return Object.assign({}, state, { email: action.payload });
      case "password":
        return Object.assign({}, state, { password: action.payload });
      default:
        return state;
    }
  };

  const [errors, setErrors] = useReducer(reducerError, inititalError);

  const onValidate = (id: string, value: any) => {
    if (!value) {
      setErrors({
        type: id,
        payload: `${id.toProperCase()} is required`,
      });
    } else {
      setErrors({
        type: id,
        payload: "",
      });
    }
  };

  const onValidateEmail = (value: string) => {
    if (!emailRegex.test(value) && value) {
      setErrors({
        type: "email",
        payload: "Invalid email",
      });
    }
  };

  const onChange = (e: any) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        onValidate(e.target.id, e.target.value);
        onValidateEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.vaue);
        onValidate(e.target.id, e.target.value);
        break;
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    registerUser(newUser, history);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/app");
    }
  }, [auth, history]);

  return (
    <>
      <video className="background__video" autoPlay muted loop>
        <source
          src={require("../../assets/img/background.mp4")}
          type="video/mp4"
        />
      </video>
      <Container className="background__glassy--medium background__video wrapper d-flex flex-column justify-content-center align-items-center">
        <Card className="card__auth p-sm-3 p-md-4 background__glassy--low">
          <LogoImage />
          <span className="text-center h6 font-weight-light">
            Sign up on
            <br />
            <span className="h2 font-weight-bold">
              <span className="text-primary">Portoka</span>Live
            </span>
          </span>
          <Form onSubmit={onSubmit} className="mt-2">
            <Form.Group as={Row} controlId="email">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  isInvalid={!!errors.email}
                  onChange={onChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="password">
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  isInvalid={!!errors.password}
                  onChange={onChange}
                  required
                  autoComplete="true"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="checkbox">
              <Col>
                <small>
                  <Form.Check
                    required
                    type="checkbox"
                    label={
                      <>
                        I agree all the{" "}
                        <a href="/terms-and-condition" target="__blank">
                          terms & condition
                        </a>
                      </>
                    }
                  />
                </small>
              </Col>
            </Form.Group>
            <Button block variant="primary" type="submit">
              <IoIosCheckmarkCircle
                style={{ fontSize: "20px", marginRight: "10px" }}
              />
              Register
            </Button>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>{" "}
            </p>
          </Form>
        </Card>
      </Container>
    </>
  );
};
