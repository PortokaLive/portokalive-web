import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { sendActivationEmail } from "../../utils/actions/actionUser";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../utils/store";

export const SendActivation = () => {
  const queries = new URLSearchParams(useLocation().search);
  const email = queries.get("email");
  const error = useSelector((state) => state.error);
  const success = useSelector((state) => state.success);

  useEffect(() => {
    if (!email) {
      window.close();
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      sendActivationEmail(email);
    }
  }, [email]);

  useEffect(() => {
    if (error.name && error.message) {
      setTimeout(() => {
        window.close();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }, 1000);
    }
  }, [error]);

  useEffect(() => {
    if (success.name && success.message) {
      setTimeout(() => {
        window.close();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }, 1000);
    }
  }, [success]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center wrapper">
      <p>We are sending you another email.</p>
      <div>
        <Spinner variant="primary" animation="border" />
      </div>
    </div>
  );
};
