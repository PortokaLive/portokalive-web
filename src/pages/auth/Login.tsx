import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Form,
  Col,
  Row,
  Card,
  Spinner,
} from "react-bootstrap";
import { loginUser as doLoginUser } from "../../utils/actions/actionUser";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector } from "../../utils/store";
import { emailRegex } from "../../utils/regex";
import { LogoImage } from "../../components/LogoImage";

export const Login = ({ history }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);
  const success = useSelector((state) => state.success);
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        onValidate(e.target.id, e.target.value);
        onValidateEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        onValidate(e.target.id, e.target.value);
        break;
    }
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const loginUser = {
      email,
      password,
    };
    doLoginUser(loginUser, history);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/app");
    }
  }, [auth, history]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [error,success]);

  return (
    <>
      <video className="background__video" autoPlay muted loop>
        <source
          src={require("../../assets/img/background.mp4")}
          type="video/mp4"
        />
      </video>
      <Container className="background__glassy--medium background__video d-flex flex-column wrapper justify-content-center align-items-center">
        <Card className="card__auth p-sm-3 p-md-4 background__glassy--low">
          <LogoImage />
          <span className="text-center h6 font-weight-light">
            Login to
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
                  defaultValue={email}
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
                  placeholder="Enter your password"
                  defaultValue={password}
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
            <p>
              <small>
                Forgot your <a href="/forgot-password">password</a>?
              </small>
            </p>
            <Button block variant="primary" type="submit" className="mt-4">
              {!!loading && (
                <Spinner animation="border" size="sm" className="mr-2" />
              )}
              {!loading && (
                <FaSignInAlt className="mr-2" style={{ fontSize: "20px" }} />
              )}
              Login to Dashboard
            </Button>
            <p className="text-center mt-3">
              No Account Yet? <Link to="/register">Sign up here</Link>{" "}
            </p>
          </Form>
        </Card>
      </Container>
    </>
  );
};
