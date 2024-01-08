
/* eslint-disable */
import React, { useEffect, useState } from "react";
import CustomeDropDown from "../container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../store/action/AdminAction";
import Style from "../css/NavBar.module.css";
import { ThemeContext } from "./ThemeContext";
import doctor from "../assets/images/doctor.png"
import user from "../assets/images/man.png"
import dispatchIcon from "../assets/images/dispatch.png"
import { IoMdNotificationsOutline } from "react-icons/io";
import Notification from "./Notification";
import { getServicesDataAction } from "../store/action/ServiceEngAction";
export function Navbar() {

  const dispatch = useDispatch()
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  let { sideMenu } = React.useContext(ThemeContext);
  const { adminInfo } = adminLoginReducer;

  const avatar = useState(
    adminInfo && adminInfo.image && adminInfo.image && adminInfo.data.token
  )[0];

  // SHOW ACCOUNT DETAILS

  const [userInfo, setUserInfo] = useState(false);
  const userRole = adminInfo && adminInfo.data && adminInfo.data.userType
  let navigate = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(navigate));
    localStorage.setItem('userrole', userRole)
  };
  const showUserInfoFun = () => {
    setUserInfo(!userInfo);
  };
  const Updatedname = localStorage.getItem("name")
  const Updatedemail = localStorage.getItem("email")

  const history = useNavigate();
  const handleNotify = (e) => {
    e.preventDefault()
    history('/notificationHandle')
  }
  const handleClick = (e) => {
    e.preventDefault()
    history('/hospitalAdminUserRequest')
  }
  const handleManageAccount = () => {
    if (adminInfo && adminInfo.data && adminInfo.data.userType == "User") {
      navigate("/update_profile_details")
    }
    else{
      navigate("/update")
    }
  }
  return (
    <>
      <section className={`${Style.NavbarOuter}`}>
        <nav class="flex top-0 z-50 w-full border-b border-gray-200 p-2 flex-1 justify-between" style={{ backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.20) 0px 0px 10px' }}>
          <span style={{ color: '#cb297b', margin: '0 4rem' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">AgVa</span>
          <section style={{ display: 'flex', gap: '1vw' }} className={sideMenu == "sidebar" ? `${Style.detailSection}` : `navBarDetails`}>
            {userRole === 'Support' ?
              <div>
                <button onClick={handleNotify} type="button" class="inline-flex items-center px-2 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <IoMdNotificationsOutline />
                </button>
              </div>
              : userRole == 'Hospital-Admin' ?
                <div>
                  <button type="button" onClick={handleClick} style={{ backgroundColor: '#cb297b' }} class="inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <IoMdNotificationsOutline />
                  </button>
                </div>
                : ''}
            <section
              className={
                sideMenu == "sidebar"
                  ? `${Style.AvatarSection}`
                  : `AvatarSectionSidbar`
              }
              onClick={showUserInfoFun}
            >
              {adminInfo && adminInfo.data && adminInfo.data.userType == "Super-Admin" ?
                <img className={Style.adminAvtar} src={doctor} /> :
                adminInfo && adminInfo.data && adminInfo.data.userType == "User" ?
                  <img src={user} style={{ widt: "1rem", height: "3rem" }} /> :
                  <img src={dispatchIcon} style={{ widt: "0rem", height: "2.5rem" }} />}
            </section>
          </section>
        </nav>
        {userInfo && (
          <CustomeDropDown
            position="fixed"
            right="0%"
            top="6%"
            width="400px"
            zIndex="10"
            marginRight="10px"
          >
            <section
              className={Style.AvatarSectionDropDown}
              onClick={showUserInfoFun}
            >
              {adminInfo && adminInfo.data && adminInfo.data.userType == "Super-Admin" ?
                <img className="avtar" src={doctor} style={{ widt: "0rem", height: "3rem" }} /> :
                adminInfo && adminInfo.data && adminInfo.data.userType == "User" ?
                  <img className="avtar" src={user} style={{ widt: "0rem", height: "4rem" }} /> :
                  <img className="avtar" src={dispatchIcon} style={{ widt: "1rem", height: "3.5rem" }} />}
            </section>
            <p
              className={Style.UpdateNameText}
            >
              {/* {localStorage.getItem("name")} */}
              {adminInfo && adminInfo.data && adminInfo.data.userType == "Super-Admin" ? <> Dr. {Updatedname}</> : adminInfo && adminInfo.data && Updatedname}
            </p>
            <p
              className={Style.updateEmailText}
            >
              {Updatedemail}
            </p>
            <section
              // onClick={() => navigate("/update")}
              onClick={handleManageAccount}


              className={`${Style.manageAccount} darkModeColor`}
              style={{ border: "1px solid #fff" }}
            >
              Manage your account
            </section>
            <section
              style={{ border: "1px solid #fff", marginTop: "5px" }}
              className={`${Style.logoutAccount} darkModeColor`}
              onClick={(e) => {
                handlelogout(e);
              }}
            >
              Logout
            </section>
            <section className={Style.privacyPolicy}>
              <Link to="/privacyPolicy" style={{ textDecoration: "none", color: "#CB297B" }}>
                <h6 style={{ fontSize: "0.8rem" }}>Privacy policy</h6>
              </Link>
              <Link to="/termsOfServices" style={{ textDecoration: "none", color: "#CB297B" }}>
                <h6 style={{ fontSize: "0.8rem" }}>Terms of service</h6>
              </Link>
            </section>
          </CustomeDropDown>
        )}
      </section>
    </>
  );
}
