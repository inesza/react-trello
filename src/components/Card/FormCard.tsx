import React, { useState } from "react";
import useForm from "../hooks/useForm";

type props = {
  show: boolean;
};

const FormCard = ({ show }: props) => {
  const [formData, setFormData] = useForm({
    cardName: "",
  });

  const handleSubmit = 
  return (
    show && (
      <div>
        <form>
          <input type="text" name="cardName" />
        </form>
      </div>
    )
  );
};

export default FormCard;
