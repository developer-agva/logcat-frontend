import { Link } from "react-router-dom";
import "../../index.css";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import ServiceModuleNavBar from "../device/ServiceEnginner/ServiceModuleNavBar";
import CreateProject from "../projects/CreateProject";
import NavBarForAll from "../../utils/NavBarForAll";

function App() {
  return (
    <div className="App">
      <NavBarForAll/>
      <div className="SideMenuAndPageContent">
        <CreateProject />
      </div>
    </div>
  );
}
export default App;