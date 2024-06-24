import React, { useContext, useEffect, useState } from "react";
import {
  deleteInventoryItem,
  getSection,
  getSubSections,
  getSubSubSections,
  updateInventoryItem,
} from "./api";
import { AuthContext } from "./Context";
import DeletePopup from "./DeletePopup";

const UpdatePopup = ({
  item,
  onClose,
  onConfirmUpdate,
  fetchInventoryItems,
}) => {
  console.log("recieved item for update", item);
  const { auth } = useContext(AuthContext);
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [updatedItem, setUpdatedItem] = useState({
    inventory_item: {
      name: item.inventory_item?.name || "",
      make: item.inventory_item?.make || "",
      model: item.inventory_item?.model || "",
      color: item.inventory_item?.color || "",
      notes: item.inventory_item?.notes || "",
    },
    quantity: item.quantity || 0,
    subsubsection: item.sub_sub_section?.id || "",
  });

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(
    item.sub_sub_section?.sub_section?.section?.id || ""
  );

  const [subSections, setSubSections] = useState([]);
  const [selectedSubSection, setSelectedSubSection] = useState(
    item.sub_sub_section?.sub_section?.id || ""
  );

  const [subSubSections, setSubSubSections] = useState([]);
  const [selectedSubSubSection, setSelectedSubSubSection] = useState(
    item.sub_sub_section?.id || ""
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
      quantity: parseInt(e.target.value) || 0,
    }));
  };

  const handleSubmit = () => {
    console.log("handles submit data");
    const updateData = {
      id: item.id,
      inventory_item: {
        name: updatedItem.inventory_item.name,
        make: updatedItem.inventory_item.make,
        model: updatedItem.inventory_item.model,
        color: updatedItem.inventory_item.color,
        notes: updatedItem.inventory_item.notes,
      },
      quantity: updatedItem.quantity,
      sub_sub_section_id: parseInt(selectedSubSubSection),
    };
    console.log("item.id", item.id);
    onConfirmUpdate(updateData);
  };

  const handleSectionChange = (e) => {
    const newSectionId = e.target.value;
    setSelectedSection(newSectionId);
  };

  const handleSubSectionChange = (e) => {
    const newSubSectionId = e.target.value;
    setSelectedSubSection(newSubSectionId);
  };

  const handleSubSubSectionChange = (e) => {
    setSelectedSubSubSection(e.target.value);
  };

  useEffect(() => {
    console.log("here");
    getSection({ auth })
      .then((response) => {
        setSections(response.data);
      })
      .catch((error) => {
        console.error("failed to fetch sections", error);
      });
  }, []);

  useEffect(() => {
    if (selectedSection) {
      getSubSections({ auth, sectionId: selectedSection })
        .then((response) => {
          setSubSections(response.data);
        })
        .catch((error) => {
          console.error("failed to fetch sub sections", error);
        });
    } else {
      setSubSections([]);
    }
  }, [auth, selectedSection]);

  useEffect(() => {
    if (selectedSubSection) {
      getSubSubSections({ auth, subSectionId: selectedSubSection })
        .then((response) => {
          setSubSubSections(response.data);
        })
        .catch((error) => {
          console.error("failed to fetch sub sub sections", error);
        });
    } else {
      setSubSubSections([]);
    }
  }, [auth, selectedSubSection]);

  const handleDeleteClick = (item) => {
    setCurrentItem(item);
    setShowDeletePopup(true);
  };

  const handleDelete = () => {
    const quantityToDelete = currentItem.quantity;
    deleteInventoryItem({ auth, itemId: currentItem.id, quantityToDelete })
      .then(() => {
        setShowDeletePopup(false);
        onClose();
        fetchInventoryItems();
      })
      .catch((error) => {
        console.error(" THAT ITEM IS STILL ALIVE!!!", error);
      });
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Update Item</h2>
        <label className="popup-label">Name:</label>
        <input
          className="popup-input"
          type="text"
          name="name"
          value={updatedItem.inventory_item.name}
          onChange={handleChange}
        />
        <label className="popup-label">Make:</label>
        <input
          className="popup-input"
          type="text"
          name="make"
          value={updatedItem.inventory_item.make}
          onChange={handleChange}
        />

        <label className="popup-label">Model:</label>
        <input
          className="popup-input"
          type="text"
          name="model"
          value={updatedItem.inventory_item.model}
          onChange={handleChange}
        />
        <label className="popup-label">Color:</label>
        <input
          className="popup-input"
          type="text"
          name="color"
          value={updatedItem.inventory_item.color}
          onChange={handleChange}
        />
        <label className="popup-label">Notes:</label>
        <input
          className="popup-input"
          type="text"
          name="notes"
          value={updatedItem.inventory_item.notes}
          onChange={handleChange}
        />
        <label className="popup-label">Quantity:</label>
        <input
          className="popup-input"
          type="number"
          value={updatedItem.quantity}
          onChange={handleQuantityChange}
        />
        <div>
          <label>Area:</label>
          <select value={selectedSection} onChange={handleSectionChange}>
            <option value="">Select an Area</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
        {selectedSection && (
          <div>
            <label>Division:</label>
            <select
              value={selectedSubSection}
              onChange={handleSubSectionChange}
            >
              <option value="">Select a Division</option>
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
            <label>Sub-Division:</label>
            <select
              value={selectedSubSubSection}
              onChange={handleSubSubSectionChange}
            >
              <option value="">Select a Sub-Division</option>
              {subSubSections.map((subSubSection) => (
                <option key={subSubSection.id} value={subSubSection.id}>
                  {subSubSection.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="update-inv-button-div">
          <button className="update-inv-button-div" onClick={handleSubmit}>
            Update
          </button>
          <button className="update-inv-button-div" onClick={onClose}>
            Cancel
          </button>
          <button
            className="update-inv-button-div"
            onClick={() => handleDeleteClick(item)}
          >
            Delete
          </button>
        </div>
      </div>
      {showDeletePopup && (
        <DeletePopup
          item={currentItem}
          onClose={() => setShowDeletePopup(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UpdatePopup;
