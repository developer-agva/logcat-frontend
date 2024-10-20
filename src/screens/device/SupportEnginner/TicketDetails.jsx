import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTicketDetailsInSupport } from '../../../store/action/ServiceEngAction'
import { Link } from 'react-router-dom';
function TicketDetails() {
    const dispatch = useDispatch();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get("ticket");
    console.log('ticket', ticket)

    const getTicketDetailsByNumberReducer = useSelector((state) => state.getTicketDetailsByNumberReducer);
    const { loading, data: ticketData } = getTicketDetailsByNumberReducer;
    const allTicketDataGet = ticketData && ticketData.data
    const feedbackData = ticketData && ticketData.feedback
    console.log('allTicketDataGet', allTicketDataGet)
    useEffect(() => {
        dispatch(getTicketDetailsInSupport(ticket))
    }, [])
    return (
        <div>
            <div class="p-3">
                <div style={{display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'black' }}>Priority</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h6>
                                {allTicketDataGet && allTicketDataGet.priority === 'High' ?
                                    <div style={{ backgroundColor: 'red', borderRadius: '20rem', width: '1rem', height: '0.4rem', padding: '0.5rem' }}></div>
                                    : allTicketDataGet && allTicketDataGet.priority === "Medium" ?
                                        <div style={{ backgroundColor: "#f1c300", height: "1rem", borderRadius: "10px", width: "1rem", marginTop: "0.3rem" }}></div>
                                        :
                                        ""}
                            </h6>
                            <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet.priority}</span>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'black' }}>Serial Number</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet?.ticketInfo?.serialNumber ? allTicketDataGet && allTicketDataGet?.ticketInfo?.serialNumber : '- - -'}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'black' }}>Ticket Number</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet.ticket_number}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'black' }}>Status</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {allTicketDataGet && allTicketDataGet.status === 'Pending' ?
                                <span style={{ color: 'black', padding: '10px', backgroundColor: '#f1c300', color: 'white' }}>{allTicketDataGet && allTicketDataGet.status}</span>
                                :
                                allTicketDataGet && allTicketDataGet.status === 'Completed' ?
                                    <span style={{ color: 'black', padding: '10px', backgroundColor: 'green', color: 'white' }}>{allTicketDataGet && allTicketDataGet.status}</span>
                                    :
                                    <span style={{ color: 'black', padding: '10px', backgroundColor: 'red', color: 'white' }}>{allTicketDataGet && allTicketDataGet.status}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-3">

                <h4 class="text-xl  font-bold :text-white">Ticket Details</h4>

            </div>
            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'row' }} class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 :bg-gray-800 :border-gray-700 :hover:bg-gray-700">
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Address : {allTicketDataGet && allTicketDataGet?.ticketInfo?.address}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Concern Person Name : {allTicketDataGet && allTicketDataGet?.ticketInfo?.concerned_p_name}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Concern Person Email : {allTicketDataGet && allTicketDataGet?.ticketInfo?.concerned_p_email}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Concern Person Number : {allTicketDataGet && allTicketDataGet?.ticketInfo?.concerned_p_contact}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Department Name : {allTicketDataGet && allTicketDataGet?.ticketInfo?.dept_name}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Pin Code : {allTicketDataGet && allTicketDataGet?.ticketInfo?.pincode}
                        </p>
                    </div>
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Hospital Name : {allTicketDataGet && allTicketDataGet?.ticketInfo?.hospital_name}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Service Engineer Email : {allTicketDataGet && allTicketDataGet?.ticketInfo?.service_engineer}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Tag : {allTicketDataGet && allTicketDataGet?.ticketInfo?.tag}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Ticket Owner : {allTicketDataGet && allTicketDataGet?.ticketInfo?.ticket_owner}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                            Waranty Status : {allTicketDataGet && allTicketDataGet?.ticketInfo?.waranty_status}
                        </p>
                        <p class="font-normal text-gray-700 :text-gray-400">
                          View  File : 
                          {allTicketDataGet?.ticketInfo?.location? <Link to={allTicketDataGet?.ticketInfo?.location?allTicketDataGet?.ticketInfo?.location:'NA'}>View File</Link>: ' - - -' }
                        </p>
                    </div>
                </div>
            </div>
            <div class="p-3">
                <h4 class="text-xl  font-bold :text-white">Feedback Details</h4>
            </div>
            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'row' }} class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 :bg-gray-800 :border-gray-700 :hover:bg-gray-700">
                    {feedbackData ?
                        <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Name : {feedbackData && feedbackData.name}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Email : {feedbackData && feedbackData.email}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Message : {feedbackData && feedbackData.message}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Ticket Number : {feedbackData && feedbackData.ticket_number}
                            </p>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                Rating : {feedbackData && feedbackData.ratings}
                            </p>
                        </div>
                        :
                        <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <p class="font-normal text-gray-700 :text-gray-400">
                                No Feedback Details
                            </p>
                        </div>}
                </div>
            </div>
            <div class="p-3">
                <h2 class="mb-2 text-lg font-semibold text-gray-900 :text-white">Issue Details:</h2>
                <ul class="max-w-md space-y-1 text-gray-500 list-inside :text-gray-400">
                    <li class="flex items-center">
                        <svg class="w-4 h-4 mr-2 text-red-500 :text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                        </svg>
                        <br />
                        {allTicketDataGet && allTicketDataGet.message}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TicketDetails