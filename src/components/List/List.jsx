import React, { useEffect, useState, useRef } from "react";
import MiniCard from "../Card/MiniCard";
import FormCard from "../Card/FormCard";
import service from "../../api/apiHandler";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = ({ status, list, setLists, fetchLists }) => {
  const [showform, setShowForm] = useState(false);
  const [cards, setCards] = useState([]);

  async function fetchCards() {
    await service
      .get(`/lists/${list._id}/cards`)
      .then((res) => setCards(res.data))
      .catch((error) => console.error(error));
  }

  async function fetchLists() {
    await service.get("/lists").then((res) => setLists(res.data));
  }

  const addCard = (e) => {
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/lists/${list._id}`);
      fetchLists();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [showform]);

  return (
    <section className="List">
      <header>
        <h2>{list.title}</h2>
        <button onClick={handleDelete} className="xmark">
          <FontAwesomeIcon icon="xmark" />
        </button>
      </header>
      <main>
        {cards.length !== 0 &&
          cards.map((card, index) => {
            return (
              <MiniCard card={card} key={card._id} fetchCards={fetchCards} />
            );
          })}
      </main>
      <footer>
        <FormCard
          show={showform}
          cards={cards}
          setShowForm={setShowForm}
          setLists={setLists}
          listId={list._id}
          fetchCards={fetchCards}
          className="FormCard"
        />
        {!showform && (
          <button onClick={(e) => addCard(e)} className="btn-add-card">
            <span>
              <FontAwesomeIcon icon="plus" />
            </span>
            Ajouter une carte
          </button>
        )}
      </footer>
    </section>
  );
};

export default List;
