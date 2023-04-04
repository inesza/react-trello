import React from "react";
import useModal from "../../hooks/useModal";
import "./Card.css";
import { useDrag } from "react-dnd";
import FullCard from "./FullCard";

const MiniCard = ({ card, fetchCards, isDragging }) => {
  const { isShowing, toggleModal } = useModal();

  return (
    <>
      <div className="MiniCard" onClick={toggleModal}>
        {card.title}
      </div>
      <FullCard {...{ isShowing, toggleModal, card, fetchCards }} />
    </>
  );
};

export default MiniCard;
