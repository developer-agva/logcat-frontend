import React from "react";
import { Navbar } from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Style from "../css/NavBarForAll.module.css"

// import { lazy } from "react";
// const Style =lazy(()=>import( "../css/NavBarForAll.module.css"));
function NavBarForAll() {

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const userRole = adminInfo && adminInfo.data && adminInfo.data.userType

  const navigate=useNavigate();
  return (
    <nav >
      <div class={Style.container}>
        <button onClick={()=>navigate(userRole === 'Super-Admin' ? '/adminDashboard' : '/')}>
        <span  className={Style.logoText}
          >
            AgVa Healthcare
          </span>
        </button>
        <Navbar />
      </div>
    </nav>
  );
}

export default NavBarForAll;