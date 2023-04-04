import React from "react";
import service from "../../api/apiHandler";

const ConfirmDelete = ({ apiPath, toggleModal, fetchCards }) => {
  const handleDelete = async () => {
    try {
      await service.delete(apiPath);
      toggleModal();
      fetchCards();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Confirm</button>
    </div>
  );
};

export default ConfirmDelete;
