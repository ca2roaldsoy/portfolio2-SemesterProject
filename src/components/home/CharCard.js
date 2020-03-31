import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function CharCard({ id, image, alt }) {
  return (
    <Col as="section" sm={4} lg={3} className="[ characters ]">
      <Form.Group as={Col}>
        <Form.Label className="[ characters__container ] card">
          <Form.Check
            disabled
            type="radio"
            name="token"
            className="[ characters__token ]"
          />
          <Card.Img variant="top" src={image} alt={alt} />
          <Card.Body></Card.Body>
        </Form.Label>
      </Form.Group>
    </Col>
  );
}

export default CharCard;
