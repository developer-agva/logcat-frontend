import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deviceAssignAction,
  deviceRemoveFromHospitalAction,
  getAllUsersDetalisById,
  getHospitalByAssociationAction,
} from "../../../store/action/AdminDashboard";
import { Modal } from "flowbite-react";
import { Toaster, toast } from "react-hot-toast";
function AssignHospitalToAssisnant() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalRemove, setOpenModalRemove] = useState(false);

  const getHospitalListByAssistantReducer = useSelector(
    (state) => state.getHospitalListByAssistantReducer
  );
  const { data, loading } = getHospitalListByAssistantReducer;
  const registerUsers = data && data.data;
  console.log("registerUsers", registerUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHospitalByAssociationAction());
  }, []);
  const [hospitalData, setHospitalData] = useState();
  const [selectId, setSelectId] = useState([]);
  const handleChange = (e) => {
    const { value, checked } = e.target;
    console.log("value", value);
    setSelectId(value);
  };

  const handleSubmit = () => {
    if (selectId?.length < 0) {
      toast.error("Select Assistant ");
    } else {
      dispatch(
        deviceAssignAction({
          assistantId: selectId,
          hospitalName: hospitalData,
        })
      );
    }
  };

  const handleSubmitRemove = () => {
    console.log("selectId", selectId);

    if (selectId?.length < 0) {
      toast.error("Select Assistant ");
    } else {
      dispatch(
        deviceRemoveFromHospitalAction({
          assistantId: selectId,
          hospitalName: hospitalData,
        })
      );
    }
  };

  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { data: dataa } = allUsersDetailsReducer;
  console.log("data", dataa);

  useEffect(() => {
    dispatch(getAllUsersDetalisById());
  }, []);
  return (
    <>
      <div>
        <Toaster />
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        ></div>
        <div>
          <div
            class="relative overflow-x-auto shadow-md sm:rounded-lg"
            style={{ borderRadius: "1.5rem" }}
          >
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "#cb297b" }}
                  >
                    Hospital Name
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "#cb297b" }}
                  >
                    City
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "#cb297b" }}
                  >
                    State
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "#cb297b" }}
                  >
                    Address
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "#cb297b" }}
                  >
                    Pin Code
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "#cb297b" }}
                  >
                    Action
                  </td>
                  <td
                    scope="col"
                    class="px-6 py-3 text-center text-white text-4xl font-semibold"
                    style={{ backgroundColor: "#cb297b" }}
                  >
                    Remove
                  </td>
                </tr>
              </thead>
              <tbody>
                {registerUsers && registerUsers.length > 0 ? (
                  registerUsers &&
                  registerUsers.map((item, index) => {
                    return (
                      <tr class="bg-white border-b hover:bg-gray-50">
                        <td class="px-6 py-4 text-center font-semibold text-gray-900">
                          {item.Hospital_Name ? item.Hospital_Name : "NA"}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.City ? item.City : "NA"}
                        </td>
                        <td class="px-6 py-4 text-center ">{item.State}</td>
                        <td class="px-6 py-4 text-center ">
                          {item.Hospital_Address}
                        </td>
                        <td class="px-6 py-4 text-center ">{item.Pincode}</td>
                        <td
                          class="px-6 py-4 text-center flex"
                          style={{ justifyContent: "center", gap: "1rem" }}
                        >
                          <button
                            onClick={() => {
                              setHospitalData(item.Hospital_Name);
                              setOpenModal(true);
                            }}
                            style={{
                              backgroundColor: "rgb(203, 41, 123)",
                              color: "white",
                              padding: "10px",
                              borderRadius: "5px",
                            }}
                          >
                            Assign Assistant
                          </button>
                        </td>
                        <td class="px-6 py-4 text-center ">
                          <button
                            onClick={() => {
                              setHospitalData(item.Hospital_Name);
                              setOpenModalRemove(true);
                            }}
                            style={{
                              backgroundColor: "rgb(203, 41, 123)",
                              color: "white",
                              padding: "10px",
                              borderRadius: "5px",
                            }}
                          >
                            Remove Assistant
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div
                    style={{
                      height: "30vh",
                      position: "relative",
                      left: "32rem",
                      top: "6rem",
                    }}
                  >
                    <span>No Request Pending</span>
                  </div>
                )}
              </tbody>
            </table>
            {/* for assign assistant modal */}
            <Modal
              show={openModal}
              size="sxl"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                    Assign Hospital to assistant
                  </h3>
                  <div
                    style={{
                      padding: "1rem",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {dataa?.data.map((item) => {
                      return (
                        <>
                          <input
                            type="checkbox"
                            value={item._id}
                            onChange={(e) => handleChange(e)}
                            checked={selectId.includes(item._id)}
                          />
                          <h6>
                            {item?.firstName} {item?.lastName}
                          </h6>
                          <h6>{item?.email}</h6>
                          <h6>{item?.department}</h6>
                          <h6>{item?.speciality}</h6>
                          <h6>{item?.contactNumber}</h6>
                          <h6>{item?.userStatus}</h6>
                          <h6>{item?.lastLogin}</h6>
                        </>
                      );
                    })}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                      onClick={handleSubmit}
                    >
                      Assign Assistant
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            {/* for remoive assistant model */}
            <Modal
              show={openModalRemove}
              size="sxl"
              onClose={() => setOpenModalRemove(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                {dataa?.data2?.length > 0 ? (
                  <div className="text-center">
                    <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                      Remove Assistant from Hospital.
                    </h3>
                    <div
                      style={{
                        padding: "1rem",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {dataa?.data2.map((item) => {
                        return (
                          <>
                            <input
                              type="checkbox"
                              value={item._id}
                              onChange={(e) => handleChange(e)}
                              checked={selectId.includes(item._id)}
                            />
                            <h6>
                              {item?.firstName} {item?.lastName}
                            </h6>
                            <h6>{item?.email}</h6>
                            <h6>{item?.department}</h6>
                            <h6>{item?.speciality}</h6>
                            <h6>{item?.contactNumber}</h6>
                            <h6>{item?.userStatus}</h6>
                            <h6>{item?.lastLogin}</h6>
                          </>
                        );
                      })}
                    </div>
                    <div className="flex justify-center gap-4">
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "10px",
                          borderRadius: "8px",
                        }}
                        onClick={handleSubmitRemove}
                      >
                        Remove Assistant
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                      No assistant assign till now
                    </h3>
                  </div>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignHospitalToAssisnant;
