import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getAllTicketsDataAction, getServiceEngData, getServiceEngStatus, putStatusDataAction } from '../../../store/action/ServiceEngAction';
import ServiceModuleNavBar from './ServiceModuleNavBar';
import installation from '../../../assets/icons/installation.png'
import ReactReadMoreReadLess from "react-read-more-read-less";
function ServiceEnginner() {
    const [query, setQuery] = useState("");

    const getAllTicketsDataReducer = useSelector((state) => state.getAllTicketsDataReducer);
    const { loading, data } = getAllTicketsDataReducer;
    const getAllTicket = data && data.data

    // userProfileData
    const getServiceEngDataReducer = useSelector((state) => state.getServiceEngDataReducer);
    const { data: dataa } = getServiceEngDataReducer;
    const statusData = dataa && dataa.data && dataa.data.userStatus;

    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const email = adminInfo && adminInfo.data && adminInfo.data.email
    const dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        return (()=>{
            dispatch(getServiceEngData(email))
        })
    }, [])

    useEffect(() => {
        return (()=>{
            dispatch(getAllTicketsDataAction({ searchData: query, page: '1', limit: '100' }))
        })
    }, [])


    const handleSearchChange = (e) => {
        setQuery(e.target.value.toLowerCase())
        if (query && query.length > 0) {
            dispatch(getAllTicketsDataAction({ searchData: query, page: '1', limit: '100' }));
        }
    }

    const handleBtnChange = (e) => {
        e.preventDefault()
        if (statusData === 'Active') {
            const newStatus = 'Inactive'
            dispatch(getServiceEngStatus(newStatus, email))
        }
        else {
            const newStatus = 'Active'
            dispatch(getServiceEngStatus(newStatus, email))
        }
    }
    return (
        <>
            <div>
                <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                    <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: '#cb297b' }}>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center justify-start">
                                <Link to='/service_eng' class="flex ml-2 md:mr-24" style={{ textDecoration: 'none' }}>
                                    <span to='/service_eng' style={{ color: 'white' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">AgVa Healthcare</span>
                                </Link>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center ml-3">
                                    <Link to='/service_eng_installation'>
                                        <img src={installation} style={{ width: '2rem', height: '2rem' }} />
                                    </Link>
                                </div>
                                <div class="flex items-center ml-3">
                                    <ServiceModuleNavBar />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="p-4" style={{ marginTop: '2rem' }}>
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'black' }}>Status is</p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                                <h6 style={statusData == 'Active' ? { backgroundColor: 'green', borderRadius: '20rem', width: '1rem', height: '0.4rem', padding: '0.5rem' } : { backgroundColor: 'red', borderRadius: '20rem', width: '1rem', height: '0.4rem', padding: '0.5rem' }}></h6>
                                <span style={{ color: 'black' }}>{statusData == 'Active' ? 'Online' : 'Offline'}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'black' }}>Service Engineer is</p>
                            <button onClick={handleBtnChange} style={statusData == 'Active' ? { backgroundColor: 'green' } : { backgroundColor: 'red' }} type='button' class="text-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
                                {statusData == 'Active' ? 'On Work' : 'On Leave'}</button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'black' }}>Your Employee Id</p>
                            <span style={{ color: 'black' }}>AgVa326</span>
                        </div>
                    </div>
                </div>
                <div>
                    <form>
                        <div class="relative" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                            <input onChange={handleSearchChange} type="search" id="default-search" class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Search...' required />
                            <select onChange={(e) => {
                                const filter = e.target.value
                                dispatch(getAllTicketsDataAction({ filter }))
                            }} style={{ border: '0.1px solid black', borderRadius: '10px', margin: '1px', padding: '5px' }}>
                                <option value=''>Select All</option>
                                <option value='Pending'>Pending</option>
                                <option value='Completed'>Completed</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 :text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Ticket Number
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Issue
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    TAT
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Service Type
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Priority
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        {getAllTicket && getAllTicket.length > 0 ?
                            getAllTicket && getAllTicket
                                .filter((item) =>
                                    item.ticket_number.toLowerCase().includes(query)
                                ).map((item, index) => {
                                    return (
                                        <tbody>
                                            <tr class="bg-white border-b :bg-gray-800 :border-gray-700" key={index}>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                                                    {item.ticket_number}
                                                </th>
                                                <td class="px-6 py-4">
                                                    <ReactReadMoreReadLess
                                                        charLimit={10}
                                                    >
                                                        {item.issues}
                                                    </ReactReadMoreReadLess>
                                                </td>
                                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                                                    {item.createdAt.split('T')[0]}
                                                    <br />
                                                    {item.createdAt.split('T')[1].split(':')[0]}:{item.createdAt.split('T')[1].split(':')[1]}
                                                </td>
                                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                                                    {item.tag ? item.tag : '---'}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <h6>
                                                        {item.priority === 'Critical' ?
                                                            <div style={{ backgroundColor: 'red', borderRadius: '20rem', width: '1rem', height: '0.4rem', padding: '0.5rem' }}></div>
                                                            : item.priority === "Medium" ?
                                                                <div style={{ backgroundColor: "#f1c300", height: "1rem", borderRadius: "10px", width: "1rem", marginTop: "0.3rem" }}></div>
                                                                :
                                                                ""}
                                                    </h6>
                                                </td>

                                                <td class="px-6 py-4" style={{ color: '#cb297b' }}>
                                                    <select onChange={(e) => { dispatch(putStatusDataAction({ id: item._id, status: e.target.value })) }} id="countries" style={{ width: '8rem' }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                                        <option>{item.status}</option>
                                                        {item.status == 'Pending' ?
                                                            <>
                                                                <option value='Completed'>Completed</option>
                                                                <option value='Not-Done'>Incompleted</option>
                                                            </> :
                                                            item.status == 'Completed' ?
                                                                <>
                                                                    <option value='Pending'>Pending</option>
                                                                    <option value='Not-Done'>Incompleted</option>
                                                                </> :
                                                                <>
                                                                    <option value='Pending'>Pending</option>
                                                                    <option value='Completed'>Completed</option>
                                                                </>
                                                        }
                                                    </select>
                                                </td>
                                                <td class="px-6 py-4" style={{ color: '#cb297b' }}>
                                                    <button type="button" onClick={() => {
                                                        navigate(`/service_eng_module?Id=${item._id}&deviceId=${item.deviceId}`);
                                                    }} style={{ backgroundColor: '#cb297b' }} class="text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            :
                            <div class="bg-white border-b :bg-gray-800 :border-gray-700" style={{ width: '350%', textAlign: 'center' }}>
                                <div class="px-8 py-8">
                                    No Ticket Assigned
                                </div>
                                {loading &&
                                    <div role="status" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin :text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>}
                            </div>
                        }
                    </table>
                </div>
            </div>
        </>
    )
}

export default ServiceEnginner