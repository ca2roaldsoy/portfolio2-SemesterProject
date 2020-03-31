import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { GoTApi } from "../../constants/api";

function CharCard({ id, image, alt }) {
  const [character, setCharacter] = useState([]);
  const url = GoTApi + id;

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCharacter(data);
      })
      .catch(err => console.log(err));
  }, [url]);

  if (character.titles === " ") {
    return character.titles === "unknown";
  }

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
          <Card.Body>
            <Card.Title className="text-center">{character.name}</Card.Title>
            <Card.Text className="text-center">
              Title: {character.titles}
            </Card.Text>
          </Card.Body>
        </Form.Label>
      </Form.Group>
    </Col>
  );
}

export default CharCard;
