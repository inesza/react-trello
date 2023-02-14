import React, { useState } from "react";
import MiniCard from "../Card/MiniCard";
import FormCard from "../Card/FormCard";

const List = () => {
  const [showform, setShowForm] = useState(false);
  const [cards, setCards] = useState([]);

  const addCard = () => {
    setShowForm(true);
  };
  return (
    <section className="list">
      <header>
        <h2>Title</h2>
      </header>
      <main>
        {cards.length !== 0 &&
          cards.map((card) => {
            return <MiniCard />;
          })}
        <FormCard show={showform} />
      </main>
      <footer>
        <button onClick={addCard}>Ajouter une carte</button>
      </footer>
    </section>
  );
};

export default List;
