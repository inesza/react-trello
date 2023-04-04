import React, { useEffect, useRef } from "react";
import useForm from "../../hooks/useForm";
import service from "../../api/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleClickOutside from "../../hooks/useOutsideClick";

const FormList = ({ show, setShowForm, setLists, lists }) => {
  const [formData, handleChange] = useForm({
    listTitle: "",
  });
  const formListInput = useRef();

  const hideAndEmptyForm = () => {
    formData.listTitle = "";
    setShowForm(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await service.post("/lists", formData);
      await service.get("/lists").then((res) => setLists(res.data));
      hideAndEmptyForm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formListInput && formListInput.current && show)
      formListInput.current.focus();
  }, [show]);

  useEffect(() => {
    const outside = (event) => {
      setTimeout(() =>
        handleClickOutside(formListInput, hideAndEmptyForm, event)
      );
    };

    if (show === true) {
      setTimeout(() => {
        document.addEventListener("click", outside);
      });
    }
    return () => {
      document.removeEventListener("click", outside);
    };
  }, [show]);

  return (
    show && (
      <form className="add-list FormList">
        <input
          ref={formListInput}
          type="text"
          name="listTitle"
          onChange={handleChange}
          value={formData.listTitle}
        />
        <div className="actions">
          <button onClick={handleSubmit} className="btn">
            Ajouter une liste
          </button>
          <button onClick={hideAndEmptyForm} className="xmark">
            <FontAwesomeIcon icon="xmark" />
          </button>
        </div>
      </form>
    )
  );
};

export default FormList;
