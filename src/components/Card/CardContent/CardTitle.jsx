import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import service from "../../../api/apiHandler";

const CardTitle = ({ card, fetchCards }) => {
  const cardTitle = useRef(card.title);
  const handleSubmit = async (event) => {
    try {
      const { data } = await service.put(`/cards/${card._id}`, {
        title: cardTitle.current,
      });
      fetchCards();
    } catch (error) {
      console.log(error);
    }
  };
  if (!card) return;
  return (
    <h3 className="CardTitle">
      <FontAwesomeIcon icon="bookmark" className="icon" />
      <ContentEditable
        html={cardTitle.current}
        onBlur={handleSubmit}
        onChange={(event) => (cardTitle.current = event.target.value)}
      />
    </h3>
  );
};

export default CardTitle;
