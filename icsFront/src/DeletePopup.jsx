// import React, { useState } from "react";

// const DeletePopup = ({ item, onClose, onDelete }) => {
//   const [deleteQuantity, setDeleteQuantity] = useState(0);

//   const handleDelete = () => {
//     if (deleteQuantity > item.quantity) {
//       alert(`cannot delete more than ${item.quantity}`);
//     } else {
//       onDelete(deleteQuantity);
//       onClose();
//     }
//   };

//   return (
//     <div className="popup">
//       <div className="popup-inner">
//         <h3>
//           {item.inventory_item.name}, {item.inventory_item.make},{" "}
//           {item.inventory_item.model} ({item.quantity})
//         </h3>
//         <label>How many would you like to delete?</label>
//         <input
//           type="number"
//           value={deleteQuantity}
//           onChange={(e) => setDeleteQuantity(parseInt(e.target.value))}
//         />
//         <button onClick={handleDelete}>Delete</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };
// export default DeletePopup;

// import React, { useState } from "react";

// const DeletePopup = ({ item, onClose, onDelete }) => {
//   const [deleteQuantity, setDeleteQuantity] = useState(0);

//   const handleDelete = () => {
//     if (deleteQuantity > item.quantity) {
//       alert(`cannot delete more than ${item.quantity}`);
//     } else {
//       onDelete(deleteQuantity);
//       onClose();
//     }
//   };

//   return (
//     <div className="popup">
//       <div className="popup-inner">
//         <h3>
//           {item.inventory_item.name}, {item.inventory_item.make},{" "}
//           {item.inventory_item.model} ({item.quantity})
//         </h3>
//         <label>How many would you like to delete?</label>
//         <input
//           type="number"
//           value={deleteQuantity}
//           onChange={(e) => setDeleteQuantity(parseInt(e.target.value))}
//         />
//         <button onClick={handleDelete}>Delete</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default DeletePopup;

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
