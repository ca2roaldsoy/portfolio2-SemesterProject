import React from "react";
import { CharTokens } from "./CharTokens";
import CharCard from "./CharCard";
import Row from "react-bootstrap/Row";

function Home() {
  console.log(CharTokens);

  function characterToken() {
    return CharTokens.map(charToken => {
      const { id, src, alt } = charToken;
      console.log(charToken);

      return <CharCard key={id} image={src} alt={alt} />;
    });
  }

  return (
    <Row as="main" role="main" id="banner">
      {characterToken()}
    </Row>
  );
}
export default Home;
