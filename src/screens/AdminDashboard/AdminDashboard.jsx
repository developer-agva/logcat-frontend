import React, { useEffect } from "react";
import { useState } from "react";
import CustomCard from "../../container/CustomCard";
import { Col } from "react-bootstrap";
import agvaVenti from "../../assets/images/AgVaCrop2.png";
import production from "../../assets/images/production.png";
import dispatchImg from "../../assets/images/delivery.png";
import accounting from "../../assets/images/accounting.png";
import {
  getActiveDemoDeviceAction,
  getActiveDeviceAction,
  getDefaultDataForDashboard,
  getDemoDevices,
  getSoldDemoDataAction,
} from "../../store/action/AdminDashboard";
import { Link, json } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LineChart from "./LineChart";
import "../../css/LineChart.css";
import { useDispatch, useSelector } from "react-redux";
import NavBarForAll from "../../utils/NavBarForAll";
import Doughnut from "./Doughnut";
import DougnutSuction from "./DougnutSuction";
const AdminDashboard = () => {

  const [year, setYear] = useState('2024');
  const [results, setResults] = useState([]);

  //  dashboard data
  const dashboardDataDefault = useSelector((state) => state.dashboardDataDefault);
  const { loading, data: getDataForDashboard } = dashboardDataDefault;

  // demosold data reducer
  const getDemoSoldDataReducer = useSelector((state) => state.getDemoSoldDataReducer);
  const { data: getDemoSoldData } = getDemoSoldDataReducer;
  let purposeDevices = getDemoSoldData?.data;

  // device total demo device
  const getDemoDataCountReducer = useSelector((state) => state.getDemoDataCountReducer);
  const { loading: loading3, data: deviceDemo } = getDemoDataCountReducer;

  // total active devices
  const getActiveDevicesReducer = useSelector((state) => state.getActiveDevicesReducer);
  const { loading: loading2, data: totalActiveDevice } = getActiveDevicesReducer;

  // total active demo devices
  const getActiveDemoReducer = useSelector((state) => state.getActiveDemoReducer);
  const { loading: loading5, data: activeDemoDeviceData } = getActiveDemoReducer;

  const dispatch = useDispatch();
  const [durationData, setDsetDurationDataata] = useState("monthly");
  const [totalDemoState, setTotalDemoState] = useState("monthly");
  const [activedevices, setActiveDevices] = useState("monthly");
  const [activeDemoDevice, setActiveDemoDevice] = useState("monthly");

  const statusOfDuration = (e) => {
    e.preventDefault();
    setDsetDurationDataata(e.target.value);
    dispatch(getDefaultDataForDashboard(e.target.value));
  };

  const totalDemoChange = (e) => {
    e.preventDefault();
    setTotalDemoState(e.target.value)
    dispatch(getDemoDevices(e.target.value))
  }



  const activeDemoDevicesDataClick = (e) => {
    e.preventDefault();
    setActiveDemoDevice(e.target.value);
    dispatch(getActiveDemoDeviceAction(e.target.value))
  };

  function reloadClass() {
    document.getElementById('lineCharthai', () => {
      window.location.reload();
    })
  }

  useEffect(() => {
    setTimeout(() => {
      reloadClass();
    }, 10000);
  }, [])

  useEffect(() => {
    dispatch(getDefaultDataForDashboard(durationData));
    dispatch(getSoldDemoDataAction());
    dispatch(getDemoDevices(totalDemoState))
    dispatch(getActiveDeviceAction(activedevices))
    dispatch(getActiveDemoDeviceAction(activeDemoDevice))
  }, []);


  var rohan = durationData == "monthly" ? getDataForDashboard?.totalDevicesCountMonthly : durationData == "yearly" ? getDataForDashboard?.totalDevicesCountYearly : durationData == "weekly" ? getDataForDashboard?.totalDevicesCountWeekly : getDataForDashboard?.todayActiveDeviceCount

  const values = rohan && rohan.map((item) => item.count);
  const yearname = rohan && rohan.map((item) => item.duration);
  const data = {
    labels: yearname,
    datasets: [
      {
        label: [""],
        data: values,
        fill: false,
        borderColor: "#cb297b",
        tension: 0.3,
        xAxisID: "Month"
      },
    ],
  };
  const totalDevicesOption={
    scales:{
      y:{
        suggestedMin:0,
        suggestedMax:getDataForDashboard?.maxCount+20,
      }
    }
  }
  console.log('sex',totalDevicesOption)
  var rana = totalDemoState == "monthly"
    ? deviceDemo?.totalDevicesCountMonthly
    : totalDemoState == "yearly" ? deviceDemo?.totalDevicesCountYearly : totalDemoState === "weekly" ? deviceDemo?.weeklyDataCount : deviceDemo?.todayActiveDeviceCount;
  const demoValues = rana && rana.map((item) => item.count);
  const demoYearname = rana && rana.map((item) => item.duration);

  // Total demo devices data
  const demoData = {
    labels: demoYearname,
    datasets: [
      {
        label: [""],
        data: demoValues,
        fill: false,
        borderColor: "#cb297b",
        tension: 0.3,
      },
    ],
  };
  const totalDemoDevicesOption={
    scales:{
      y:{
        suggestedMin:0,
        suggestedMax:deviceDemo?.maxCount+20
      }
    }
  }

  const [resultss, setResultss] = useState([]);

  const totalActiveDeviceData = activedevices === "monthly" ? totalActiveDevice?.monthlyDataCount : activedevices === "weekly" ? totalActiveDevice?.weeklyDataCount: activedevices === "yearly" ? totalActiveDevice?.yearlyDataCount : totalActiveDevice?.todayActiveDeviceCount;

  const activeDeviceValues = totalActiveDeviceData?.map((item) => item.count);
  const activeDeviceName = totalActiveDeviceData?.map((item) => item.duration);
  const newResultName = results?.map((item) => item?.split("is")?.[1])
  const newResultValue = resultss?.map((item) => item?.split("is")?.[1])
  const optionName = activedevices == "weekly" ? newResultName : activedevices == "monthly" ? activeDeviceName : activeDeviceName;
  const activeData = {
    labels: activeDeviceName,
    datasets: [
      {
        label: [""],
        data: activeDeviceValues,
        fill: false,
        borderColor: "#cb297b",
        tension: 0.3,
      },
    ],
  };

const totalActiveDeviceOption={
  scales:{
    y:{
      suggestedMin:0,
      suggestedMax:totalActiveDevice?.maxCount+20
    }
  }
}
// console.log('totalActiveDevice?.maxCount',totalActiveDevice?.maxCount)
  // total active devices 
  const activeDevicesDataClick = (e) => {
    e.preventDefault();
    setActiveDevices(e.target.value);
    dispatch(getActiveDeviceAction(e.target.value))
    if (activedevices === "weekly") {
      const newResults = activeDeviceName?.map((weekNumber) => {
        // Calculate the start date of the given week number
        const startOfYear = new Date(year, 0, 1);

        // Calculate the first Thursday of the year (ISO week starts on Monday, week 1 is the first week with a Thursday)
        const firstThursday = new Date(startOfYear.getTime() + ((4 - startOfYear.getDay() + 7) % 7) * 86400000);

        // Calculate the start date of the given week number
        const startOfGivenWeek = new Date(firstThursday.getTime() + (weekNumber - 1) * 7 * 86400000);

        // Get the month name
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[startOfGivenWeek.getMonth()];

        // Calculate the start of the month
        const startOfMonth = new Date(year, startOfGivenWeek.getMonth(), 1);

        // Calculate the week number in the month
        const weekOfMonth = Math.ceil((startOfGivenWeek.getDate() + startOfGivenWeek.getDay()) / 7);

        return `Week ${weekNumber} of ${year} is week ${weekOfMonth} of ${monthName}.`;
      });

      setResults(newResults);
    } else if (activedevices === "monthly") {
      const newResults = activeDeviceName?.map((monthNumber) => {
        // Create a date object with the month number
        const date = new Date(2024, monthNumber - 1, 1); // Using 2024 as an example year

        // Get the month name
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[monthNumber - 1];

        return `Month number ${monthNumber} is ${monthName}.`;
      });

      setResultss(newResults);
    }

  };

  // total active demo devices data 
  // 4
  const totalActiveDemoData = activeDemoDevice === 'weekly' ? activeDemoDeviceData?.weeklyDataCount : activeDemoDevice === 'monthly' ? activeDemoDeviceData?.monthlyDataCount : activeDemoDevice === 'yearly' ? activeDemoDeviceData?.yearlyDataCount : activeDemoDeviceData?.todayActiveDeviceCount;

  const activeDemoDeviceValues = totalActiveDemoData?.map((item) => item.count);
  const activeDemoDeviceName = totalActiveDemoData?.map((item) => item.duration);
  const demoOptionName = activeDemoDevice == "weekly" ? activeDemoDeviceName : activeDemoDevice == "monthly" ? activeDemoDeviceName : activeDemoDeviceName;
  const activeDemoData = {
    labels: demoOptionName,
    datasets: [
      {
        label: [""],
        data: activeDemoDeviceValues,
        fill: false,
        borderColor: "#cb297b",
        tension: 0.3,
      },
    ],
  };

  const totalActiveDemoDevicesOption = {
    scales: {
      y: {
        suggestedMin: 0, // Set the minimum value for the y-axis
        suggestedMax: activeDemoDeviceData?.maxCount+20, // Set the maximum value for the y-axis
      },
    },
  };

  const agvaPro = getDemoSoldData?.agvaProData?.[0];
  const suction = getDemoSoldData?.suctionData?.[0];

  const data1 = {
    labels: ['Demo', 'Sold'],
    datasets: [
      {
        data: [agvaPro?.demoCount, agvaPro?.soldCount],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "#cb297b",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const data2 = {
    labels: ['Demo', 'Sold'],
    datasets: [
      {
        data: [suction?.demoCount, suction?.soldCount],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "#cb297b",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const [count, setCount] = useState(0);
  const [timmer, setTimmer] = useState(2)
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getDefaultDataForDashboard(durationData));
      dispatch(getSoldDemoDataAction());
      dispatch(getDemoDevices(totalDemoState))
      dispatch(getActiveDeviceAction(activedevices))
      dispatch(getActiveDemoDeviceAction(activeDemoDevice))

      setCount(prevCount => prevCount + 1);
    }, timmer * 100000); // 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
          {/* agva pro */}
          <div
            className="chart_container"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div className="doughnut_chart">
              {agvaPro ?
                <>
                  <div className="div_title">
                    <p className="title">AgVa Pro</p>
                    <span>Total Devices: {agvaPro?.totalCount}</span>
                  </div>
                  <div className="upper_div">
                    <div className="graph_heading">
                      <h6
                        style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}
                      >
                        Total Demo <span>{agvaPro?.demoCount}</span>
                      </h6>
                      <h6
                        style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}
                      >
                        Total Sold <span>{agvaPro?.soldCount}</span>
                      </h6>
                    </div>
                    <span>{purposeDevices?._id}</span>
                  </div>
                  <Doughnut chartData={data1} className="doughnut_data" />
                </>
                : 'Loading...'
              }
            </div>
          </div>
          {/* suction pump */}
          <div
            className="chart_container"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div className="doughnut_chart">
              {suction ?
                <>
                  <div className="div_title">
                    <p className="title">Suction</p>
                    <p>Total Devices: {suction?.totalCount}</p>
                  </div>
                  <div className="upper_div">
                    <div className="graph_heading">
                      <h6
                        style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}
                      >
                        Total Demo <span>{suction?.demoCount}</span>
                      </h6>
                      <h6
                        style={{ color: "rgb(112, 112, 112)", fontSize: "0.9rem" }}
                      >
                        Total Sold <span>{suction?.soldCount}</span>
                      </h6>
                    </div>
                    <span>{purposeDevices?._id}</span>
                  </div>
                  <DougnutSuction chartData={data2} className="doughnut_data" />
                </>
                : 'Loading...'}
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
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <h6>Select Time to refresh Graph </h6>
            <select className="select_details" onChange={(e) => setTimmer(e.target.value)}>
              <option>{timmer} min</option>
              <option value="1">1 min</option>
              <option value="2">2 min</option>
              <option value="5">5 min</option>
              <option value="10">10 min</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
            </select>
          </div>
        </Col>
        <Col
          xl={4}
          lg={4}
          md={6}
          sm={6}
          style={{
            marginLeft: "2rem",
            paddingTop: "3rem",
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
                  <select className="select_details"
                    onChange={(e) => statusOfDuration(e)}>
                    <option >{durationData}</option>
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="today">Today</option>
                  </select>
                </div>
              </div>
              {loading && <div style={{ position: 'relative', top: '50%', left: '50%' }}><span>Loading...</span></div>}
              {!loading && <LineChart _id='lineCharthai' chartData={data} className="lineChart_data" options={totalDevicesOption} />}
              <h6 style={{ textAlign: 'center', paddingTop: '1rem' }}>{durationData} data</h6>
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
                    onChange={(e) => activeDevicesDataClick(e)}
                  >
                    <option>{activedevices}</option>
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="today">Today</option>
                  </select>
                </div>
              </div>
              {loading2 && <div style={{ position: 'relative', top: '50%', left: '50%' }}> <span>Loading...</span></div>}
              {!loading2 && <LineChart chartData={activeData} className="lineChart_data" options={totalActiveDeviceOption} />}
              {!loading2 &&
                <h6 style={{ textAlign: 'center', paddingTop: '1rem' }}>{activedevices} data</h6>
              }
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
                    TOTAL DEMO DEVICES
                  </h6>
                  <select className="select_details"
                    onChange={(e) => totalDemoChange(e)}
                  >
                    <option>{totalDemoState}</option>
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="today">Today</option>

                  </select>
                </div>
              </div>
              {loading3 && <div style={{ position: 'relative', top: '50%', left: '50%' }}> <span>Loading...</span></div>}
              {!loading3 && <LineChart chartData={demoData} className="lineChart_data" options={totalDemoDevicesOption} />}
              <h6 style={{ textAlign: 'center', paddingTop: '1rem' }}>{totalDemoState} data</h6>
            </div>
            <div className="line_chart">
              <div className="upper_div">
                <div className="graph_heading">
                  <h6
                    style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}
                  >
                    TOTAL ACTIVE DEMO DEVICES
                  </h6>
                  <select
                    className="select_details"
                    onChange={(e) => activeDemoDevicesDataClick(e)}
                  >
                    <option value="yearly">{activeDemoDevice}</option>
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="today">Today</option>

                  </select>
                </div>
              </div>
              {loading5 && <div style={{ position: 'relative', top: '50%', left: '50%' }}> <span>Loading...</span></div>}
              {!loading5 && <LineChart
                chartData={activeDemoData}
                className="lineChart_data"
                options={totalActiveDemoDevicesOption}
              />}
              <h6 style={{ textAlign: 'center', paddingTop: '1rem' }}>{activeDemoDevice} data</h6>
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
            marginBottom: "2rem",
            paddingTop: "6rem",
            display: "flex",
            gap: "3rem",
            width: "100%",
          }}
        >
          {/* <ExcelDataRead/> */}
        </Col>
        {/* <LeafletMap/> */}
      </>
    </>
  );
};

export default AdminDashboard;
