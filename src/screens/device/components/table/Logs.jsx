import React, { useEffect, useState } from 'react';
import back from "../../../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import Style from '../../../../css/deviceLogs.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceLogsById } from '../../../../store/action/DeviceAction';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
export default function Logs() {
  const { theme } = React.useContext(ThemeContext);
  const getAllLogsByDeviceIdReducer = useSelector((state) => state.getAllLogsByDeviceIdReducer)
  const { loading, data ,error} = getAllLogsByDeviceIdReducer;
  let logsFilter = data && data.data && data.data.findDeviceById;
console.log('error',error)
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('name');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDeviceLogsById({ page: 1, limit: recordsPerPage })
    )
  }, ([]))
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = logsFilter && logsFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  return (
    <>
      
        <>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '0px 0px 2rem 2rem' }}>
            <form class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Device ID
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Log Message
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Version
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Date
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Time
                  </td>
                </tr>
              </thead>
              <tbody>
                {records?.length>0?
                records && records.map((item, index) => {
                  return (
                    <tr class="bg-white border-b hover:bg-gray-50">
                      <td class="px-6 py-4 text-center font-semibold text-gray-900">
                        {item.deviceId ? item.deviceId : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        <ReactReadMoreReadLess
                          charLimit={100}
                          readMoreText={"Read more ▼"}
                          readLessText={"Read less ▲"}
                        >
                          {item.message}
                        </ReactReadMoreReadLess>
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.version ? item.version : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.date ? item.date : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.time ? item.time : '---'}
                      </td>
                    </tr>
                  )
                }) :
                <div
                            style={{
                              height: "500px",
                              backgroundColor: "white",
                              width: "100%",
                              borderRadius: "20px",
                              background: "#FFFFFF 0% 0% no-repeat padding-box",
                            }}
                          >
                            {loading && (
                              <span
                                style={{ position: "absolute", top: "50%", right: "50%" }}
                              >
                                {" "}
                                <div role="status">
                                  <svg
                                    aria-hidden="true"
                                    class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentFill"
                                    />
                                  </svg>
                                </div>
                              </span>
                            )}
                            {error && (
                              <div
                                style={{
                                  width: "100%",
                                  position: 'absolute',
                                  top: '50%',
                                  textAlign: 'center'
                                }}
                              >
                                <h6>{error}</h6>
                              </div>
                            )}
                          </div>
                }
              </tbody>
            </table>
            </form>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
              {incPage > 1 ?
                <button onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                  <img src={back} style={{ width: "3rem" }} />
                </button>
                : " "}
              {numbers.map((n, i) => (
                <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
              ))}
              {incPage !== totalPage ?
                <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                  <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                </button>
                : " "}
            </ul>
          </nav>
        </>
    </>
  )
  function prePage() {
    dispatch(getDeviceLogsById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getDeviceLogsById({ page: incPage + 1, limit: recordsPerPage }))
  }
}