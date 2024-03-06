import React, { useEffect } from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DeviceDispatchModule.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import back from "../../../assets/images/back.png";
import TableCard1 from "../../../container/TableCard1";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai";

import { getCompleteDispatchedDataAction } from '../../../store/action/DispatchDetailsAction';
import { useState } from 'react';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarForAll from '../../../utils/NavBarForAll';
function DispatchDataModule() {
  const [openModal, setOpenModal] = useState(false);
  const [returnDevice, setReturnDevice] = useState(false);

  const getCompleteDispatchedReducer = useSelector((state) => state.getCompleteDispatchedReducer);
  const { loading, data } = getCompleteDispatchedReducer;
  const getDispatchData = data && data.data
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getCompleteDispatchedDataAction({ page: 1, limit: recordsPerPage })
    )
  }, ([]))
  const history = useNavigate();

  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  console.log("incPage", incPage)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = getDispatchData && getDispatchData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  console.log("getDispatchData", getDispatchData)
  const navigate = useNavigate()


  const [query, setQuery] = useState("");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const handleClickSearch = () => {
    if (query && query.length > 0) {
      dispatch(getCompleteDispatchedDataAction({ page: 1, limit: recordsPerPage, searchData: query }));
    }
    else {

    }
  }


  const handleSearchChange = (e) => {
    setQuery(e.target.value.toLowerCase())
  }

  const [navDeviceId, setNavDeviceId] = useState();
  const [navSerialNo, setNavSerialNo] = useState();
  const [navProduct, setNavProduct] = useState();
  return (
    <div>
      {/* <NavBarForAll /> */}
      <Row className="rowSection">
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={Style.NavbarColumn}
          style={{ width: "100%" }}
        >
          <div
            className={Style.mainDiv}
          >
            {/* Heading Section */}
            <div
              className={Style.topHeading}
            >
            </div>
            {/* Events  */}
            {records && records.length > 0 ?
              <>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                  <div
                    className="search_section"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="input_section"
                      style={{
                        display: "flex",
                        backgroundColor: "rgb(203, 41, 123)",
                        width: "100%",
                        padding: '1rem',
                        alignItems: "center",
                      }}
                    >
                      <input
                        className="search_input"
                        type="text"
                        placeholder="Enter Device ID"
                        onChange={handleSearchChange}
                        style={{
                          padding: "0.7rem",
                          border: "0px",
                          width: "100%",
                        }}
                      />
                      <button className={Style.searchBtn} onClick={handleClickSearch}>
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{
                            color: "#ffff",
                            padding: "0px 8px",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Serial No.
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Device ID
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Product Type
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Hospital Name
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Batch No.
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          PO Number
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Purpose
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Action
                        </td>

                      </tr>
                    </thead>
                    <tbody>
                      {records && records.map((item1, index) => {
                        return (
                          <tr class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4 text-center  font-semibold text-gray-900">
                              {item1.serialNumber ? item1.serialNumber : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-center">
                              {item1.deviceId ? item1.deviceId : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              {item1.productType ? item1.productType : 'NA'}
                            </td>

                            <td class="px-6 py-4 text-center ">
                              {item1.hospitalName ? item1.hospitalName : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              {item1.batchNumber ? item1.batchNumber : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              {item1.document_no ? item1.document_no : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              {item1.purpose ? item1.purpose : 'NA'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              <button onClick={() => {
                                setNavDeviceId(item1.deviceId)
                                setNavSerialNo(item1.serialNumber)
                                setNavProduct(item1.productType)
                                setReturnDevice(item1.return)
                                setOpenModal(true)
                              }} style={{ textDecoration: 'none', backgroundColor: 'rgb(203, 41, 123)', color: 'white', padding: '10px', width: '5vw', borderRadius: '5px' }}>
                                View
                              </button>
                            </td>

                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <Modal show={openModal} size="xl" popup>
                  <Modal.Header style={{ display: 'flex', justifyContent: 'end' }}>
                    <button style={{ height: '1rem' }}
                      onClick={() => setOpenModal(false)}
                    >
                      <AiOutlineClose />
                    </button>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="text-center">
                      <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                        Please select an option to view data.
                      </h3>
                      <div className="flex justify-center gap-4">
                        <button onClick={() => { navigate(`/dispatchModel?serialNo=${navSerialNo}`) }} style={{ textDecoration: 'none', backgroundColor: 'rgb(203, 41, 123)', color: 'white', padding: '10px', borderRadius: '8px' }}>
                          View all data
                        </button>
                        <button onClick={() => { navigate(`/singleDispatchDataModule?deviceId=${navDeviceId}`) }} style={{ backgroundColor: 'white', border: '0.5px solid gray', color: 'black', padding: '10px', borderRadius: '8px' }}>
                          Track device histroy
                        </button>
                        <button onClick={() => { navigate(`/returnFormModule?deviceId=${navDeviceId}&serialNo=${navSerialNo}&product=${navProduct}`) }} style={{ backgroundColor: 'white', border: '0.5px solid gray', color: 'black', padding: '10px', borderRadius: '8px' }}>
                          Return device
                        </button>
                        {returnDevice==='true'?
                        <button onClick={() => { navigate(`/previousHistoryData?deviceId=${navDeviceId}`) }} style={{ backgroundColor: 'white', border: '0.5px solid gray', color: 'black', padding: '10px', borderRadius: '8px' }}>
                          Previous History
                        </button>
                        :''}
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
                    {incPage > 1 ?
                      <Link onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                        <img src={back} style={{ width: "3rem" }} />
                      </Link>
                      : " "}
                    {incPage !== totalPage ?
                      <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                        <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                      </button>
                      : " "}
                  </ul>
                </nav>
              </>
              :
              <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
                {records && records.length == 0 && (
                  <section className={Style.noDataFound}>
                    <span>
                      No Data Found
                    </span>
                  </section>
                )}
                {loading && <span style={{ position: 'absolute', top: '50%', right: '50%' }}>Loading...</span>}
              </div>
            }
          </div>
        </Col>
      </Row>
    </div>
  )
  function prePage() {
    dispatch(getCompleteDispatchedDataAction({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getCompleteDispatchedDataAction({ page: incPage + 1, limit: recordsPerPage }))
  }
}

export default DispatchDataModule