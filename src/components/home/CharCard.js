import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GoTApi } from "../../constants/api";

function CharCard({ id, image, alt, name }) {
  const [character, setCharacter] = useState([]);
  let [selected, setSelected] = useState(false);
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

  let selection = document.querySelector("input[name='token']:checked");
  console.log(selection);

  const handleStorage = () => {
    //Save to Local Storage
    localStorage.setItem("player", name);
  };

  return (
    <>
      <Col as="section" sm={6} md={4} lg={3} className="[ characters ]">
        <Form.Label className="[ characters__container ] card">
          <input
            type="radio"
            name="token"
            className="[ characters__token ]"
            defaultChecked={selected ? "checked" : !selected}
          />
          <Card.Img
            variant="top"
            src={image}
            alt={alt}
            className={`img-responsive [ characters__token--img ] img-fluid ${
              selection !== null ? "glow" : ""
            } `}
            onClick={handleStorage}
          />
          <Card.Body>
            <Card.Title className="text-center">{character.name}</Card.Title>
            <Card.Text className="text-center">
              Title: {character.titles}
            </Card.Text>
          </Card.Body>
        </Form.Label>
      </Col>

      <Col>
        <Button type="submit" className="btnPlay" id="playBtn" role="button">
          Play Game
        </Button>
      </Col>
    </>
  );
}

export default CharCard;
