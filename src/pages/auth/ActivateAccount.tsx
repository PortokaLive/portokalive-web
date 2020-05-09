import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { activateAccount } from "../../utils/actions/actionUser";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../utils/store";

export const ActivateAccount = ({ history }: any) => {
  const queries = new URLSearchParams(useLocation().search);
  const email = queries.get("email");
  const activationCode = queries.get("activationCode");
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (!email || !activationCode) {
      history.push("/login");
    } else {
      activateAccount(email, activationCode, history);
    }
  }, [email, activationCode,history]);

  useEffect(() => {
    if (error.name && error.message) {
      setTimeout(() => {
        history.push("/login");
      }, 1000);
    }
  }, [error,history]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center wrapper">
      <p>Your account is being activated. Please wait.</p>
      <div>
        <Spinner variant="primary" animation="border" />
      </div>
    </div>
  );
};
