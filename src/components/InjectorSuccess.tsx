import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "../utils/store";

export const SuccessInjector = () => {
  const success = useSelector((state) => state.success);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (success.name && success.message) {
      setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, [success]);

  return (
    <Modal show={show} centered onHide={handleClose} className="text-center">
      <div className="p-3">
        <p className="h4 font-weight-bold">{success.name}</p>
        <p
          className="h5 py-3"
          dangerouslySetInnerHTML={{ __html: success.message }}
        ></p>
        <div className="px-5 mx-5">
          <Button onClick={handleClose} block variant="success">
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};
