import React, { useState } from "react";
import ActiveUsers from "./StatusOfUsres/ActiveUsers";
import PendingUsrs from "./StatusOfUsres/PendingUsrs";
import AllUseres from "./StatusOfUsres/AllUseres";
import NavBarForAll from "../../utils/NavBarForAll";
import InActiveUsers from "./StatusOfUsres/InActiveUsers";
import Style from "../../css/HospitalAdminUser.module.css"
import AssignHospitalToAssisnant from "./StatusOfUsres/AssignHospitalToAssisnant";
function HospitalAdminUser() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <NavBarForAll />
      <div
        className={Style.container}
      >
        <div className={Style.insideContainer}>
          <button onClick={() => handleTabClick(0)}>
            <div
            className={activeTab === 0? Style.onDataClick:Style.offDataClick}
            >
              <h5  className={Style.tileText}>Active User's</h5>
            </div>
          </button>
          <button onClick={() => handleTabClick(3)}>
            <div
               className={activeTab === 3? Style.onDataClick:Style.offDataClick}
            >
              <h5 className={Style.tileText}>Inactive User's</h5>
            </div>
          </button>
          <button onClick={() => handleTabClick(1)}>
            <div
               className={activeTab === 1? Style.onDataClick:Style.offDataClick}
            >
              <h5 className={Style.tileText}>Pending User's</h5>
            </div>
          </button>
          {/* <button onClick={() => handleTabClick(2)}>
            <div
               className={activeTab === 2? Style.onDataClick:Style.offDataClick}
            >
              <h5 className={Style.tileText}>Permission</h5>
            </div>
          </button> */}
<button onClick={() => handleTabClick(4)}>
            <div
               className={activeTab === 4? Style.onDataClick:Style.offDataClick}
            >
              <h5 className={Style.tileText}>Assign Assistant</h5>
            </div>
          </button>
         
        </div>
        <div className={Style.cardButton}>
          {activeTab === 0 && <ActiveUsers />}
          {activeTab === 3 && <InActiveUsers />}
          {activeTab === 1 && <PendingUsrs />}
          {activeTab === 2 && <AllUseres />}
          {activeTab === 4 && <AssignHospitalToAssisnant />}
        </div>
      </div>
    </>
  );
}

export default HospitalAdminUser;
