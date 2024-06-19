import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context";
import { getSection, getToken, registerWarehouse } from "./api";

const CreateWarehouse = () => {
  const { auth } = useContext(AuthContext);

  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [subSectionName, setSubSectionName] = useState("");

  const [showSectionPopup, setShowSectionPopup] = useState(false);
  const [showSubSectionPopup, setShowSubSectionPopup] = useState(false);
  const [showSubSubSectionPopup, setShowSubSubSectionPopup] = useState(false);

  // useeffect for handling section population
  useEffect(() => {
    if (showSubSectionPopup) {
      getSection({ auth })
        .then((response) => {
          setSections(response.data);
        })
        .catch((error) => {
          console.error("failed to fetch sections", error);
        });
    }
  }, [auth, showSubSectionPopup]);

  const handleOpenSectionPopup = () => {
    setShowSectionPopup(true);
    setSectionName("");
  };

  const handleOpenSubSectionPopup = () => setShowSubSectionPopup(true);
  const handleOpenSubSubSectionPopup = () => setShowSubSubSectionPopup(true);

  const handleClosePopup = () => {
    setShowSectionPopup(false);
    setShowSubSectionPopup(false);
    setShowSubSubSectionPopup(false);
  };

  const handleCreateSection = async () => {
    if (sectionName.trim()) {
      const response = await registerWarehouse({
        auth,
        name: sectionName,
      });
      if (response.status === 201) {
        console.log("section created succesfully", response.data);
      } else {
        alert("Failed to create a new section.");
      }
    } else {
      alert("section name cannot be empty.");
    }
    handleClosePopup();
  };

  return (
    <div>
      <button onClick={handleOpenSectionPopup}>Add Section</button>
      <button onClick={handleOpenSubSectionPopup}>Add SubSection</button>
      <button onClick={handleOpenSubSubSectionPopup}>Add SubSubSection</button>

      {showSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Add New Section</h2>
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              style={{ margin: "10px 0", padding: "8px", width: "90%" }}
            />
            <button onClick={handleClosePopup}>Close</button>
            <button onClick={handleCreateSection}>Create</button>
          </div>
        </div>
      )}

      {showSubSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Add New SubSection</h2>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {showSubSubSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Add New SubSubSection</h2>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWarehouse;
