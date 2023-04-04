import React, { useState, useEffect, useRef } from "react";
import service from "../../../api/apiHandler";
import CardListItem from "./CardListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CardChecklist = ({
  card,
  fetchChecklists,
  setShowChecklist,
  showChecklist,
}) => {
  const [checklists, setChecklists] = useState([]);
  const [checklistInfo, setChecklistInfo] = useState("");
  const checkRef = useRef();

  async function fetchChecklists() {
    await service
      .get(`/cards/${card._id}/checklists`)
      .then((res) => {
        setChecklists(res.data);
        if (res.data.length) setShowChecklist(true);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const submit = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    };
    if (checkRef && checkRef.current)
      checkRef.current.addEventListener("keypress", submit);
    return () => {
      if (checkRef && checkRef.current)
        checkRef.current.removeEventListener("keypress", submit);
    };
  }, [checklistInfo]);

  const handleSubmit = async () => {
    try {
      await service.post("/checklists", {
        title: checklistInfo,
        card: card._id,
      });
      setChecklistInfo("");
      fetchChecklists();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  return (
    showChecklist && (
      <section className="CardChecklist">
        <h3>
          <FontAwesomeIcon icon="check-square" /> Checklist
        </h3>
        {checklists.length !== 0 && (
          <ul>
            {checklists.map((check) => {
              return (
                <CardListItem
                  checkList={check}
                  fetchChecklists={fetchChecklists}
                  key={check._id}
                />
              );
            })}
          </ul>
        )}
        <form ref={checkRef}>
          <input
            type="text"
            value={checklistInfo}
            onChange={(e) => setChecklistInfo(e.target.value)}
            placeholder="Ajouter un élément"
          />
        </form>
      </section>
    )
  );
};

export default CardChecklist;
