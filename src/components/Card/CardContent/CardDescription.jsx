import React, { useRef } from "react";
import service from "../../../api/apiHandler";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardDescription = ({ card, fetchCards }) => {
  const cardDescription = useRef(card.description);

  const handleSubmit = async (event) => {
    try {
      console.log(cardDescription.current);
      const { data } = await service.put(`/cards/${card._id}`, {
        description: cardDescription.current,
      });
      fetchCards();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h4>
        <FontAwesomeIcon icon="align-justify" className="icon" />
        Description
      </h4>
      <ContentEditable
        html={cardDescription.current ? cardDescription.current : ""}
        onBlur={handleSubmit}
        onChange={(event) => (cardDescription.current = event.target.value)}
        className="CardDescription"
        placeholder="Ajouter une description plus détaillée..."
      />
    </>
  );
};

export default CardDescription;
