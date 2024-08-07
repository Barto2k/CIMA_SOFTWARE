import React from 'react';
function Footer() {
  return (
    <footer className="text-center">
    <small>
      <span>© CIMA</span>
      -
      <a >Manual de Uso:</a>
      <a
        className="redes"
        href="https://docs.google.com/document/d/19PHAawEcubsAnwuMOVvFGt5AmghGR33AY2Z4wQg2wA0/edit?usp=sharing"
        style={{"backgroundColor": "#5ba4d6"}}
        target="_blank"
      >
        <i title="Docs" className="fas fa-book-bookmark"></i>
      </a>
    </small>
  </footer>

  );
}
export { Footer };
