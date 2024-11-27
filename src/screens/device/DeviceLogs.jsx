import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Style from '../../css/device.module.css';
import { useDispatch, useSelector } from 'react-redux';
import TableCard1 from '../../container/TableCard1';
import Events from './components/table/Events';
import Logs from './components/table/Logs';
import Alarms from './components/table/Alarms';
import Trends from './components/table/Trends';
import back from "../../assets/images/back.png"
import { Link } from 'react-router-dom';
import Calibration from "../device/components/table/Calibration"
import 'rsuite/DateRangePicker/styles/index.css';
import DatePicker from "react-multi-date-picker";
import { CiCalendarDate } from "react-icons/ci";
import { getDeviceAlarmsById, getDeviceEventsById, getDeviceTrendsById } from '../../store/action/DeviceAction';
import DeveloperOptionData from './components/table/DeveloperOptionData';
export default function DeviceLogs() {
  const getAllSectionByDeviceId = useSelector((state) => state.getAllSectionByDeviceId);
  const { data } = getAllSectionByDeviceId;
  const deviceLogsData = data && data.data

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType

  const [eventsbtn, setEventsbtn] = useState("btn text-black")
  const [developerbtn, setDeveloperbtn] = useState()

  const [alarmsbtn, setAlarmsbtn] = useState()
  const [logsbtn, setLogsbtn] = useState()
  const [trendsbtn, setTrendsbtn] = useState()
  const [calibrationbtn, setCaliberationbtn] = useState()
  const [activeTab, setActiveTab] = useState(0);

  const dispatch = useDispatch();

  // Define minDate and maxDate
  const maxDate = new Date(); // Example: today; adjust as needed
  maxDate.setDate(maxDate.getDate() + 30); // Example: 30 days from today
  const [dateRange, setDateRange] = useState([null, null]);
  // Update handleChange to properly handle date range selection and formatting
  const handleChange = (range) => {
    if (range && range.length === 2) {
      const [start, end] = range;

      // Format the dates in the desired format for display and API usage
      const startDateFormatted = start ? start.format("YYYY-MM-DD") : null;
      const endDateFormatted = end ? end.format("YYYY-MM-DD") : null;

      // Log the formatted dates (optional for debugging)
      console.log("Formatted Start Date:", startDateFormatted);
      console.log("Formatted End Date:", endDateFormatted);

      if (activeTab === 0) {
        dispatch(getDeviceEventsById({ page: 1, limit: 8, startDate: startDateFormatted, endDate: endDateFormatted }));
      } else if (activeTab === 1) {
        dispatch(getDeviceAlarmsById({ page: 1, limit: 8, startDate: startDateFormatted, endDate: endDateFormatted }));
      }
      else if (activeTab === 3) {
        dispatch(getDeviceTrendsById({ page: 1, limit: 8, startDate: startDateFormatted, endDate: endDateFormatted }))
      }
      setDateRange(range); // Update the date range in state
    }
  };

  const handelSearch = (e) => {
    // if (e.target.value.length > 0)
    //   return setSerachData(e.target.value)
    // else {
    //   setSerachData("")
    // }
    if (e.target.value.length > 0) {
      if (activeTab === 0) {
        dispatch(getDeviceEventsById({ page: 1, limit: 8, startDate: '', endDate: '', search: e.target.value }));
      } else if (activeTab === 1) {
        dispatch(getDeviceAlarmsById({ page: 1, limit: 8, startDate: '', endDate: '', search: e.target.value }));
      }
    }
  }

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex === 0) {
      setEventsbtn("btn text-black")
    }
    else {
      setEventsbtn("btn-light")
    }
    if (tabIndex === 1) {
      setAlarmsbtn('btn text-black')
    }
    else {
      setAlarmsbtn('btn-light')
    }
    if (tabIndex === 2) {
      setLogsbtn('btn text-black')
    }
    else {
      setLogsbtn('btn-light')
    }
    if (tabIndex === 3) {
      setTrendsbtn('btn text-black')
    }
    else {
      setTrendsbtn('btn-light')
    }
    if (tabIndex === 4) {
      setCaliberationbtn('btn text-black')
    }
    else {
      setCaliberationbtn('btn-light')
    }
    if (tabIndex === 5) {
      setDeveloperbtn('btn text-black')
    }
    else {
      setDeveloperbtn('btn-light')
    }
  };

  const goBack = () => {
    window.history.go(-1)
  }
  return (
    <div className={Style.rotate}>
      <Row className='rowSection'>
        <Col xl={2} lg={2} md={2} sm={2} className='noSidebar colSection'>
        </Col>
        <div
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <div className='d-flex rohan' style={{ justifyContent: "center" }}>
            <div className={Style.container}>
              <div className='d-flex' style={{ gap: "10px" }}>
                <div class="d-flex" style={{ width: "4rem" }}>
                  <div class="card-header" style={{ display: "flex", alignItems: "center" }}>
                    <Link onClick={goBack}>
                      <img src={back} style={{ width: "3rem" }} />
                    </Link>
                  </div>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header">
                    Status
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.message}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{ fontSize: '0.9rem' }}>
                    Alias Name
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Alias_Name ? deviceLogsData.Alias_Name : '- - -'}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{ fontSize: '0.9rem' }}>
                    Department
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Department_Name}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{ fontSize: '0.9rem' }}>
                    Hospital Name
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Hospital_Name}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{ fontSize: '0.9rem' }}>
                    Doctor
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Doctor_Name}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{ fontSize: '0.9rem' }}>
                    Ward Number
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Ward_No}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header">
                    Bio-Med
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Bio_Med}
                  </span>
                </div>
              </div>
              <Row className='mt-3'>
                <div class={Style.overflowdiv}>
                  <TableCard1 borderRadius="20px 20px 20px 20px">
                    <>
                      <div className={`${Style.Tabs} `}>
                        <div>
                          <button className={eventsbtn} onClick={() => handleTabClick(0)} style={{ width: "6rem", border: 'none', padding: "10px", color: "#fff", fontSize: '0.9rem' }} defaultChecked>Events</button>
                          <button className={alarmsbtn} onClick={() => handleTabClick(1)} style={{ width: "6rem", padding: "10px", border: 'none', color: "#fff", fontSize: '0.9rem' }}>Alarms</button>
                          {adminProfile == 'Super-Admin' ?
                            <button className={logsbtn} onClick={() => handleTabClick(2)} style={{ width: "7rem", padding: "10px", border: 'none', color: "#fff", fontSize: '0.9rem' }}>Crash Logs</button>
                            : ''}
                          <button className={trendsbtn} onClick={() => handleTabClick(3)} style={{ width: "6rem", padding: "10px", border: 'none', color: "#fff", fontSize: '0.9rem' }}>Trends</button>
                          <button className={calibrationbtn} onClick={() => handleTabClick(4)} style={{ width: "7rem", padding: "10px", border: 'none', color: "#fff", fontSize: '0.9rem' }}>Calibration</button>
                          <button className={developerbtn} onClick={() => handleTabClick(5)} style={{ width: "6rem", border: 'none', padding: "10px", color: "#fff", fontSize: '0.9rem' }} defaultChecked>Developers</button>
                          {/* {adminProfile == 'Super-Admin' || adminProfile == 'Nurse' ?
                            <button className={patientDetailsbtn} onClick={() => handleTabClick(5)} style={{ width: "10rem", padding: "6px", border: 'none', color: "#fff",fontSize:'0.9rem' }}>Patient Details</button>
                            : ''} */}
                        </div>
                        {activeTab == 0 || activeTab == 1 || activeTab === 3 ? <>
                          <input type="text" placeholder='Search...' onChange={handelSearch} style={{ padding: '10px', width: '30%' }} />
                          <div style={{ padding: '8px', width: '250px', height: '40px', display: 'flex', justifyContent: 'space-between', backgroundColor: "#fff", borderRadius: "8px" }}>
                            <DatePicker startDate={dateRange} placeholder='Select Date Range' format="DD-MM-YYYY" range onChange={handleChange} style={{ backgroundColor: "#ffff", borderRadius: "8px", border: '0px', width: '200px' }}// Adds the custom icon
                            />
                            {activeTab === 3 ?
                              <CiCalendarDate size={25} />
                              : ''}
                          </div>
                          {/* <DateRangePicker
                            startDate={startValue}
                            minDays={3}
                            maxDays={5}
                            onChange={handleChange}
                            format={"dd-MMM-yyyy"}
                          /> */}
                        </>
                          : ""}
                      </div>
                      <section className={`${Style.tableHeader}`}>
                        {activeTab === 0 && <Events />}
                        {activeTab === 1 && < Alarms />}
                        {activeTab === 2 && <Logs />}
                        {activeTab === 3 && <Trends />}
                        {activeTab === 4 && <Calibration />}
                        {adminProfile == 'Super-Admin' ?
                          activeTab === 5 && <DeveloperOptionData /> : ""}
                        {/* {activeTab === 5 && <PatientDetailsData />} */}
                      </section>
                    </>
                  </TableCard1>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </Row>
    </div>
  )
}