/* eslint-disable */

import React from "react";
import CustomCard from "../../container/CustomCard";
import { Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import agvaVenti from "../../assets/images/AgVaCrop.png";
import { useSelector } from "react-redux";
import Style from '../../css/AllProject.module.css'
import { Card } from 'flowbite-react';

const Allprojects = (props) => {
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  console.log('adminInfo', adminInfo)
  const userType = adminInfo && adminInfo.data && adminInfo.data.userType
  const { theme } = React.useContext(ThemeContext);
  let newDate = props.data.createdAt.split("T")[0];
  let year = newDate.split("-")[0];
  let month = newDate.split("-")[1];
  let day = newDate.split("-")[2];
  newDate = `${day}-${month}-${year}`;

  return (
    <>
      <ThemeContext.Consumer>
        {(value) => (
          <>
            <Col xl={4} lg={4} md={6} sm={6}>
              <div
              >
                {userType === 'User' ?
                  <Link
                  to={`/device?code=${props.data.code}&name=${props.data.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      className="max-w-sm flex flex-row items-center justify-content-evenly"
                      renderImage={() => <Image width={100} height={100} src={agvaVenti} alt="AgvaVenti" />}
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        AgVa Pro
                      </h5>
                    </Card>
                  </Link>
                  :
                  <div style={{display:'flex' ,gap:'1rem'}}>

                  <Link
                    to={`/device?code=${props.data.code}&name=${props.data.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="project-cart"
                      style={{
                        backgroundColor: "white",
                        padding: "1rem",
                        borderRadius: "15px",
                        width: "25rem",
                        height: "100%",
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px',
                        background: '0% 0% no-repeat padding-box padding-box rgb(255, 255, 255)'
                      }}
                    >
                      <div className="d-flex" style={{ gap: "5rem" }}>
                        <img
                          src={agvaVenti}
                          style={{ height: "12rem" }}
                          alt="AgvaVenti"
                        />
                        <div
                          className="d-flex"
                          style={{
                            gap: "1rem",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <h6 style={{ color: "#707070", fontSize: "2.5rem" }}>
                              AgVa Pro
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={`/device?code=${props.data.code}&name=${props.data.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="project-cart"
                      style={{
                        backgroundColor: "white",
                        padding: "1rem",
                        borderRadius: "15px",
                        width: "25rem",
                        height: "100%",
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px',
                        background: '0% 0% no-repeat padding-box padding-box rgb(255, 255, 255)'
                      }}
                    >
                      <div className="d-flex" style={{ gap: "5rem" }}>
                        <img
                          src={agvaVenti}
                          style={{ height: "12rem" }}
                          alt="AgvaVenti"
                        />
                        <div
                          className="d-flex"
                          style={{
                            gap: "1rem",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <h6 style={{ color: "#707070", fontSize: "2.5rem" }}>
                              Oxy Plus
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  </div>
                }
              </div>
            </Col>
          </>
        )}
      </ThemeContext.Consumer>
    </>
  );
};
export default Allprojects;
