/* eslint-disable */

import React, { useRef, useEffect, useReducer, useMemo, useState } from 'react';
import {
  faCaretDown,
  faDatabase,
  faDownload,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { CSVLink, CSVDownload } from "react-csv";
import { Container, Row, Col, Image } from 'react-bootstrap';
import Style from '../../css/events.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import DateIcons from '../../assets/icons/date.png';
import LogICon from '../../assets/icons/log.png';
import AlarmIcon from '../../assets/images/AlarmIcon.png';
import CustomeDropDown from '../../container/DropDown';
import SpinnerCustom from '../../container/SpinnerCustom';
import TableCard from '../../container/TableCard';
import TypeDropDown from '../logs/components/table/TypeDropDown';
import { eventAction } from '../../store/action/EventsAction';
import { Navbar } from '../../utils/NavBar';
import SideBar from '../../utils/Sidebar';
import { ThemeContext } from '../../utils/ThemeContext';
import { eventsDataReducer } from './store/Reducer';
import {
  ALL_ROW_SELECTED,
  DATE_DROPDOWN,
  DIFF_DATE,
  SEARCH_FIELD,
  SORT_ICONS,
} from './store/Types';
import Pagination from '../../common/Pagination';

export default function Events(){
  const {theme} = React.useContext(ThemeContext);

  const getModelCodeReducer = useSelector((state)=>state.getModelCodeReducer);
  const {data : projectType} = getModelCodeReducer;

  console.log('getModelCodeReducer',getModelCodeReducer)

  const eventReducer = useSelector((state)=>state.eventReducer);
  console.log('eventReducer',eventReducer)
  const {loading,data} = eventReducer;
  console.log('data',data)

   // USE DISPATCH
   const dispatch = useDispatch();

   const initialState = {
    tableDataState: {},
    diffDate: localStorage.getItem('diffDate') || 90,
    disableButton: false,
    dateDropDown: false,
    showTableField: false,

    record: localStorage.getItem('selected_record')
      ? JSON.parse(localStorage.getItem('selected_record'))
      : 25,

    projectCode: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeCode
      : projectType &&
        projectType.modelList[0] &&
        projectType.modelList[0].typeCode,

    searchField: '',

    /**
     * @objectKey MA: Mac Address--------------,
     * @objectKey LM: Log Message-------------,
     * @objectKey ET: Error Type--------------,
     * @objectKey DT: Date--------------------,
     * @objectKey TI: Time--------------------,
     */

    sortIcons: {
      DI: false,
      CD: false,
      LM: false,
      DA: false,
      TI: false,
    },
    singleRowSelect: false,
    allRowSelect: false,
  };
console.log('projectCode',initialState.projectCode)

const [currentStateEvents,dispatchEventsData] = useReducer(
  eventsDataReducer,
  initialState
);

const [currentPage, setCurrentPage] = useState(1);

const [isCheckAll, setIsCheckAll] = useState(false);
const [isCheck, setIsCheck] = useState([]);
const [checkedLogs, setCheckedLogs] = useState([]);

const handleSelectAll = (e) => {
  setIsCheckAll(!isCheckAll);
  setIsCheck(data?.data?.events.map((events) => events._id));
  setCheckedLogs(data?.data?.events);
  if (isCheckAll) {
    setIsCheck([]);
    setCheckedLogs([]);
  }
};
const handleClick = (e) => {
  const { id, checked, name } = e.target;
  setIsCheck([...isCheck, id]);
  setCheckedLogs([...checkedLogs, JSON.parse(name)]);
  if (!checked) {
    setIsCheck(isCheck.filter((item) => item !== id));
    setCheckedLogs(
      checkedLogs.filter((item) => {
        return item._id !== id;
      })
    );
  }
};

useMemo(() => {
  const firstPageIndex = (currentPage - 1) * currentStateEvents.record;
  const lastPageIndex = firstPageIndex + currentStateEvents.record;
  return (
    data && data.data && data.data.events.slice(firstPageIndex, lastPageIndex)
  );
}, [currentPage]);


const ref = useRef();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code');
console.log('code',code)
const projectName = urlParams.get('name');
console.log('projectName',projectName)

const DateFilter = () => {
  dispatchEventsData({
    type: DATE_DROPDOWN,
    data: !currentStateEvents.dateDropDown,
  });
};

// navigation=================================================================

const navigation_details = {
  name: projectName,
  dashName: projectName,
  link1: {
    iconName: faDatabase,
    linkName: 'Logs',
    link: `/log_table?code=${code}&name=${projectName}`,
  },
  link2: {
    iconName: faDatabase,
    linkName: 'Settings',
  },
  link3:{
      iconName:faDatabase,
      linkName:"Alarms"
    },
  link4:{
      iconName:faDatabase,
      linkName:"Events"
    },
};

const sidebar_details = {
  name: projectName,
  dashName: projectName,
  link1: {
    iconName: LogICon,
    linkName: 'Logs',
    link: `/log_table?code=${code}&name=${projectName}`,
  },
  link2: {
    iconName: AlarmIcon,
    linkName: 'Settings',
    link: `/settings?code=${code}&name=${projectName}`,
  },
  link3: {
    iconName: AlarmIcon,
    linkName: 'alarm',
    link: `/alarm?code=${code}&name=${projectName}`,
  },
  link4: {
    iconName: `/assets/images/AlarmIcon.png`,
    linkName: "Events",
    link: `/events?code=${code}&name=${projectName}`,  
  },
};

// @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
const handleSearchFunc = (event) => {
  dispatchEventsData({
    type: SEARCH_FIELD,
    data: event.target.value,
  });
};

let eventsFilter =  data && data.data && data.data.events;
console.log('eventsFilter',eventsFilter)

let search =
(currentStateEvents.searchField &&
  currentStateEvents.searchField.trim() &&
  currentStateEvents.searchField.trim().toLowerCase()) ||
'';

if (search.length > 0) {
 eventsFilter = eventsFilter.filter((item) => {
  return (
    item.did.toLowerCase().includes(search) ||
    item.message.toLowerCase().includes(search) ||
    item.createdAt.toLowerCase().includes(search)
  );
});
}
const callbackfnDispatchGetAllData = (sortType) => {
  dispatch(
    eventAction(
      code,
      localStorage.getItem('project_type') &&
        JSON.parse(localStorage.getItem('project_type')).typeCode,
      currentStateEvents.diffDate,
      currentStateEvents.page,
      currentStateEvents.record,
      sortType
    )
  );
};
const multpleDispatchSort = (type, data) => {
  return dispatchEventsData({
    type: type,
    data: data,
  });
};

  // @@ all checkbox selection function
  const allCheckBoxSelectFn = () => {
    dispatchEventsData({
      type: ALL_ROW_SELECTED,
      data: !currentStateEvents.allRowSelect,
    });
  };

  let newItemsArray = [];
  // DOWNLOAD CSV FILE FUNCTION
  const downloadCSVFun = ({ data, fileName, fileType }) => {
    var csv = ' MAC address';
    csv += '\t Code';
    csv += '\t Log Message';
    csv += '\t Date';
    csv += '\t Time';

    csv += '\n';
    for (var i = 0; i < data.length; i++) {
      csv += `${data[i].did}\t${data[i].ack.code}\t${data[i].ack.msg}\t${
        data[i].ack.date.split('T')[0]
      }\t${data[i].ack.date.split('T')[1].split('.')[0]}`;
      csv += '\n';
    }

    const blob = new Blob([csv], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

useEffect(() => {
  dispatch(
    eventAction(
      code,
      currentStateEvents.projectCode,
      currentStateEvents.diffDate
    )
  );
}, [dispatch, currentStateEvents.projectCode, currentStateEvents.diffDate]);

return (
  <div>
    <Row className="rowSection">
      <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
        <SideBar
          sidebar_details={sidebar_details}
          className={Style.SideBarColume}
        />
      </Col>
      <Col
        xl={10}
        lg={10}
        md={10}
        sm={10}
        className={`${Style.NavbarColumn} colSection`}
      >
        <Navbar navigation_details={navigation_details} />
        <Container className={Style.mainContainer}>
          <h1 className=" darkModeColor">Events Summary</h1>
          <Row className="mt-4">
            <Col xl={10} md={9} sm={9}>
              <TypeDropDown
                tableDataState={currentStateEvents.tableDataState}
                diffDate={currentStateEvents.diffDate}
                codeReducer={getModelCodeReducer}
              />
            </Col>

            {/* DATE FILTER */}
            <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
              <section className={Style.filterwithDate} ref={ref}>
                <section className={Style.datafilter} onClick={DateFilter}>
                  <Image
                    src={DateIcons}
                    width="20px"
                    style={{
                      filter:
                        'invert(45%) sepia(99%) saturate(341%) hue-rotate(135deg) brightness(91%) contrast(91%)',
                    }}
                  />
                  <p
                    style={{
                      fontSize: '.9rem',
                    }}
                    className="m-2 darkModeColor"
                  >
                    {currentStateEvents.diffDate == 10
                      ? `last 10 days`
                      : currentStateEvents.diffDate == 7
                      ? `last 7 days`
                      :currentStateEvents.diffDate == 1
                      ? `last 24 Hours`
                      : currentStateEvents.diffDate == 15
                      ? `last 15 days`
                      : currentStateEvents.diffDate == 30
                      ? `last 30 days`
                      : currentStateEvents.diffDate == 45
                      ? `last 45 days`
                      : currentStateEvents.diffDate == 60
                      ? `last 60 days`
                      : currentStateEvents.diffDate == 90
                      ? `last 90 days`
                      : null}
                  </p>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    color="#2A9AA4"
                    style={{
                      width: '10px',
                      height: '20px',
                      marginBottom: '2px',
                    }}
                  />
                </section>

                <section>
                  {currentStateEvents.dateDropDown ? (
                    <CustomeDropDown width="100%" zIndex="8">
                        <p
                        style={{ fontSize: '.8rem' }}
                        className={`${Style.productVersion} mt-1 darkModeColor `}
                        onClick={() => {
                          dispatchEventsData({
                            type: DIFF_DATE,
                            data: 1,
                          });
                          localStorage.setItem(
                            'diffDate',
                            currentStateEvents.diffDate
                          );
                          dispatchEventsData({
                            type: DATE_DROPDOWN,
                            data: false,
                          });
                        }}
                      >
                        24 Hours
                      </p>
                      <p
                        style={{ fontSize: '.8rem' }}
                        className={`${Style.productVersion} mt-1 darkModeColor `}
                        onClick={() => {
                          dispatchEventsData({
                            type: DIFF_DATE,
                            data: 7,
                          });
                          localStorage.setItem(
                            'diffDate',
                            currentStateEvents.diffDate
                          );
                          dispatchEventsData({
                            type: DATE_DROPDOWN,
                            data: false,
                          });
                        }}
                      >
                        7 days
                      </p>
                      <p
                        style={{ fontSize: '.8rem' }}
                        className={`${Style.productVersion} mt-1 darkModeColor`}
                        onClick={() => {
                          dispatchEventsData({
                            type: DIFF_DATE,
                            data: 15,
                          });
                          localStorage.setItem(
                            'diffDate',
                            currentStateEvents.diffDate
                          );
                          dispatchEventsData({
                            type: DATE_DROPDOWN,
                            data: false,
                          });
                        }}
                      >
                        15 days
                      </p>

                      <p
                        style={{ fontSize: '.8rem' }}
                        className={`${Style.productVersion} mt-1 darkModeColor`}
                        onClick={() => {
                          dispatchEventsData({
                            type: DIFF_DATE,
                            data: 30,
                          });
                          localStorage.setItem(
                            'diffDate',
                            currentStateEvents.diffDate
                          );
                          dispatchEventsData({
                            type: DATE_DROPDOWN,
                            data: false,
                          });
                        }}
                      >
                        30 days
                      </p>
                      <p
                        style={{ fontSize: '.8rem' }}
                        className={`${Style.productVersion} mt-1 darkModeColor`}
                        onClick={() => {
                          dispatchEventsData({
                            type: DIFF_DATE,
                            data: 45,
                          });
                          localStorage.setItem(
                            'diffDate',
                            currentStateEvents.diffDate
                          );
                          dispatchEventsData({
                            type: DATE_DROPDOWN,
                            data: false,
                          });
                        }}
                      >
                        45 days
                      </p>
                      <p
                        style={{ fontSize: '.8rem' }}
                        className={`${Style.productVersion} mt-1 darkModeColor`}
                        onClick={() => {
                          dispatchEventsData({
                            type: DIFF_DATE,
                            data: 60,
                          });
                          localStorage.setItem(
                            'diffDate',
                            currentStateEvents.diffDate
                          );
                          dispatchEventsData({
                            type: DATE_DROPDOWN,
                            data: false,
                          });
                        }}
                      >
                        60 days
                      </p>
                      <p
                        style={{ fontSize: '.8rem' }}
                        className={`${Style.productVersion} mt-1 darkModeColor`}
                        onClick={() => {
                          dispatchEventsData({
                            type: DIFF_DATE,
                            data: 90,
                          });
                          localStorage.setItem(
                            'diffDate',
                            currentStateEvents.diffDate
                          );
                          dispatchEventsData({
                            type: DATE_DROPDOWN,
                            data: false,
                          });
                        }}
                      >
                        90 days
                      </p>
                    </CustomeDropDown>
                  ) : null}
                </section>
              </section>
            </Col>
          </Row>
          {/* Events  */}
          <Row className="mt-4">
            <Col>
              <TableCard borderRadius="10px">
                {data && data.data && data.data.events.length > 0 && (
                  <>
                    <section className={`${Style.OuterTable} `}>
                      <section className={Style.searchSection}>
                        <input
                          type="text"
                          placeholder="Search..."
                          value={currentStateEvents.searchField}
                          onChange={handleSearchFunc}
                        />
                        <section
                          id="download_button"
                          disabled={checkedLogs?.length ? null : 'disabled'}
                          style={{
                            border: 'none',
                            opacity: checkedLogs?.length ? '100%' : '40%',
                          }}
                          onClick={() =>
                            downloadCSVFun({
                              data: checkedLogs,
                              fileName: `${code}-${
                                new Date().getDay() +
                                '-' +
                                new Date().getMonth() +
                                '-' +
                                new Date().getFullYear()
                              }.csv`,
                              fileType: 'text/csv;charset=utf-8;',
                            })
                          }
                        >
                          <section className={Style.filterGraphFirstSection}>
                            <FontAwesomeIcon
                              color="#CB297B"
                              style={{ cursor: 'pointer' }}
                              icon={faDownload}
                            />
                          </section>
                        </section>
                      </section>

                      {/* TABLE HERE */}
                      <section className={Style.alertTable}> 
                        <section className={Style.tableHeader}>
                          <section
                            style={{
                              color: theme == 'light-theme' ? '#000' : '#fff',
                            }}
                          >
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={isCheckAll}
                              id="selectAll"
                            />
                          </section>
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Device Id
                            </p>
                            {/* <FontAwesomeIcon
                              color="#CB297B"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateEvents.sortIcons.DI
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchEventsData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateEvents.sortIcons,
                                    DI: !currentStateEvents.sortIcons.DI,
                                  },
                                });
                                sortTableFnDI(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Message
                            </p>

                            {/* <FontAwesomeIcon
                              color="#CB297B"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateEvents.sortIcons.CD
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchEventsData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateEvents.sortIcons,
                                    CD: !currentStateEvents.sortIcons.CD,
                                  },
                                });
                                sortTableFnCD(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Date
                            </p>

                            {/* <FontAwesomeIcon
                              color="#CB297B"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateEvents.sortIcons.LM
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchEventsData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateEvents.sortIcons,
                                    LM: !currentStateEvents.sortIcons.LM,
                                  },
                                });
                                sortTableFnLM(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Time
                            </p>
                            {/* <FontAwesomeIcon
                              color="#CB297B"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateEvents.sortIcons.DT
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchEventsData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateEvents.sortIcons,
                                    DT: !currentStateEvents.sortIcons.DT,
                                  },
                                });
                                sortTableFnDT(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>
                          {/* <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Time
                            </p>
                            <FontAwesomeIcon
                              color="#CB297B"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateEvents.sortIcons.TI
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchEventsData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateEvents.sortIcons,
                                    TI: !currentStateEvents.sortIcons.TI,
                                  },
                                });
                                sortTableFnDT(callbackfnDispatchGetAllData);
                              }}
                            />
                          </section> */}
                        </section>
                        {eventsFilter.map((item, index) => {
                          return (
                            <React.Fragment key={item._id}>
                              <section className={Style.tableBody}>
                                <section>
                                  <input
                                    type="checkbox"
                                    id={item._id}
                                    name={JSON.stringify(item)}
                                    onChange={handleClick}
                                    checked={isCheck.includes(item._id)}
                                  />
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item.did}
                                  {console.log(item.did)}
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item.message}
                                  {console.log(item.message)}
                                </section>
                                {/* <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item.ack.msg || `N/A`}
                                </section> */}
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item.date.split('T')[0]}
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item.date.split('T')[1].split('.')[0]}
                                </section>
                              </section>
                            </React.Fragment>
                          );
                        })}
                      </section>
                    </section>
                    <section className="p-2">
                      <Pagination
                        code={code}
                        projectType={currentStateEvents.projectCode}
                        diffdate={currentStateEvents.diffDate}
                        currentPage={currentPage}
                        totalCount={data?.data?.count ? data?.data?.count : 0}
                        pageSize={currentStateEvents.record}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </section>
                  </>
                )}

                {data && data.data && data.data.events.length <= 0 && (
                  <section className={Style.noDataFound}>
                    <p
                      style={{
                        color: theme == 'light-theme' ? `#000` : `#fff`,
                      }}
                    >
                      No Data Found
                    </p>
                  </section>
                )}

                {loading && <SpinnerCustom />}
              </TableCard>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  </div>
);
}
