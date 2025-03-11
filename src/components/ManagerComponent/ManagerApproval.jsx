import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompoffLeaveRequestAction,
  getLeaveApproveRequestAction,
  getUserDataAction,
  putApprovedLeaveByManagerAction,
  putCompOffLeaveRequestAction,
  putRevertLeaveByManagerAction,
} from "../../store/action/userDataAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const ManagerApproval = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.managerLeaveApprove);
  const { data: compOff } = useSelector((state) => state.compoffApprove);
  const leaveReqData = data?.data || [];
  const compOffData = compOff?.data || [];
  const [activeTab, setActiveTab] = useState("leave"); // New state for tab switching
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of rows per page

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentRejectItem, setCurrentRejectItem] = useState(null);

  // Get the current paginated data
  const currentData = activeTab === "leave"
    ? leaveReqData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : activeTab === "revert" ? leaveReqData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : compOffData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Total Pages Calculation
  const totalPages = Math.ceil((activeTab === "leave" ? leaveReqData.length : compOffData.length) / itemsPerPage);

  // Pagination Handlers
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(getLeaveApproveRequestAction());
    dispatch(getCompoffLeaveRequestAction());
    dispatch(getUserDataAction());
  }, [dispatch]);

  const handleRejectClick = (item) => {
    setCurrentRejectItem(item);
    setIsModalOpen(true);
  };

  const handleSubmitRejection = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }
    dispatch(
      putApprovedLeaveByManagerAction({
        status: "Rejected",
        id: currentRejectItem?._id,
        remarks: rejectionReason,
      })
    );
    setRejectionReason("");
    setIsModalOpen(false);
  };

  const handleAction = (status, id, isCompOff = false) => {
    const action = isCompOff ? putCompOffLeaveRequestAction : putApprovedLeaveByManagerAction;
    dispatch(action({ status, id }));
  };

  const SkeletonLoader = () => (
    <tr className="animate-pulse">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <td key={index} className="p-5">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </td>
        ))}
    </tr>
  );

  const renderTableRows = (data, isCompOff = false) =>
    data.map((item, index) => (
      <tr key={index} className="border-t">
        <td className="p-5 text-center">{item?.employeeInfo?.employeeName}</td>
        <td className="p-5 text-center">
          {item?.dateTime?.split(" ")[0] || item?.appliedDate?.split(" ")[0]}
        </td>
        {!isCompOff && (
          <>
            <td className="p-5 text-center">{item?.leaveStartDate}</td>
            <td className="p-5 text-center">{item?.leaveEndDate}</td>
          </>
        )}
        {activeTab === "leave" ?
          <td className="p-5 text-center">{item?.leaveType?.toUpperCase().split("LEAVE")[0]} LEAVE</td>
          : ''}
        <td className="p-5 text-center" style={{ width: "20rem" }}>
          {item?.reason}
        </td>
        <td className="p-5 text-center">{item?.totalDays}</td>
        {activeTab === "leave" ?
          <td className="p-5 text-center">
            {item?.location ? (
              <Link className="py-2 px-3 bg-blue-500 text-white rounded" to={item?.location}>
                View
              </Link>
            ) : (
              "---"
            )}
          </td>
          : ''}
        <td className="p-5 text-center flex gap-4 justify-center">
          {item?.status === "Pending" ? (
            <>
              <button
                onClick={() => handleAction("Approved", item?._id, isCompOff)}
                className="px-5 py-3 bg-green-100 text-green-600 rounded hover:bg-green-500 hover:text-white"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  // console.log('isCompOff',isCompOff)
                  isCompOff === true ? handleAction("Rejected", item?._id, true) : handleRejectClick(item)
                }
                }
                className="px-5 py-3 bg-red-100 text-red-600 rounded hover:bg-red-500 hover:text-white"
              >
                Reject
              </button>
            </>
          ) : (
            item?.status
          )}
        </td>
      </tr>
    ));
  const renderRevertTableRow = (data, isCompOff = false) =>
    data?.map((item, index) => (
      <tr key={index} className="border-t">
        <td className="p-5 text-center">{item?.employeeInfo?.employeeName}</td>
        <td className="p-5 text-center">
          {item?.revertLeave?.revertedDays || "--"}
        </td>
        <td className="p-5 text-center">
          {item?.revertLeave?.requestedDateTime || "--"}
        </td>
        <td className="p-5 text-center">
          {item?.revertLeave?.approvedDateTime || "--"}
        </td>
        <td className="p-5 text-center flex gap-4 justify-center">
          {item?.revertLeave?.status === "Pending" ? (
            <>
              <button
                onClick={() => dispatch(putRevertLeaveByManagerAction({ status: "Approved", id: item?._id }))}
                className="px-5 py-3 bg-green-100 text-green-600 rounded hover:bg-green-500 hover:text-white"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  dispatch(putRevertLeaveByManagerAction({ status: "Rejected", id: item?._id }))
                }
                }
                className="px-5 py-3 bg-red-100 text-red-600 rounded hover:bg-red-500 hover:text-white"
              >
                Reject
              </button>
            </>
          ) : (
            item?.revertLeave?.status
          )}
        </td>
      </tr>
    ));
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <ToastContainer />

        {/* Tabs */}
        <div className="p-6 flex gap-2">
          <button
            className={`p-5 rounded text-white ${activeTab === "leave" ? "bg-blue-500" : "bg-white text-blue-300 shadow"
              }`}
            style={activeTab === "leave" ? { color: 'white' } : { color: 'black' }}
            onClick={() => setActiveTab("leave")}
          >
            Leave Approvals
          </button>
          <button
            className={`p-3 rounded text-white ${activeTab === "compoff" ? "bg-blue-500" : "bg-white text-blue-300 shadow"
              }`}
            style={activeTab === "compoff" ? { color: 'white' } : { color: 'black' }}
            onClick={() => setActiveTab("compoff")}
          >
            Comp-Off Approvals
          </button>
          <button
            className={`p-3 rounded text-white ${activeTab === "revert" ? "bg-blue-500" : "bg-white text-blue-300 shadow"
              }`}
            style={activeTab === "revert" ? { color: 'white' } : { color: 'black' }}
            onClick={() => setActiveTab("revert")}
          >
            Revert Approvals
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "leave" ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Leave Approvals</h2>
              <div className="overflow-auto bg-white rounded-lg shadow-md">
                <table className="table-auto w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 font-semibold text-center">Employee Name</th>
                      <th className="p-3 font-semibold text-center">Request Date</th>
                      <th className="p-3 font-semibold text-center">Start Date</th>
                      <th className="p-3 font-semibold text-center">End Date</th>
                      <th className="p-3 font-semibold text-center">Leave Type</th>
                      <th className="p-3 font-semibold text-center">Reason</th>
                      <th className="p-3 font-semibold text-center">Total Days</th>
                      <th className="p-3 font-semibold text-center">Doc</th>
                      <th className="p-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>{loading ? <SkeletonLoader /> : renderTableRows(leaveReqData)}</tbody>
                </table>
              </div>
            </>
          ) : activeTab === "revert" ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Revert Approvals</h2>
              <div className="overflow-auto bg-white rounded-lg shadow-md">
                <table className="table-auto w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 font-semibold text-center">Employee Name</th>
                      <th className="p-3 font-semibold text-center">Request Date</th>
                      <th className="p-3 font-semibold text-center">Reason</th>
                      <th className="p-3 font-semibold text-center">Total Days</th>
                      <th className="p-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>{loading ? <SkeletonLoader /> : renderRevertTableRow(currentData, leaveReqData, true)}</tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-4">
                  <button
                    className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="font-semibold">Page {currentPage} of {totalPages}</span>
                  <button
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) :
            (<>
              <h2 className="text-2xl font-bold mb-4">Comp-Off Approvals</h2>
              <div className="overflow-auto bg-white rounded-lg shadow-md">
                <table className="table-auto w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 font-semibold text-center">Employee Name</th>
                      <th className="p-3 font-semibold text-center">Request Date</th>
                      <th className="p-3 font-semibold text-center">Reason</th>
                      <th className="p-3 font-semibold text-center">Total Days</th>
                      <th className="p-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>{loading ? <SkeletonLoader /> : renderTableRows(currentData, compOffData, true)}</tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-4">
                  <button
                    className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="font-semibold">Page {currentPage} of {totalPages}</span>
                  <button
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>)
          }
        </div>
        {
          isModalOpen ?
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Modal Content */}
              <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative z-10 p-6">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-10 right-4 text-gray-400 hover:text-gray-600"
                >
                  <RxCross2 size={20} />
                </button>

                {/* Modal Header */}
                <h2 className="text-xl font-semibold text-gray-800">
                  Reason for leave rejection
                </h2>
                <div className="flex flex-col gap-4 mt-4">
                  <textarea type="text"
                    id="startDate"
                    name="startDate"
                    placeholder="Reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button
                    onClick={handleSubmitRejection}
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  >Reject Leave</button>
                </div>
              </div>
            </div>
            : ''
        }
      </div >
    </>
  );
};

export default ManagerApproval;
