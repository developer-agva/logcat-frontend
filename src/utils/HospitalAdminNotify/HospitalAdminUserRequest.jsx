import React, { useEffect } from 'react'
import { Navbar } from '../NavBar'
import SideBar from '../Sidebar'
import { Link } from 'react-router-dom'
import back from "../../assets/images/back.png";
import Style from "../../css/DevicePage.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getHospitalAdminUserRequestAction } from '../../store/action/AdminDashboard';
import SpinnerCustom from '../../container/SpinnerCustom';
function HospitalAdminUserRequest() {
    const getHospitalAdminUserRequestReducer = useSelector((state) => state.getHospitalAdminUserRequestReducer);
    const { loading, data } = getHospitalAdminUserRequestReducer;
    const newData = data && data.data;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHospitalAdminUserRequestAction())
    }, [])
  
    return (
        <>
            <Navbar />
            <SideBar />
            <div className=""
                style={{
                    position: "relative",
                    top: "4.5rem",
                    marginLeft: "7%",
                    width: "90%",
                }}>
                <div
                    className="topHeading"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                        <div
                            className="deviceSummary"
                            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                        >
                            <Link to="/home">
                                <img src={back} style={{ width: "3rem" }} />
                            </Link>
                            <h4 className={Style.Header}>User's Request</h4>
                        </div>
                    </div>
                </div>
                <div >
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Serial Number
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Requested By
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Hospital Name
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Device Type
                                    </td>
                                    <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                        Date
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {newData && newData.length > 0 ?
                                    newData && newData.map((item, index) => {
                                        return (
                                            <tr class="bg-white border-b hover:bg-gray-50">
                                                <td class="px-6 py-4 text-center font-semibold text-gray-900">
                                                    {item.serialNumber}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    {item.requestedBy}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    {item.hospitalName}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    {item.deviceType}
                                                </td>
                                                <td class="px-6 py-4 text-center ">
                                                    {item.createdAt.split('T')[0]}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : 
                                    // <section style={{ marginTop: '1rem', marginBottom: '1rem',display:'flex',justifyContent:'center'}}>
                                        newData && newData.length == 0 && (
                                            <section style={{marginRight:'10rem'}}>
                                                <span>
                                                    No Data Found
                                                </span>
                                             </section>
                                        )
                                    // </section>
                                }
                                {loading && <SpinnerCustom />}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HospitalAdminUserRequest