import React, { useEffect } from "react";
import { useState } from "react";
import CustomCard from "../../container/CustomCard";
import Style from "../../css/AdminDashboard.module.css";
import { Col } from "react-bootstrap";
import agvaVenti from "../../assets/images/AgVaCrop2.png";
import production from "../../assets/images/production.png";
import dispatchImg from "../../assets/images/delivery.png";
import accounting from "../../assets/images/accounting.png";

import deviceAssign from "../../assets/icons/deviceAssign.png";
import { Navbar } from "../../utils/NavBar";
import {
  getDefaultDataForDashboard,
  getSoldDemoDataAction,
} from "../../store/action/AdminDashboard";
import SideBar from "../../utils/Sidebar";
import { Link, json } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LineChart from "./LineChart";
import "../../css/LineChart.css";
import { useDispatch, useSelector } from "react-redux";
import NavBarForAll from "../../utils/NavBarForAll";
import Doughnut from "./Doughnut";
const AdminDashboard = () => {
  const dashboardDataDefault = useSelector(
    (state) => state.dashboardDataDefault
  );
  const { data: getDataForDashboard } = dashboardDataDefault;

  const getDemoSoldDataReducer = useSelector(
    (state) => state.getDemoSoldDataReducer
  );
  const { data: getDemoSoldData } = getDemoSoldDataReducer;

  let purposeDevices=getDemoSoldData?.data;
  const totalCounts =
    getDataForDashboard && getDataForDashboard.data.totalCounts;
  const getDataOfMonthly = getDataForDashboard && getDataForDashboard.data;
  const dispatch = useDispatch();
  const [durationData, setDsetDurationDataata] = useState("weekly");
  const statusOfDuration = (e) => {
    e.preventDefault();
    setDsetDurationDataata(e.target.value);
    dispatch(getDefaultDataForDashboard(durationData));
  };
  const firstDurationData = "monthly";
  useEffect(() => {
    dispatch(getDefaultDataForDashboard(firstDurationData));
  }, []);
  useEffect(() => {
    dispatch(getSoldDemoDataAction());
  }, []);
  var rohan =
    durationData == "weekly"
      ? getDataOfMonthly && getDataOfMonthly.monthlyCounts
      : getDataOfMonthly && getDataOfMonthly.weeklyCounts;
  const values = rohan && rohan.map((item) => item.count);
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: [""],
        data: values,
        fill: false,
        borderColor: "#cb297b",
        tension: 0.3,
      },
    ],
  };
const value1=purposeDevices?.map((item)=>item.count)
  const demo=purposeDevices?.filter((item1)=>item1._id==="Demo").map((item1)=>item1.count);
  const sold=purposeDevices?.filter((item2)=>item2._id==="Sold").map((item2)=>item2.count);
  console.log('demo',purposeDevices,value1)
const data1 = {
    labels: ['Sold','Demo'],
    datasets: [
      {
        data: value1,
        backgroundColor: [
          "rgb(54, 162, 235)",
          "#cb297b",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <NavBarForAll />
      <>
        <Col
          xl={4}
          lg={4}
          md={6}
          sm={6}
          style={{
            marginLeft: "2rem",
            paddingTop: "6rem",
            display: "flex",
            gap: "3rem",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <CustomCard
            padding="15px"
            height="200px"
            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
            width="17%"
          >
            <Link to="/manageUsers" style={{ textDecoration: "none" }}>
              <div
                className="project-cart"
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginLeft: "2rem",
                  width: "16rem",
                  height: "7rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ color: "#cb2971", width: "12%", height: "30%" }}
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
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                        Manage Users
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CustomCard>
          <CustomCard
            padding="15px"
            height="200px"
            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
            width="30%"
          >
            <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "16rem",
                height: "7rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/home" style={{ textDecoration: "none" }}>
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <img
                    src={agvaVenti}
                    style={{ height: "4rem" }}
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
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                        Manage Device
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CustomCard>
          {/* Production */}
          <CustomCard
            padding="15px"
            height="200px"
            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
            width="30%"
          >
            <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "16rem",
                height: "7rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              
              <Link to="/productionModel" style={{ textDecoration: "none" }}>
                <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                    src={production}
                    style={{ height: "4rem" }}
                    alt="Production"
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
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                        Production
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CustomCard>
          {/* Dispatch */}
          <CustomCard
            padding="15px"
            height="200px"
            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
            width="30%"
          >
            <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "16rem",
                height: "7rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to="/dispatchDashboardModule"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                    src={dispatchImg}
                    style={{ height: "4rem" }}
                    alt="dispatch"
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
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                        Dispatch
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CustomCard>
          {/* Accouint */}
          <CustomCard
            padding="15px"
            height="200px"
            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
            width="30%"
          >
            <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "16rem",
                height: "7rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to="/accountDasboard" style={{ textDecoration: "none" }}>
                <div className="d-flex" style={{ gap: "2rem" }}>
                <img
                    src={accounting}
                    style={{ height: "3rem" }}
                    alt="account"
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
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                        Account
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CustomCard>
        </Col>
        <Col
          xl={4}
          lg={4}
          md={6}
          sm={6}
          style={{
            marginLeft: "2rem",
            paddingTop: "6rem",
            display: "flex",
            gap: "3rem",
            width: "100%",
          }}
        >
          <div
            className="chart_container"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div className="doughnut_chart">
              <div className="upper_div">
                <div className="graph_heading">
                <h6
                    style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}
                  >
                    Total Demo <span>{demo}</span>
                  </h6>
                  <h6
                    style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}
                  >
                    Total Sold <span>{sold}</span>
                  </h6>
                </div>
                <span>{purposeDevices?._id}</span>
              </div>
              <Doughnut chartData={data1} className="doughnut_data" />
            </div>
          </div>
        </Col>
        <Col
          xl={4}
          lg={4}
          md={6}
          sm={6}
          style={{
            marginLeft: "2rem",
            paddingTop: "6rem",
            display: "flex",
            gap: "3rem",
            width: "100%",
          }}
        >
          <div
            className="chart_container"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div className="line_chart">
              <div className="upper_div">
                <div className="graph_heading">
                  <h6
                    style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}
                  >
                    TOTAL DEVICES
                  </h6>
                  <select className="select_details">
                    <option value="volvo">Monthly</option>
                    <option value="saab">Weekly</option>
                  </select>
                </div>
                <span>{totalCounts}</span>
              </div>
              <LineChart chartData={data} className="lineChart_data" />
            </div>
            <div className="line_chart">
              <div className="upper_div">
                <div className="graph_heading">
                  <h6
                    style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}
                  >
                    TOTAL ACTIVE DEVICES
                  </h6>
                  <select
                    className="select_details"
                    onChange={(e) => statusOfDuration(e)}
                  >
                    <option value="weekly">Monthly</option>
                    <option value="monthly">Weekly</option>
                  </select>
                </div>
                <span>{totalCounts}</span>
              </div>
              <LineChart
                type="doughnut"
                chartData={data}
                className="lineChart_data"
              />
            </div>
          </div>
        </Col>
      </>
    </>
  );
};

export default AdminDashboard;
