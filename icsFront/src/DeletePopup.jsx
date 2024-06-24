import React from "react";

const DeletePopup = ({ item, onClose, onDelete }) => {
  const handleDelete = () => {
    const quantityToDelete = item.quantity;
    console.log("THIS BE THAT QUANTITY DOG", item.quantity);
    // onDelete(quantityToDelete);
    onDelete();
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Are you sure you want to delete {item.inventory_item.name}?</h3>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeletePopup;
