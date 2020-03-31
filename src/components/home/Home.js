import React, { useEffect } from "react";
import { CharTokens } from "./CharTokens";
import CharCard from "./CharCard";
import Row from "react-bootstrap/Row";
import { Logo } from "../../constants/logo";

function Home() {
  function characterToken() {
    return CharTokens.map(charToken => {
      const { id, src, alt } = charToken;

      return <CharCard id={id} key={id} image={src} alt={alt} />;
    });
  }

  return (
    <div id="select_character">
      <header role="banner" className="container-fluid [ header ]">
        <img src={Logo.src} alt={Logo.alt} className="[ header__logo ]" />
      </header>
      <div className="container tokens">
        <main role="main">
          <Row id="banner">{characterToken()}</Row>
        </main>
      </div>
    </div>
  );
}

export default Home;
