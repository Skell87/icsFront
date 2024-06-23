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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleMenuItemClick = (view) => {
    setView(view);
    setIsMenuOpen(false);
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

  return (
    <>
      <div>
        <></>
        <div className="spa-header">
          <img
            className="header-logo"
            src="/src/assets/logo.png"
            alt="a logo of a mule with a box"
          ></img>
          <h2 className="site-title">Pack Mule</h2>
          <div className="hamburger-menu" onClick={toggleMenu}>
            &#9776;
          </div>
        </div>
        <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
          <button
            className="nav-button"
            onClick={() => handleMenuItemClick("LandingPage")}
          >
            Home
          </button>
          <button
            className="nav-button"
            onClick={() => handleMenuItemClick("CreateWarehouse")}
          >
            Manage Warehouse
          </button>
          <button
            className="nav-button"
            onClick={() => handleMenuItemClick("ManageInventory")}
          >
            Manage Inventory
          </button>
          <button className="nav-button" onClick={() => handleLogout()}>
            Logout
          </button>
        </ul>
      </div>
      <div className="update-plate">{display}</div>
    </>
  );
}
export default HomePage;
