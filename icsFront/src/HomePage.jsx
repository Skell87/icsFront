// import Header from "./Header";
import AddUser from "./AddUser";
import CreateWarehouse from "./CreateWarehouse";
import LandingPage from "./LandingPage";
import ManageInventory from "./ManageInventory";
import Metrics from "./Metrics";
import PickLists from "./PickLists";
import UserProfiles from "./UserProfiles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context";

function HomePage() {
  const [view, setView] = useState("HomePage");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    // delete accesstoken
    // redirect to login.
  };

  function displaySelector() {
    switch (view) {
      case "LandingPage":
        return <LandingPage />;
        break;
      case "CreateWarehouse":
        return <CreateWarehouse />;
        break;
      case "ManageInventory":
        return <ManageInventory />;
        break;
      default:
        return <LandingPage />;
    }
  }

  const display = displaySelector();

  //   if manager, display all,
  //   if worker return less

  return (
    <>
      <div>
        <></>
        <h1>this is where the navigation links will go.</h1>
        <ul className="NavList">
          <button className="button" onClick={() => setView("LandingPage")}>
            Home
          </button>
          <button className="button" onClick={() => setView("CreateWarehouse")}>
            Manage Warehouse
          </button>
          <button className="button" onClick={() => setView("ManageInventory")}>
            Manage Inventory
          </button>
          <button className="button" onClick={() => handleLogout()}>
            Logout
          </button>
        </ul>
      </div>
      <div className="updatePlate">{display}</div>
    </>
  );
}

export default HomePage;
