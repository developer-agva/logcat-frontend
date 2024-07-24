import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import back from "../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import { getPatientDetails, postEndDateAction } from '../../store/action/DeviceAction';

function NewScreenForPatient() {
    const [endDate, setEndDate] = useState('')
    const getPatientDetailsReducer = useSelector(
        (state) => state.getPatientDetailsReducer
    );
    const { loading, data, error } = getPatientDetailsReducer;
    const getAllTicket = data;
    const dispatch = useDispatch();
    //   const navigate = useNavigate();
    console.log("getAllTicket", getAllTicket)
    useEffect(() => {
        dispatch(getPatientDetails({ searchData: '', page: "1", limit: "100" }));
    }, []);
    return (
        <div>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                            <Link to='/nurse_module'>
                                <img src={back} style={{ width: "3rem" }} />
                            </Link>
                            <h1 class="flex items-center text-3xl font-extrabold" style={{ justifyContent: 'center' }}>Patient<span class="bg-rgb(152, 0, 76)-100 text-rgb(152, 0, 76)-800 text-2xl font-semibold mr-2 px-0 py-0.5 rounded ml-2">Data</span></h1>
                        </div>
                    </div>
                    {/* <div style={{ display: 'flex', gap: '2rem', width: '100%', padding: '10px' }}>
                        <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Patient Details</h5>
                            <div style={{ padding: '1rem',display:'flex',gap:'100px' }}>
                                <div>
                                <div style={{ gap: '10px', display: 'flex',textAlign:'center' }}>
                                    <p className='text-black'>UHID</p>
                                    <span>: {getAllTicket?.[0]?.UHID}</span>
                                </div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                <p className='text-black'>Name</p>
                                    <span>{getAllTicket?.[0]?.patientName}</span>
                                </div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                <p className='text-black'>Age</p>
                                    <span>{getAllTicket?.[0]?.age}</span>
                                </div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <label>Age</label>
                                    <span>{getAllTicket?.[0]?.age}</span>
                                </div>
                                </div>
                                <div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <label>Name</label>
                                    <label>{getAllTicket?.[0]?.patientName}</label>
                                </div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <label>Name</label>
                                    <label>{getAllTicket?.[0]?.patientName}</label>
                                </div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <label>Age</label>
                                    <label>{getAllTicket?.[0]?.age}</label>
                                </div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <label>Age</label>
                                    <label>{getAllTicket?.[0]?.age}</label>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Diagnosed Details</h5>

                        </div>
                    </div> */}
                    <div style={{ display: 'flex', gap: '2rem', width: '100%', padding: '10px' }}>
                        <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Illness Details</h5>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Illness name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Start Date
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                End Date
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                End Illness
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {getAllTicket?.[0]?.illnessData?.map((item, index) => {
                                            return (
                                                <tr key={index} class="bg-white border-b dark:bg-gray-800">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        {item?.name}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {item?.startDate}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <input aria-label="Date and time" type="datetime-local" style={{ width: "150px" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <button type="button" class="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">End</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    {loading && <span>loading...</span>}
                                </table>
                            </div>
                        </div>
                        <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Medicine Details</h5>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Medicine Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Start Date
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                End Date
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                End Medicine
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getAllTicket?.[0]?.medicineData?.map((item, index) => {
                                            return (
                                                <tr key={index} class="bg-white border-b">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" >
                                                        {item?.name}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {item?.startDate}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <input aria-label="Date and time" onChange={(e) => { setEndDate(e.target.value) }} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5" style={{ width: '150px' }} />
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <button
                                                            onClick={() => {
                                                                const illnessId = item._id;
                                                                const UHID = getAllTicket?.[0]?.UHID;
                                                                dispatch(postEndDateAction(illnessId, UHID))
                                                            }}
                                                            type="button" class="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">End</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewScreenForPatient