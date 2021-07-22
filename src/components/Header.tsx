import React, { useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";
import { LogoImage } from "./LogoImage";
import { useSelector } from "../utils/store";
import { logoutUser } from "../utils/actions/actionUser";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { sx } from "../utils/style";

const classes = sx.createStyles({
  buttons: {
    position: "absolute",
    right: "16px",
    top: "16px",
  },
});

export const Header = ({ landing = false }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated && !landing) {
      history.push("/login");
    }
  }, [isAuthenticated, history, landing]);

  const handleDirectToProfile = () => {
    history.push("/profile");
  };

  const handleDirectToLogin = () => {
    history.push("/login");
  };

  const handleDirectToRegister = () => {
    history.push("/register");
  };

  const isSm = window.matchMedia("(max-width:456px)").matches;

  return (
    <Navbar
      className="shadow-sm d-flex position-relative"
      bg="light"
      fixed="top"
      expand="lg">
      <Navbar.Brand
        href={landing ? "/" : "/app"}
        className="d-flex align-items-center">
        <LogoImage width={40} />
        <h2>
          <span style={{ color: "#ff7300" }}>Portoka</span>Live
        </h2>
      </Navbar.Brand>
      <div className={classes.buttons + " d-flex justify-content-end"}>
        {!!landing && !isSm && (
          <>
            <Button
              variant="outline-primary"
              className="mx-2"
              style={{ width: "100px" }}
              onClick={handleDirectToLogin}>
              Login
            </Button>
            <Button
              variant="primary"
              className="mx-2"
              style={{ width: "100px" }}
              onClick={handleDirectToRegister}>
              Register
            </Button>
          </>
        )}
        {!landing && (
          <>
            <div
              className="rounded-circle avatar mx-3 btn"
              onClick={handleDirectToProfile}>
              <h4>
                <FaUser className="text-white" />
              </h4>
            </div>
            {!isSm && (
              <Button variant="outline-primary" onClick={logoutUser}>
                <FaSignOutAlt className="mr-2" style={{ fontSize: "20px" }} />
                Logout
              </Button>
            )}
          </>
        )}
      </div>
    </Navbar>
  );
};
