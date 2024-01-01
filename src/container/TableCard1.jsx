import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { themes } from "../utils/ThemeContext";
// import { themes } from "../utils/ThemeContext";
export default function TableCard1(props) {
  // dark mode state
  const darkMode = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  )[0];
  return (
    <>
      <div className=" mb-5 "
        style={{
          overflowX:'auto',
          backgroundColor: darkMode? "bg-black":"bg-white",
          width: props.width ? props.width : "100%",
          borderRadius: props.borderRadius ? props.borderRadius : "20px",
          padding: props.padding ? props.padding : "0px",
          position: props.position ? props.position : "relative",
          right: props.right ? props.right : "",
          boxShadow: props.boxShadow ? props.boxShadow : "",
          top: props.top ? props.top : "",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          // boxShadow: "0px 0px 50px #00000029",
        }}
      >
        {props.children}
      </div>
    </>
  );
}