import React from 'react'
import Style from "../../../css/ManagerUsers.module.css";
// import back from "../../assets/images/back.png";
import { Link, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
// import TableCard1 from "../../container/TableCard1";
import { getAllUsersDetalisById, getEmployeeListAction, updateAllUsersDetailsById, userDeleteAction } from "../../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
function AddEmploye() {

    const getEmployeeListReducer = useSelector(
        (state) => state.getEmployeeListReducer
    );
    const { loading, data } = getEmployeeListReducer;
    console.log('dat11a', data)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmployeeListAction());
    }, [dispatch]);

    const history = useNavigate()
    return (
        <div
        >
            {/* Heading Section */}
            <div
                className="topHeading"
                style={{ display: "flex", flexDirection: "column" }}
            >
                {/* <div
            className={Style.deviceSummary}
          >
            <Link to='/add_register_user' style={{ textDecoration: 'none' }}>
              <span style={{ backgroundColor: '#CB297B', color: 'white', padding: '10px', borderRadius: '10px' }}>
                Add user
              </span>
            </Link>
          </div> */}
            </div>
            <div className={Style.Container}>
                {/* Events  */}
                <>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        User Name
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Email
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Department
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Employee Id
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Actions
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Delete
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.data && data.data.map((item1, index) => {
                                    var firstname = item1.firstName
                                    var name = firstname + " " + item1.lastName
                                    return (
                                        <tr class="bg-white border-b hover:bg-gray-50">
                                            <td class="px-6 py-4 text-center font-semibold text-gray-900">
                                                {name}
                                            </td>
                                            <td class="px-6 py-4 text-center ">
                                                {item1.email}
                                            </td>
                                            <td class="px-6 py-4 text-center ">
                                                {!item1.userType ? "NA" : item1.userType}
                                            </td>
                                            <td class="px-6 py-4 text-center ">
                                                {!item1.employeeId ? 'NA' : item1.employeeId}
                                            </td>
                                            <td class="px-6 py-4 text-center ">
                                                <select style={{ padding: "5px", padding: "9px", borderRadius: "8px", border: "0px", backgroundColor: "#cb297b", color: "white" }}
                                                    onChange={(e) => {
                                                        dispatch(updateAllUsersDetailsById({ userType: e.target.value, _id: item1._id }))
                                                        toast.success('Role Module Changed')
                                                        history('/manageUsers')
                                                    }}>
                                                    <option >{item1.userType}</option>
                                                    {item1.userType == 'User' ?
                                                        <>
                                                            <option value="Dispatch">Dispatch</option>
                                                            <option value="Production">Production</option>
                                                            <option value="Support">Support</option>
                                                            <option value="Service-Engineer">Service Engineer</option>
                                                        </>
                                                        :
                                                        item1.userType == 'Hospital-Admin' ?
                                                            <>
                                                                <option value="User">User</option>
                                                                <option value="Nurse">Nurse</option>
                                                                <option value="Dispatch">Dispatch</option>
                                                                <option value="Production">Production</option>
                                                                <option value="Support">Support</option>
                                                                <option value="Service-Engineer">Service Engineer</option>
                                                            </>
                                                            :
                                                            item1.userType == 'Nurse' ?
                                                                <>
                                                                    <option value="User">User</option>
                                                                    <option value="Dispatch">Dispatch</option>
                                                                    <option value="Production">Production</option>
                                                                    <option value="Support">Support</option>
                                                                    <option value="Service-Engineer">Service Engineer</option>
                                                                </>
                                                                :
                                                                item1.userType == 'Dispatch' ?
                                                                    <>
                                                                        <option value="User">User</option>
                                                                        <option value="Hospital-Admin">Hospital Admin</option>
                                                                        <option value="Nurse">Nurse</option>
                                                                        <option value="Production">Production</option>
                                                                        <option value="Support">Support</option>
                                                                        <option value="Service-Engineer">Service Engineer</option>
                                                                    </>
                                                                    :
                                                                    item1.userType == 'Dispatch' ?
                                                                        <>
                                                                            <option value="User">User</option>
                                                                            <option value="Production">Production</option>
                                                                            <option value="Support">Support</option>
                                                                            <option value="Service-Engineer">Service Engineer</option>
                                                                        </>
                                                                        :
                                                                        item1.userType == 'Production' ?
                                                                            <>
                                                                                <option value="User">User</option>
                                                                                <option value="Dispatch">Dispatch</option>
                                                                                <option value="Support">Support</option>
                                                                                <option value="Service-Engineer">Service Engineer</option>
                                                                            </>
                                                                            :
                                                                            item1.userType == 'Support' ?
                                                                                <>
                                                                                    <option value="User">User</option>
                                                                                    <option value="Dispatch">Dispatch</option>
                                                                                    <option value="Production">Production</option>
                                                                                    <option value="Service-Engineer">Service Engineer</option>
                                                                                </>
                                                                                :
                                                                                item1.userType == 'Service-Engineer' ?
                                                                                    <>
                                                                                        <option value="User">User</option>
                                                                                        <option value="Dispatch">Dispatch</option>
                                                                                        <option value="Production">Production</option>
                                                                                        <option value="Support">Support</option>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <option value="User">User</option>
                                                                                        <option value="Dispatch">Dispatch</option>
                                                                                        <option value="Production">Production</option>
                                                                                        <option value="Support">Support</option>
                                                                                        <option value="Service-Engineer">Service Engineer</option>
                                                                                    </>
                                                    }
                                                </select>
                                            </td>
                                            <td class="px-6 py-4 text-center ">
                                                <button className={Style.viewbtn} onClick={() => {
                                                    dispatch(userDeleteAction({ userId: item1._id }))
                                                    toast.success('User Delete Sucessfully')
                                                }
                                                }>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            </div>
        </div>
    )
}

export default AddEmploye