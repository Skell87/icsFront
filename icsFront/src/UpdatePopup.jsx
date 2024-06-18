import React, { useContext, useEffect, useState } from "react";
import { getSection, getSubSections, getSubSubSections } from "./api";
import { AuthContext } from "./Context";

const UpdatePopup = ({ item, onClose, onConfirmUpdate }) => {
  const { auth } = useContext(AuthContext);

  const [updatedItem, setUpdatedItem] = useState({
    ...item,
    inventory_item: { ...item.inventory_item },
    quantity: item.quantity,
    subsubsection: item.sub_sub_section.id,
  });

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(
    item.sub_sub_section.sub_section.id
  );

  const [subSections, setSubSections] = useState([]);
  const [selectedSubSection, setSelectedSubSection] = useState(
    item.sub_sub_section.sub_section.id
  );

  const [subSubSections, setSubSubSections] = useState([]);
  const [selectedSubSubSection, setSelectedSubSubSection] = useState(
    item.sub_sub_section.id
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      inventory_item: {
        ...prevItem.inventory_item,
        [name]: value,
      },
    }));
  };

  const handleQuantityChange = (e) => {
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      quantity: parseInt(e.target.value),
    }));
  };

  const handleSubmit = () => {
    onConfirmUpdate(updatedItem);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Update Item</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedItem.inventory_item.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Make:</label>
          <input
            type="text"
            name="make"
            value={updatedItem.inventory_item.make}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={updatedItem.inventory_item.model}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={updatedItem.inventory_item.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <input
            type="text"
            name="notes"
            value={updatedItem.inventory_item.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={updatedItem.quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div>
          <label>Section:</label>
          <select value={selectedSection} onChange={handleSectionChange}>
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
        {selectedSection && (
          <div>
            <label>Subsection:</label>
            <select
              value={selectedSubSection}
              onChange={handleSubSectionChange}
            >
              <option value="">Select a subsection</option>
              {subSections.map((subSection) => (
                <option key={subSection.id} value={subSection.id}>
                  {subSection.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedSubSection && (
          <div>
            <label>Subsubsection:</label>
            <select
              value={selectedSubSubSection}
              onChange={handleSubSubSectionChange}
            >
              <option value="">Select a subsubsection</option>
              {subSubSections.map((subSubSection) => (
                <option key={subSubSection.id} value={subSubSection.id}>
                  {subSubSection.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <button onClick={handleSubmit}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;
