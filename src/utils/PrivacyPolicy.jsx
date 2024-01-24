import React from 'react'
import { Navbar } from "./NavBar";
import SideBar from "./Sidebar";
import back from "../../src/assets/images/back.png";
import { Link } from "react-router-dom";
import NavBarForAll from './NavBarForAll';

function PrivacyPolicy() {
  const goBack = () => {
    window.history.go(-1)
  }
  return (
    <>
      <NavBarForAll />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "2rem" }}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Heading  */}
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              color: "#707070",
            }}
          >
            <Link onClick={goBack}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4>Privacy Policy</h4>

          </div>
          {/* Details */}
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10rem",
              width: "100%",
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              boxShadow: "0px 0px 50px #00000029",
              borderRadius: "15px",
              padding: "2rem",
              marginLeft: "0px",
            }}
          >
            <div className="d-flex" style={{ flexDirection: "column", gap: "1rem" }}>
              <h5 style={{ fontWeight: 'bold' }}>
                Privacy Policy for Ventilator
              </h5>
              <p style={{ fontSize: '0.9rem', color: 'grey' }}>
                Last updated: [Date]
                <br />
                Thank you for visiting our website. This Privacy Policy explains how we collect, use, disclose, and protect information about you. By using our website, you agree to the terms of this Privacy Policy.
              </p>
              <h5 style={{ fontWeight: 'bold' }}>Information We Collect</h5>
              <div>
                <h6>Personal Information</h6>
                <p style={{ fontSize: '0.9rem', color: 'grey', fontWeight: 'bold' }}>We may collect personal information, such as your name, contact information, and
                  other details, when you provide it voluntarily through forms on our website or by
                  contacting us.</p>
              </div>
              <div>
                <h6>Usage Information</h6>
                <p style={{ fontSize: '0.9rem', color: 'grey', fontWeight: 'bold' }}>We may collect information about how you use our website, including your IP address, device information, and browsing history.

                </p>
              </div>
              <div>
                <h6>Personal Information</h6>
                <p style={{ fontSize: '0.9rem', color: 'grey' }}>We may collect personal information, such as your name, contact information, and
                  other details, when you provide it voluntarily through forms on our website or by
                  contacting us.</p>
              </div>
              <div>
                <h6>Personal Information</h6>
                <p style={{ fontSize: '0.9rem', color: 'grey' }}>We may collect personal information, such as your name, contact information, and
                  other details, when you provide it voluntarily through forms on our website or by
                  contacting us.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy