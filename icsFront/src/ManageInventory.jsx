import React, { useContext, useState } from "react";
import { AuthContext } from "./Context";
import Select from "react-dropdown-select";
import { addItem } from "./api";

const ManageInventory = () => {
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");
  const { auth } = useContext(AuthContext);

  const handleSubmitInventoryItem = (e) => {
    console.log("button pressed");
    e.preventDefault();

    addItem({
      auth,
      name,
      make,
      model,
      color,
      notes,
    }).then((response) => {
      console.log("item added to inventory", response);
      setName("");
      setMake("");
      setModel("");
      setColor("");
      setNotes("");
    });
  };

  return (
    <div>
      <div>
        <label>name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>make:</label>
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
      </div>
      <div>
        <label>model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>
      <div>
        <label>color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <label>notes:</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmitInventoryItem}>Add Inventory</button>
      </div>
    </div>
  );
};

export default ManageInventory;

// this is a selector for color that didnt seem to work as wanted.
// i set an onchange text field to check to make sure im sending signal.
{
  /* <select>
          <option value={color} onSelect={(e) => setColor(e.target.value)}>
            Red
          </option>
          <option value={color} onSelect={(e) => setColor(e.target.value)}>
            Orange
          </option>
          <option value={color} onSelect={(e) => setColor(e.target.value)}>
            Yellow
          </option>
          <option value={color} onSelect={(e) => setColor(e.target.value)}>
            Green
          </option>
          <option value={color} onSelect={(e) => setColor(e.target.value)}>
            Blue
          </option>
          <option value={color} onSelect={(e) => setColor(e.target.value)}>
            Purple
          </option>
        </select> */
}
