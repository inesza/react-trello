import React, { useEffect, useRef, useState } from "react";
import handleClickOutside from "../../hooks/useOutsideClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentEditable from "react-contenteditable";
import service from "../../api/apiHandler";
import CardTitle from "./CardContent/CardTitle";
import CardDescription from "./CardContent/CardDescription";
import ConfirmDelete from "../utils/ConfirmDelete";
import CardChecklist from "./CardContent/CardChecklist";

const FullCard = ({ isShowing, toggleModal, card, fetchCards }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const modal = useRef();

  const outside = (event) => {
    setTimeout(() => handleClickOutside(modal, toggleModal, event));
  };

  useEffect(() => {
    if (isShowing === true) {
      setTimeout(() => {
        document.addEventListener("click", outside);
      });
      document.addEventListener(
        "keypress",
        (event) =>
          event.key === "Escape" &&
          handleClickOutside(modal, toggleModal, event)
      );
    }
    return () => {
      document.removeEventListener("click", outside);
    };
  }, [isShowing]);

  const addChecklist = () => {
    setShowChecklist(true);
  };

  if (isShowing) {
    return (
      <section className="FullCard">
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal" ref={modal}>
              <div className="modal-header">
                <div>
                  <CardTitle card={card} fetchCards={fetchCards} />
                  <p>
                    Dans la liste{" "}
                    <span className="card-list">{card.list.title}</span>
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon="trash"
                    onClick={() => setShowConfirm(true)}
                    className="delete-btn"
                  />
                  {showConfirm && (
                    <ConfirmDelete
                      apiPath={`/cards/${card._id}`}
                      toggleModal={toggleModal}
                      fetchCards={fetchCards}
                    />
                  )}
                </div>
              </div>

              <div className="modal-body">
                <main>
                  <CardDescription {...{ card, fetchCards }} />

                  <CardChecklist
                    {...{ card, fetchCards, setShowChecklist, showChecklist }}
                  />
                </main>
                <aside>
                  <h4>Ajouter à la carte</h4>
                  <button onClick={addChecklist} className="btn">
                    <FontAwesomeIcon icon="square-check" className="icon" />
                    Checklist
                  </button>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default FullCard;
