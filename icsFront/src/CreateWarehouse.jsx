import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Context";
import {
  getSection,
  getSubSections,
  registerWarehouse,
  registerSubWarehouse,
  registerSubSubWarehouse,
  deleteSection,
  deleteSubSection,
  deleteSubSubSection,
  getSubSubSections,
} from "./api";
import WarehouseDisplay from "./WarehouseDisplay";

const CreateWarehouse = () => {
  const { auth } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  // create form state:
  // section state
  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  // subsection state
  const [subSectionName, setSubSectionName] = useState("");
  const [subSections, setSubSections] = useState([]);
  const [selectedSubSection, setSelectedSubSection] = useState("");
  // subsubsection state
  const [subSubSectionName, setSubSubSectionName] = useState("");
  const [subSubSections, setSubSubSections] = useState([]);
  const [selectedSubSubSection, setSelectedSubSubSection] = useState("");
  // delete sections state:
  const [deleteSectionId, setDeleteSectionId] = useState("");
  const [deleteSubSectionId, setDeleteSubSectionId] = useState("");
  const [deleteSubSubSectionId, setDeleteSubSubSectionId] = useState("");

  // popup state
  const [showSectionPopup, setShowSectionPopup] = useState(false);
  const [showSubSectionPopup, setShowSubSectionPopup] = useState(false);
  const [showSubSubSectionPopup, setShowSubSubSectionPopup] = useState(false);
  const [showDeleteSectionPopup, setShowDeleteSectionPopup] = useState(false);
  const [showDeleteSubSectionPopup, setshowDeleteSubSectionPopup] =
    useState(false);
  const [showDeleteSubSubSectionPopup, setshowDeleteSubSubSectionPopup] =
    useState(false);

  useEffect(() => {
    if (
      showSectionPopup ||
      showSubSectionPopup ||
      showSubSubSectionPopup ||
      showDeleteSectionPopup ||
      showDeleteSubSectionPopup ||
      showDeleteSubSubSectionPopup
    ) {
      getSection({ auth })
        .then((response) => {
          setSections(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch sections:", error);
        });
    }
  }, [
    auth,
    showSectionPopup,
    showSubSectionPopup,
    showSubSubSectionPopup,
    showDeleteSectionPopup,
    showDeleteSubSectionPopup,
    showDeleteSubSubSectionPopup,
  ]);

  useEffect(() => {
    if (selectedSection) {
      getSubSections({ auth, sectionId: selectedSection })
        .then((response) => {
          setSubSections(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch subSections:", error);
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

  const handleClosePopup = () => {
    console.log("close pop");
    setShowSectionPopup(false);
    setShowSubSectionPopup(false);
    setShowSubSubSectionPopup(false);
    setShowDeleteSectionPopup(false);
    setshowDeleteSubSectionPopup(false);
    setshowDeleteSubSubSectionPopup(false);
    setSectionName("");
    setSubSectionName("");
    setSubSubSectionName("");
    setSections([]);
    setSubSections([]);
    setSubSubSections([]);
    setSelectedSection("");
    setSelectedSubSection("");
    setSelectedSubSubSection("");
    setDeleteSectionId("");
    setDeleteSubSectionId("");
    setDeleteSubSubSectionId("");
  };

  const handleOpenDeletePopup = (type) => {
    if (type === "section") {
      setShowDeleteSectionPopup(true);
    } else if (type === "subsection") {
      setshowDeleteSubSectionPopup(true);
    } else if (type === "subsubsection") {
      setshowDeleteSubSubSectionPopup(true);
    }
  };

  // section creation api calls
  const handleCreateSection = async () => {
    if (sectionName.trim()) {
      const response = await registerWarehouse({
        auth,
        name: sectionName,
      });
      if (response.status === 201) {
        console.log("Section created successfully", response.data);
        handleClosePopup();
      } else {
        alert("Failed to create a new Area.");
      }
    } else {
      alert("Area name cannot be empty.");
    }

    setRefresh(!refresh);
  };

  const handleCreateSubSection = async () => {
    if (selectedSection && subSectionName.trim()) {
      const response = await registerSubWarehouse({
        // Use an API call for subsection creation
        auth,
        name: subSectionName,
        sectionId: selectedSection, // Assuming API accepts a sectionId for subsection creation
      });
      if (response.status === 201) {
        console.log("SubSection created successfully", response.data);
        handleClosePopup();
      } else {
        alert("Failed to create a new Division.");
      }
    } else {
      alert("Both Area and Division names are required.");
    }

    setRefresh(!refresh);
  };

  const handleCreateSubSubSection = async () => {
    if (selectedSubSection && subSubSectionName.trim()) {
      const response = await registerSubSubWarehouse({
        auth,
        name: subSubSectionName,
        subSectionId: selectedSubSection,
      });
      if (response.status === 201) {
        console.log("SubSubSection created successfully", response.data);
        handleClosePopup();
      } else {
        alert("Failed to create a new Sub-Division.");
      }
    } else {
      alert("Both Division and Sub-Division names are required.");
    }

    setRefresh(!refresh);
  };

  // section delete api calls
  const handleDeleteSection = async () => {
    if (deleteSectionId) {
      const response = await deleteSection({
        auth,
        sectionId: deleteSectionId,
      });
      if (response.status === 200) {
        alert("Area deleted successfully.");
        setSections(
          sections.filter((section) => section.id !== deleteSectionId)
        ); // Update the sections list locally
      } else {
        alert("Failed to delete the Area.");
      }
      setDeleteSectionId(""); // Reset the selected section ID
      handleClosePopup(); // Close the popup
    } else {
      alert("Please select an Area to delete.");
    }

    setRefresh(!refresh);
  };

  const handleDeleteSubSection = async () => {
    console.log("BUTTON!");
    console.log("HERE", selectedSubSection);
    if (selectedSubSection) {
      const response = await deleteSubSection({
        auth,
        subSectionId: selectedSubSection,
      });
      if (response.status === 200) {
        alert("Division deleted successfully.");
        setSubSections(
          subSections.filter(
            (subSection) => subSection.id !== selectedSubSection
          )
        );
      } else {
        alert("Failed to delete the Division.");
      }
      setDeleteSubSectionId("");
      handleClosePopup();
    } else {
      alert("Please select a Division to delete.");
      console.log("DELETESUBID:", selectedSubSection);
    }
    setRefresh(!refresh);
  };

  const handleDeleteSubSubSection = async () => {
    console.log(" handledeletesubsubid", selectedSubSubSection);
    // its getting here...
    if (selectedSubSubSection) {
      const response = await deleteSubSubSection({
        auth,
        subSubSectionId: selectedSubSubSection,
      });
      if (response.status === 200) {
        alert("Sub-Division deleted successfully.");
        setSubSubSections(
          subSubSections.filter(
            (subSubSection) => subSubSection.id !== selectedSubSubSection
          )
        ); // Update the sections list locally
      } else {
        alert("Failed to delete the Sub-Division.");
      }
      setDeleteSubSubSectionId(""); // Reset the selected section ID
      handleClosePopup(); // Close the popup
    } else {
      alert("Please select a Sub-Division to delete.");
    }
    setRefresh(!refresh);
  };

  return (
    <div>
      <div className="button-container">
        <div className="button-row">
          <button
            onClick={() => setShowSectionPopup(true)}
            className="create-warehouse-button"
          >
            Add Area
          </button>
          <button
            onClick={() => setShowSubSectionPopup(true)}
            className="create-warehouse-button"
          >
            Add Division
          </button>
          <button
            onClick={() => setShowSubSubSectionPopup(true)}
            className="create-warehouse-button"
          >
            Add Sub-Division
          </button>
        </div>
        <div className="button-row">
          <button
            onClick={() => handleOpenDeletePopup("section")}
            className="create-warehouse-button"
          >
            Delete Area
          </button>
          <button
            onClick={() => handleOpenDeletePopup("subsection")}
            className="create-warehouse-button"
          >
            Delete Division
          </button>
          <button
            onClick={() => handleOpenDeletePopup("subsubsection")}
            className="create-warehouse-button"
          >
            Delete Sub-Division
          </button>
        </div>
      </div>
      {showSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className="popup-text">Add New Area.</h2>
            <input
              type="text"
              value={sectionName}
              placeholder="Area Name."
              onChange={(e) => setSectionName(e.target.value)}
              style={{
                display: "block",
                width: "88%",
                padding: "8px",
                marginBottom: "10px",
                marginRight: "10px",
              }}
            />
            <div>
              <button onClick={handleCreateSection}>Create</button>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showSubSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className="popup-text">Add New Division.</h2>
            <label className="popup-text">Area:</label>
            <select
              value={selectedSection}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
              }}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select a section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
            {selectedSection && (
              <div>
                <input
                  type="text"
                  value={subSectionName}
                  onChange={(e) => setSubSectionName(e.target.value)}
                  placeholder="Sub-Division Name."
                  style={{
                    display: "block",
                    width: "88%",
                    padding: "8px",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}
            <button onClick={handleCreateSubSection}>Create</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {showSubSubSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className="popup-text">Add New Sub-Division.</h2>
            <label className="popup-text">Area:</label>
            <select
              value={selectedSection}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
              }}
              onChange={(e) => {
                setSelectedSection(e.target.value);

                setSelectedSubSection(""); // Reset selected subsection when section changes
              }}
            >
              <option value="">Select a section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
            {selectedSection && (
              <div>
                <label className="popup-text">Division:</label>
                <select
                  value={selectedSubSection}
                  onChange={(e) => setSelectedSubSection(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                  }}
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
                <input
                  type="text"
                  value={subSubSectionName}
                  onChange={(e) => setSubSubSectionName(e.target.value)}
                  placeholder="Sub-Division Name."
                  style={{
                    display: "block",
                    width: "88%",
                    padding: "8px",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}
            <button onClick={handleCreateSubSubSection}>Create</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {showDeleteSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className="popup-text">Delete Area.</h2>
            <h6 className="warning-text">
              WARNING! Will delete all related sections and items below this
              heirarchy!
            </h6>
            <select
              value={deleteSectionId}
              onChange={(e) => setDeleteSectionId(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
              }}
            >
              <option value="">Select a section to delete</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
            <button onClick={handleDeleteSection}>Delete</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {showDeleteSubSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className="popup-text">Delete Division.</h2>
            <h6 className="warning-text">
              WARNING! Will delete all related sections and items below this
              heirarchy!
            </h6>
            <label className="popup-text">Area:</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
              }}
            >
              <option value="">Select a section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
            {selectedSection && (
              <div>
                <label className="popup-text">Division:</label>
                <select
                  value={selectedSubSection}
                  onChange={(e) => setSelectedSubSection(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <option value="">Select a sub section</option>
                  {subSections.map((subSection) => (
                    <option key={subSection.id} value={subSection.id}>
                      {subSection.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button onClick={handleDeleteSubSection}>Delete</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {showDeleteSubSubSectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className="popup-text">Delete Sub-Division.</h2>
            <h6 className="warning-text">
              WARNING! Will delete all related sections and items below this
              heirarchy!
            </h6>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
              }}
            >
              <option value="">Select a section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
            {selectedSection && (
              <div>
                <label className="popup-text">Division:</label>
                <select
                  value={selectedSubSection}
                  onChange={(e) => setSelectedSubSection(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                  }}
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
                <label className="popup-text">Sub-Division:</label>
                <select
                  value={selectedSubSubSection}
                  onChange={(e) => setSelectedSubSubSection(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                  }}
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
            <button onClick={handleDeleteSubSubSection}>Delete</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
      <div className="popup-text">
        <WarehouseDisplay refresh={refresh} />
      </div>
    </div>
  );
};

export default CreateWarehouse;
