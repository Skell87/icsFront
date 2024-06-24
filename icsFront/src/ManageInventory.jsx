import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context";
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
import UpdatePopup from "./UpdatePopup";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("");

  const { auth } = useContext(AuthContext);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  }, [auth]);

  useEffect(() => {
    let filtered = inventoryItems;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.inventory_item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchTerm, inventoryItems]);

  useEffect(() => {
    if (sortField) {
      const sortedItems = [...filteredItems].sort((a, b) => {
        let aValue, bValue;

        if (sortField === "quantity") {
          aValue = a[sortField];
          bValue = b[sortField];
        } else if (
          sortField.includes("section") ||
          sortField.includes("sub_section") ||
          sortField.includes("sub_sub_section")
        ) {
          const [primaryField, ...subFields] = sortField.split(".");
          aValue = subFields.reduce(
            (obj, field) => obj[field],
            a[primaryField]
          );
          bValue = subFields.reduce(
            (obj, field) => obj[field],
            b[primaryField]
          );
        } else {
          aValue = a.inventory_item[sortField];
          bValue = b.inventory_item[sortField];
        }

        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });

      setFilteredItems(sortedItems);
    }
  }, [sortField, sortOrder]);

  const fetchInventoryItems = () => {
    getInventoryItems({ auth })
      .then((data) => {
        console.log("HERE WE BE WITH INVENTORY THREE: ", data);
        setInventoryItems(data);
        setFilteredItems(data);
      })
      .catch((error) => {
        console.error("Error fetching inventory items:", error);
      });
  };

  const handleSubmitInventoryItem = (e) => {
    console.log("button pressed");

    console.log("Selected Sub Sub Section ID:", selectedSubSubSection);
    addItem({
      auth,
      name,
      make,
      model,
      color,
      notes,
      quantity,
      subsubsection: selectedSubSubSection,
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
      setShowPopup(false);
    });
  };

  const handleDeleteClick = (item) => {
    setCurrentItem(item);
    setShowDeletePopup(true);
  };

  const handleDelete = (deleteQuantity) => {
    const newQuantity = currentItem.quantity;
    if (newQuantity > 0) {
      deleteInventoryItem({
        auth,
        itemId: currentItem.id,
        quantityToDelete: deleteQuantity,
      }).then(() => {
        fetchInventoryItems();
        setShowDeletePopup(false);
      });
    } else {
      deleteInventoryItem({ auth, itemId: currentItem.id }).then(() => {
        fetchInventoryItems();
        setShowDeletePopup(false);
      });
    }
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
    console.log("subsubsection before parse:", updatedItem.subsubsection);
    // Ensure 'id' is extracted from the 'updatedItem' and passed separately
    const subSubSectionId = parseInt(updatedItem.subsubsection, 10);
    console.log("parsed subsubsection id", subSubSectionId);
    updateInventoryItem({
      auth,
      itemId: updatedItem.id,
      updates: {
        ...updatedItem,
        subsubsection: subSubSectionId,
      },
    })
      .then(() => {
        fetchInventoryItems();
        setShowUpdatePopup(false);
      })
      .catch((error) => {
        console.error("error updating inventory item", error);
      });
  };

  const handleMoreInfo = (item) => {
    setCurrentItem(item);
    setShowUpdatePopup(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
    setActiveSortField(field);
  };

  const renderMobileView = () => (
    <div className="mobile-view">
      {filteredItems.length > 0 &&
        filteredItems.map((item) => (
          <div key={item.id} className="mobile-tile">
            <div className="tile-header">
              <span>
                {item.inventory_item.name}.<br></br>
              </span>
              <span>Quantity: {item.quantity}</span>
            </div>
            <div className="tile-body">
              <div>{item.sub_sub_section.sub_section.section.name}, </div>
              <div>{item.sub_sub_section.sub_section.name}, </div>
              <div>{item.sub_sub_section.name}.</div>
            </div>
            <button
              className="more-info-button"
              onClick={() => handleMoreInfo(item)}
            >
              ...
            </button>
          </div>
        ))}
    </div>
  );

  const renderDesktopView = () => (
    <div className="desktop-view">
      <table>
        <thead>
          <tr className="responsive-text">
            <th
              onClick={() => handleSort("name")}
              className={activeSortField === "name" ? "active-sort" : ""}
            >
              Name
            </th>
            <th
              onClick={() => handleSort("make")}
              className={activeSortField === "make" ? "active-sort" : ""}
            >
              Make
            </th>
            <th
              onClick={() => handleSort("Model")}
              className={activeSortField === "Model" ? "active-sort" : ""}
            >
              Model
            </th>
            <th
              onClick={() => handleSort("color")}
              className={activeSortField === "color" ? "active-sort" : ""}
            >
              color
            </th>
            <th
              onClick={() =>
                handleSort("sub_sub_section.sub_section.section.name")
              }
              className={
                activeSortField === "sub_sub_section.sub_section.section.name"
                  ? "active-sort"
                  : ""
              }
            >
              Area
            </th>
            <th
              onClick={() => handleSort("sub_sub_section.sub_section.name")}
              className={
                activeSortField === "sub_sub_section.sub_section.name"
                  ? "active-sort"
                  : ""
              }
            >
              Division
            </th>
            <th
              onClick={() => handleSort("sub_sub_section.name")}
              className={
                activeSortField === "sub_sub_section.name" ? "active-sort" : ""
              }
            >
              Sub-Division
            </th>
            <th
              onClick={() => handleSort("quantity")}
              className={activeSortField === "quantity" ? "active-sort" : ""}
            >
              Quantity
            </th>
            <th
              onClick={() => handleSort("notes")}
              className={activeSortField === "notes" ? "active-sort" : ""}
            >
              Notes
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 &&
            filteredItems.map((item) => (
              <tr className="responsive-text" key={item.id}>
                <td>{item.inventory_item.name}</td>
                <td>{item.inventory_item.make}</td>
                <td>{item.inventory_item.model}</td>
                <td>{item.inventory_item.color}</td>
                <td>{item.sub_sub_section.sub_section.section.name}</td>
                <td>{item.sub_sub_section.sub_section.name}</td>
                <td>{item.sub_sub_section.name}</td>
                <td>{item.quantity}</td>
                <td>{item.inventory_item.notes}</td>
                <td>
                  <button onClick={() => handleUpdateClick(item)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="MI-text">
      <button
        className="manage-inventory-add-button"
        onClick={() => setShowPopup(true)}
      >
        Add Item
      </button>
      <div>
        <input
          className="search-box"
          type="text"
          placeholder="Search by Name."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
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
              <label>Area:</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
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
                  onChange={(e) => setSelectedSubSection(e.target.value)}
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
                  onChange={(e) => setSelectedSubSubSection(e.target.value)}
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
            <div className="inv-button-div">
              <button onClick={handleSubmitInventoryItem}>Add Inventory</button>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      {isMobile ? renderMobileView() : renderDesktopView()}
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
          fetchInventoryItems={fetchInventoryItems}
        />
      )}
    </div>
  );
};

export default ManageInventory;
