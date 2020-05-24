import React, { useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";
import { LogoImage } from "./LogoImage";
import { useSelector } from "../utils/store";
import { logoutUser } from "../utils/actions/actionUser";
import { FaSignOutAlt } from "react-icons/fa";

export const Header = ({ history }: any) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated, history]);

  return (
    <Navbar className="shadow-sm" bg="light" fixed="top" expand="lg">
      <Navbar.Brand href="/app" className="d-flex align-items-center">
        <LogoImage width={40} />
        <h2>
          <span style={{ color: "orange" }}>Portoka</span>Live
        </h2>
      </Navbar.Brand>
      <div className="d-flex w-100 justify-content-end">
        <Button variant="outline-primary" onClick={logoutUser}>
          <FaSignOutAlt className="mr-2" style={{ fontSize: "20px" }} />
          Logout
        </Button>
      </div>
    </Navbar>
  );
};
