import React, { useState, useEffect } from "react";
import service from "../../api/apiHandler";
import FormList from "./FormList";
import List from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AllLists = () => {
  const [lists, setLists] = useState([]);
  const [showform, setShowForm] = useState(false);
  const empty = lists.length === 0 ? true : false;

  async function fetchLists() {
    const { data } = await service.get("/lists");
    setLists(data);
  }

  useEffect(() => {
    fetchLists();
  }, []);

  const addList = () => {
    setShowForm(true);
  };

  return (
    <section className="AllLists">
      {!empty &&
        lists.map((list) => (
          <List
            key={list._id}
            list={list}
            setLists={setLists}
            fetchLists={fetchLists}
          />
        ))}
      <div>
        {!showform && (
          <button onClick={addList} className="btn-add-list">
            <span>
              <FontAwesomeIcon icon="plus" />
            </span>
            Ajouter une liste
          </button>
        )}

        <FormList
          show={showform}
          lists={lists}
          setShowForm={setShowForm}
          setLists={setLists}
        />
      </div>
    </section>
  );
};

export default AllLists;
