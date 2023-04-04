import React, { useRef, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import service from "../../../api/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardListItem = ({ checkList, fetchChecklists }) => {
  const checkTitle = useRef(checkList.title);
  const [checked, setChecked] = useState(checkList.isDone);

  const handleEdit = async () => {
    try {
      const { data } = await service.put(`/checklists/${checkList._id}`, {
        title: checkTitle.current,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/checklists/${checkList._id}`);
      fetchChecklists();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEdit();
    }
  };

  const handleCheck = async () => {
    try {
      const { data } = await service.put(`/checklists/${checkList._id}`, {
        isDone: checked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCheck();
  }, [checked]);

  return (
    <li className="CardListItem">
      <div>
        <input
          type="checkbox"
          onChange={() => setChecked(!checked)}
          checked={checked}
        />
        <ContentEditable
          html={checkTitle.current ? checkTitle.current : "item"}
          onBlur={handleEdit}
          disabled={checked ? true : false}
          onKeyDown={(e) => handleEnter(e)}
          onChange={(event) => (checkTitle.current = event.target.value)}
          className={checked ? "item checked" : "item unchecked"}
        />
        <button onClick={handleDelete} className="xmark">
          <FontAwesomeIcon icon="xmark" />
        </button>
      </div>
    </li>
  );
};

export default CardListItem;
