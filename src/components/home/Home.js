import React from "react";
import { CharTokens } from "./CharTokens";
import CharCard from "./CharCard";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Logo } from "../../constants/logo";
import { Link } from "react-router-dom";

function Home() {
  function characterToken() {
    return CharTokens.map(charToken => {
      const { id, src, alt, name } = charToken;

      return <CharCard id={id} key={id} image={src} alt={alt} name={name} />;
    });
  }

  return (
    <div>
      <header role="banner" className="container-fluid [ header ]">
        <img src={Logo.src} alt={Logo.alt} className="[ header__logo ]" />
      </header>
      <div className="container tokens">
        <h2 className="text-center">Select a Token</h2>
        <Row id="banner" as="main" role="main">
          {characterToken()}
        </Row>
        <Link to="../gameBoard/GameBoard">
          <Button type="submit" className="btnPlay" id="playBtn" role="button">
            Play Game
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
