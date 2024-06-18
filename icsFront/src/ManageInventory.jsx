import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context";
import Select from "react-dropdown-select";
import {
  addItem,
  getSection,
  getSubSections,
  getSubSubSections,
  getInventoryItems,
  deleteInventoryItem,
  updateInventoryItem,
} from "./api";
import DeletePopup from "./DeletePopup";
import UpdatePrompt from "./UpdatePopup";
import UpdatePopup from "./UpdatePopup";
import { Axios } from "axios";

const ManageInventory = () => {
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState("");

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");

  const [subSections, setSubSections] = useState([]);
  const [selectedSubSection, setSelectedSubSection] = useState("");

  const [subSubSections, setSubSubSections] = useState([]);
  const [selectedSubSubSection, setSelectedSubSubSection] = useState("");

  const [inventoryItems, setInventoryItems] = useState([]);

  const { auth } = useContext(AuthContext);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    console.log("useeffect triggered");
    getSection({ auth })
      .then((response) => {
        setSections(response.data);
        console.log("useeffect data", response.data);
        console.log("uasfasfaa", response);
      })
      .catch((error) => {
        console.error("error getting section", error);
      });
  }, [auth]);

  useEffect(() => {
    if (selectedSection) {
      getSubSections({ auth, sectionId: selectedSection })
        .then((response) => {
          if (response && response.data) {
            setSubSections(response.data);
            console.log("SubSections data", response.data);
          }
        })
        .catch((error) => {
          console.error("error getting subsections", error);
        });
    } else {
      setSubSections([]);
    }
  }, [selectedSection, auth]);

  useEffect(() => {
    if (selectedSubSection) {
      getSubSubSections({ auth, subSectionId: selectedSubSection })
        .then((response) => {
          if (response && response.data) {
            setSubSubSections(response.data);
            console.log("Sub Sub Sections data", response.data);
          }
        })
        .catch((error) => {
          console.error("error getting Sub Sub Sections", error);
        });
    } else {
      setSubSubSections([]);
    }
  }, [selectedSubSection, auth]);

  useEffect(() => {
    if (auth) {
      fetchInventoryItems();
    }
    // getInventoryItems({ auth })
    //   .then((data) => {
    //     setInventoryItems(data);
    //   })
    //   .catch((error) => {
    //     console.error("error fetching items", error);
    //   });
  }, [auth]);

  const fetchInventoryItems = () => {
    getInventoryItems({ auth })
      .then((data) => {
        console.log("HERE WE BE WITH INVENTORY THREE: ", data);
        setInventoryItems(data);
      })
      .catch((error) => {
        console.error("Error fetching inventory items:", error);
      });
  };

  const handleSubmitInventoryItem = (e) => {
    console.log("button pressed");
    e.preventDefault();
    console.log("Selected Sub Sub Section ID:", selectedSubSubSection);
    addItem({
      auth,
      name,
      make,
      model,
      color,
      notes,
      quantity,
      subsubsection: parseInt(selectedSubSubSection),
    }).then((response) => {
      console.log("item added to inventory", response);
      setName("");
      setMake("");
      setModel("");
      setColor("");
      setNotes("");
      setQuantity("");
      setSelectedSection("");
      setSelectedSubSection("");
      setSelectedSubSubSection("");
      fetchInventoryItems();
    });
  };

  const handleDeleteClick = (item) => {
    setCurrentItem(item);
    setShowDeletePopup(true);
  };

  const handleDelete = (deleteQuantity) => {
    // const newQuantity = currentItem.quantity - deleteQuantity;
    const newQuantity = currentItem.quantity;
    if (newQuantity > 0) {
      deleteInventoryItem({
        auth,
        itemId: currentItem.id,
        quantityToDelete: deleteQuantity,
      }).then(() => {
        fetchInventoryItems();
        setShowDeletePopup(false); // Close popup after successful delete
      });
    } else {
      deleteInventoryItem({ auth, itemId: currentItem.id }).then(() => {
        fetchInventoryItems();
        setShowDeletePopup(false); // Close popup after successful delete
      });
    }
  };

  const handleAssign = (itemId) => {
    console.log("assign item button pressed", itemId);
    fetchInventoryItems();
  };

  // ==========================================================
  // update functions
  const handleUpdateClick = (item) => {
    console.log("update item button pressed", item);
    setCurrentItem(item);
    setShowUpdatePopup(true);
  };

  const handleConfirmUpdate = (updatedItem) => {
    console.log("Data to be sent:", updatedItem);
    updateInventoryItem({
      auth,
      item: {
        ...updatedItem,
        subsubsection: parseInt(updatedItem.subSubSection),
      },
    })
      .then(() => {
        fetchInventoryItems();
        setShowUpdatePopup(false);
      })
      .catch((error) => {
        console.error("error updating invenrory item", error);
      });
  };
  // ==========================================================

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
        <label>quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>section</label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">Select a warehouse</option>
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
            onChange={(e) => setSelectedSubSection(e.target.value)}
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
          <label>SubSubSection:</label>
          <select
            value={selectedSubSubSection}
            onChange={(e) => setSelectedSubSubSection(e.target.value)}
          >
            <option value="">Select a Sub Sub Section</option>
            {subSubSections.map((subSubSection) => (
              <option key={subSubSection.id} value={subSubSection.id}>
                {subSubSection.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <button onClick={handleSubmitInventoryItem}>Add Inventory</button>
      </div>
      <div>
        <h1>Inventory Items</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Make</th>
              <th>Model</th>
              <th>Color</th>
              <th>section</th>
              <th>subsection</th>
              <th>SubSubSection</th>
              <th>Quantity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.length > 0 &&
              inventoryItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.inventory_item.name}</td>
                  <td>{item.inventory_item.make}</td>
                  <td>{item.inventory_item.model}</td>
                  <td>{item.inventory_item.color}</td>
                  {/* <td>{item.sub_sub_section.sub_section.section.name}</td>
                  <td>{item.sub_sub_section.sub_section.name}</td> */}
                  <td>{item.sub_sub_section.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.inventory_item.notes}</td>
                  <td>
                    <button onClick={() => handleDeleteClick(item)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdateClick(item.id)}>
                      Update
                    </button>
                    <button onClick={() => handleAssign(item.id)}>
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showDeletePopup && (
        <DeletePopup
          item={currentItem}
          onClose={() => setShowDeletePopup(false)}
          onDelete={handleDelete}
        />
      )}
      {showUpdatePopup && (
        <UpdatePopup
          item={currentItem}
          onClose={() => setShowUpdatePopup(false)}
          onConfirmUpdate={handleConfirmUpdate}
        />
      )}
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
