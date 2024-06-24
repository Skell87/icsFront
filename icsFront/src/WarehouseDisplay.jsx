import { AuthContext } from "./Context";
import { useContext, useState, useEffect } from "react";
import { getSection, getSubSections, getSubSubSections } from "./api";

const WarehouseDisplay = ({ refresh }) => {
  const { auth } = useContext(AuthContext);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const sectionResponse = await getSection({ auth });
        const sectionsData = sectionResponse.data;
        for (const section of sectionsData) {
          const subSectionResponse = await getSubSections({
            auth,
            sectionId: section.id,
          });
          section.subSections = subSectionResponse.data;
          for (const subSection of section.subSections) {
            const subSubSectionResponse = await getSubSubSections({
              auth,
              subSectionId: subSection.id,
            });
            subSection.subSubSections = subSubSectionResponse.data;
          }
        }
        setSections(sectionsData);
      } catch (error) {
        console.error("Error fetching sections", error);
      }
    };

    fetchSections();
  }, [auth, refresh]);

  return (
    <div className="warehouse-container">
      {sections.map((section) => (
        <div key={section.id} className="section">
          <h2>{section.name}:</h2>
          {section.subSections &&
            section.subSections.map((subSection) => (
              <div key={subSection.id} className="sub-section">
                <h3>{subSection.name}:</h3>
                {subSection.subSubSections &&
                  subSection.subSubSections.map((subSubSection) => (
                    <div key={subSubSection.id} className="sub-sub-section">
                      <h4>{subSubSection.name}</h4>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default WarehouseDisplay;
