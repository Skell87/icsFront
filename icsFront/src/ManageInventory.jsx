import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context";
import Select from "react-dropdown-select";
import { addItem, getSection, getSubSections, getSubSubSections } from "./api";

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

  const { auth } = useContext(AuthContext);

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
    </div>
  );
};

export default ManageInventory;
