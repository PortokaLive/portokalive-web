import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "../utils/store";

export const ErrorInjector = () => {
  const error = useSelector((state) => state.error);
  const [showError, setShowError] = useState(false);

  const handleClose = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (error.name && error.message) {
      setTimeout(() => {
        setShowError(true);
      }, 500);
    }
  }, [error]);

  return (
    <Modal
      show={showError}
      centered
      onHide={handleClose}
      className="text-center"
    >
      <div className="p-3">
        <p className="h5 py-3 font-weight-bold">{error.message}</p>
        <div className="px-5 mx-5">
          <Button onClick={handleClose} block variant="danger">
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};
