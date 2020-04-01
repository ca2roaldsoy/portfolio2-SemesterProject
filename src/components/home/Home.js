import React from "react";
import { CharTokens } from "./CharTokens";
import CharCard from "./CharCard";
import Row from "react-bootstrap/Row";
import { Logo } from "../../constants/logo";

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
      </div>
    </div>
  );
}

export default Home;
