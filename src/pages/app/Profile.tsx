import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "../../utils/store";

export const Profile = () => {
  const auth = useSelector<any>((state) => state?.auth?.user);

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Card>
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <Row>
            <Col>
              <Card.Text className="p-2 font-weight-bold">Email</Card.Text>
            </Col>
            <Col>
              <Card.Text className="p-2 text-left">{auth?.email}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text className="p-2 font-weight-bold">Activated</Card.Text>
            </Col>
            <Col>
              <Card.Text className="p-2 text-left">
                <h4>
                  {auth?.activated ? (
                    <FaCheckCircle color="limegreen" />
                  ) : (
                    <IoMdClose />
                  )}
                </h4>
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text className="p-2 font-weight-bold">
                Live Stream ID
              </Card.Text>
            </Col>
            <Col>
              <Card.Text className="p-2 text-left">
                {auth?.liveStreamId}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
