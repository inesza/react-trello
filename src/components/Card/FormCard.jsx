import React, { useEffect, useRef, useState } from "react";
import useForm from "../../hooks/useForm";
import useOutsideClick from "../../hooks/useOutsideClick";
import service from "../../api/apiHandler";
import handleClickOutside from "../../hooks/useOutsideClick";

const FormCard = ({ show, setShowForm, setLists, cards, listId }) => {
  const [formData, handleChange] = useForm({
    title: "",
  });
  const formRef = useRef(null);
  const formCardInput = useRef(null);
  const formContainer = useRef(null);

  const handleSubmit = async () => {
    try {
      await service.post("/cards", { formData, listId });
      await service.get("/lists").then((res) => setLists(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const hideAndEmptyForm = () => {
    formData.title = "";
    setShowForm(false);
  };

  useEffect(() => {
    const outside = (event) => {
      setTimeout(() =>
        handleClickOutside(formCardInput, hideAndEmptyForm, event)
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

  useEffect(() => {
    const submit = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
        hideAndEmptyForm();
      }
    };
    if (formRef && formRef.current)
      formRef.current.addEventListener("keypress", submit);
    return () => {
      if (formRef && formRef.current)
        formRef.current.removeEventListener("keypress", submit);
    };
  }, [formData]);

  useEffect(() => {
    if (formCardInput && formCardInput.current && show)
      formCardInput.current.focus();
  }, [show]);

  return (
    show && (
      <div ref={formContainer}>
        <form ref={formRef} id={`form-${listId}`}>
          <textarea
            ref={formCardInput}
            name="title"
            onChange={handleChange}
            value={formData.title}
            onBlur={handleSubmit}
            placeholder="Saisissez un titre pour cette carte..."
          />
        </form>
      </div>
    )
  );
};

export default FormCard;
