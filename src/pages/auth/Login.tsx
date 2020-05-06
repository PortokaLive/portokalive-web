import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import { loginUser as doLoginUser } from "../../actions/authActions";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector } from "../../store";

export const Login = ({ history }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, [auth]);

  const onChange = (e: any) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.vaue);
        break;
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const loginUser = {
      email,
      password,
    };
    doLoginUser(loginUser, history);
  };

  return (
    <>
      <video className="background__video" autoPlay muted loop>
        <source
          src={require("../../assets/img/background.mp4")}
          type="video/mp4"
        />
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
          <Form onSubmit={onSubmit} className="mt-5">
            <Form.Group as={Row} controlId="email">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  isInvalid={!!errors.email}
                  onChange={onChange}
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
                  value={password}
                  isInvalid={!!errors.password}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Button
              block
              variant="primary"
              type="submit"
              className="mt-5"
            >
              <FaSignInAlt style={{ fontSize: "20px", marginRight: "10px" }} />
              Login to Dashboard
            </Button>
            <p className="text-center mt-1">
              No Account Yet? <Link to="/register">Sign up here</Link>{" "}
            </p>
          </Form>
        </Card>
      </Container>
    </>
  );
};
