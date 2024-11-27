import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { changeTicketStatusAction, getTicketDetailsInSupport, getVerifiedOtpServiceAction, postServiceTicketStatus } from '../../../store/action/ServiceEngAction'
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { TextInput, Toast } from 'flowbite-react/lib/esm';
import Otpinput from '../../auth/OtpInput';
import { Toaster, toast } from 'react-hot-toast';

import { getSerialNumberList } from '../../../store/action/DispatchDetailsAction';
import back from "../../../assets/images/back.png";
import axios from 'axios';
import { postSerialNoFromTicketDetailsAction } from '../../../store/action/StoreSystem';
function TicketDetails() {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticket = urlParams.get("ticket");

    const getTicketDetailsByNumberReducer = useSelector(
        (state) => state.getTicketDetailsByNumberReducer,
        shallowEqual
    );
    const { data: ticketData } = getTicketDetailsByNumberReducer;

    const postServiceEngTicketStatusReducer = useSelector((state) => state.postServiceEngTicketStatusReducer);
    const { data } = postServiceEngTicketStatusReducer;

    const getVerifyOtpServicesReducer = useSelector((state) => state.getVerifyOtpServicesReducer);
    const { data: verifyData } = getVerifyOtpServicesReducer;

    const allTicketDataGet = ticketData && ticketData.data;
    const feedbackData = ticketData && ticketData.feedback;

    const [state, setState] = useState({ otp: null });
    const [remarks, setRemarks] = useState('');
    const [btnState, setBtnState] = useState(false);
    const [isOtpVerifying, setIsOtpVerifying] = useState(false);

    const [loadinState, setLoadingState] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [todateformat, setTodateformat] = useState('');
    const [fromdateformat, setFromdateformat] = useState('');
    const [uploadTicketFile, setUploadTicketFile] = useState(false)
    const [pdfUrl, setPdfUrl] = useState('');
    const [location, setlocation] = useState('')

    const generateDhrFile = async (e) => {
        e.preventDefault()
        setUploadTicketFile(true)
        if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/s3/update-ticket-file/${ticket}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            setlocation(response?.data?.location)
            toast.success('File Uploaded')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    useEffect(() => {
        dispatch(getTicketDetailsInSupport(ticket));
    }, [ticket, dispatch]);
    // ticket close button
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!remarks) {
            return alert('Enter Remarks');
        }

        const _id = allTicketDataGet?._id;
        const serviceEngName = allTicketDataGet?.serviceEngName || 'NA';
        const contactNo = allTicketDataGet?.contactNo;

        setBtnState(true);
        await dispatch(postServiceTicketStatus(_id, contactNo, serviceEngName));
        setBtnState(false);

        if (data?.statusCode === 201) {
            alert('OTP Sent');
            setTimeout(() => {
                setOpenModal('pop-up');
            }, 1000);
        }
    }, [remarks, allTicketDataGet, data, dispatch]);
    const handleRemarksChange = (e) => {
        setRemarks(e.target.value)
    }

    // Serial Number Data
    const getSerialNumberListReducer = useSelector((state) => state.getSerialNumberListReducer);
    const { data: dataSerialNumbers } = getSerialNumberListReducer;

    useEffect(() => {
        dispatch(getSerialNumberList())
    }, [])

    const handleVerifyOtp = useCallback(async () => {
        if (!state.otp) {
            return alert('Enter Otp');
        }

        setIsOtpVerifying(true);
        const otp = state.otp;
        const deviceId = allTicketDataGet?.deviceId;
        await dispatch(getVerifiedOtpServiceAction(otp, deviceId, remarks));
        setIsOtpVerifying(false);
        console.log('verifyData', verifyData)
        if (verifyData?.data === 200) {
            alert(verifyData?.message);
            setTimeout(() => {
                setOpenModal(undefined)
            }, 1000);
        }
    }, [state, allTicketDataGet, remarks, verifyData, dispatch]);

    const goBack = () => {
        window.history.go(-1)
    }
    const navigate=useNavigate()
    return (
        <div>
            <Toaster />
            <div className="p-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                    <Link onClick={goBack} style={{ display: 'block' }}>
                        <img src={back} style={{ width: "3rem", }} />
                    </Link>
                    <h1 class="text-2xl font-extrabold">Ticket<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                    <hr style={{ color: "rgb(152, 0, 76)" }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgb(152, 0, 76)', padding: '8px', width: '5rem', color: 'white', borderRadius: '5px' }}>
                    <button onClick={()=>{navigate(`/edit_Ticket_Details?ticketDetails=${ticket}`)}}>Edit
                    <CiEdit size={22} style={{display:'inline',marginLeft:'5px'}}/>
                    </button>
                </div>
            </div>
            <div className="p-3">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        <span style={{ color: 'black' }}>Device Id</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet.deviceId ? allTicketDataGet && allTicketDataGet?.deviceId : '- - -'}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'black' }}>Ticket Number</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'black', padding: '10px' }}>{allTicketDataGet && allTicketDataGet.ticket_number}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 flex justify-between">
                <div>
                    <h4 className="text-xl  font-bold mb-4">Ticket Details</h4>
                    <h1>
                        Ticket Status : <span style={allTicketDataGet?.ticketStatus === 'Open' ? { backgroundColor: '#FFBF00', color: 'white', width: '120px', height: '40px', padding: '10px', color: 'black', borderRadius: '5px' } : allTicketDataGet?.ticketStatus === 'Hold' ? { marginLeft: '5px', borderRadius: '5px', backgroundColor: '#AC0303', color: 'white', width: '120px', padding: '10px', height: '40px', } : { marginLeft: '5px', borderRadius: '5px', backgroundColor: 'grey', color: 'white', width: '120px', padding: '10px', height: '40px', }}>
                            {allTicketDataGet?.ticketStatus ? allTicketDataGet?.ticketStatus : 'Loading...'}
                        </span>
                    </h1>
                </div>
                {allTicketDataGet?.ticketStatus === "Open" || allTicketDataGet?.ticketStatus === "Hold" ?
                    <button style={{ backgroundColor: '#98004c', color: 'white', width: '120px', height: '40px', padding: '10px', borderRadius: '5px' }}
                        onClick={() => {
                            const ticket_number = allTicketDataGet?.ticket_number;
                            const ticketStatus = 'Closed'
                            dispatch(changeTicketStatusAction(ticket_number, ticketStatus))
                        }}>Close Ticket</button>
                    : ''}

                {/* {btnState === false ?
                    <button style={allTicketDataGet?.ticketStatus === 'Open' ? { backgroundColor: '#FFBF00', color: 'white', width: '120px', height: '40px', padding: '10px', color: 'black', borderRadius: '5px' } : allTicketDataGet?.ticketStatus === 'Hold' ? { marginLeft: '5px', borderRadius: '5px', backgroundColor: '#AC0303', color: 'white', width: '120px', padding: '10px', height: '40px', } : { marginLeft: '5px', borderRadius: '5px', backgroundColor: 'grey', color: 'white', width: '120px', padding: '10px', height: '40px', }}
                        onClick={() => {
                            (allTicketDataGet?.ticketStatus === 'Open' || allTicketDataGet?.ticketStatus === 'Hold' ? props.setOpenModal('default') : props.setOpenModal('defaults'))
                            localStorage.setItem('_idd', allTicketDataGet?._id)
                            localStorage.setItem('_date', allTicketDataGet?.date)
                        }
                        }>Close Ticket</button>
                    :
                    <button style={{ backgroundColor: 'black', color: 'white', width: '120px', height: '40px', padding: '10px', color: 'black', borderRadius: '5px' }}
                    >Loading..</button>
                } */}
            </div>
            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'row' }} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 :bg-gray-800 :border-gray-700 :hover:bg-gray-700">
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                       
                        <p className="font-normal text-gray-700">
                            Address : {allTicketDataGet && allTicketDataGet?.ticketInfo?.address}
                        </p>
                        <p className="font-normal text-gray-700">
                            Concern Person Name : {allTicketDataGet && allTicketDataGet?.ticketInfo?.concerned_p_name}
                        </p>
                        <p className="font-normal text-gray-700">
                            Concern Person Email : {allTicketDataGet && allTicketDataGet?.ticketInfo?.concerned_p_email}
                        </p>
                        <p className="font-normal text-gray-700">
                            Concern Person Number : {allTicketDataGet && allTicketDataGet?.ticketInfo?.concerned_p_contact}
                        </p>
                        <p className="font-normal text-gray-700">
                            Department Name : {allTicketDataGet && allTicketDataGet?.ticketInfo?.dept_name}
                        </p>
                        <p className="font-normal text-gray-700">
                            Pin Code : {allTicketDataGet && allTicketDataGet?.ticketInfo?.pincode}
                        </p>
                        <p className="font-normal text-gray-700">
                            Tools Provided : {allTicketDataGet && allTicketDataGet?.toolsProvided}
                        </p>
                    </div>
                    <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <p className="font-normal text-gray-700">
                            Hospital Name : {allTicketDataGet && allTicketDataGet?.hospitalName}
                        </p>
                        <p className="font-normal text-gray-700">
                            Service Engineer Email : {allTicketDataGet && allTicketDataGet?.ticketInfo?.service_engineer}
                        </p>
                        <p className="font-normal text-gray-700">
                            Tag : {allTicketDataGet && allTicketDataGet?.ticketInfo?.tag}
                        </p>
                        <p className="font-normal text-gray-700">
                            Ticket Owner : {allTicketDataGet && allTicketDataGet?.ticketInfo?.ticket_owner}
                        </p>
                        <p className="font-normal text-gray-700">
                            Waranty Status : {allTicketDataGet && allTicketDataGet?.ticketInfo?.waranty_status}
                        </p>
                        <p className="font-normal text-gray-700">
                            Attachment : {!allTicketDataGet?.ticketInfo?.location || allTicketDataGet?.ticketInfo?.location == "" || allTicketDataGet?.ticketInfo?.location == "NA" ?
                               "---"
                                :
                                <Link style={{ padding: '5px', backgroundColor: 'grey', color: 'white', borderRadius: '8px' }} to={allTicketDataGet?.ticketInfo?.location ? allTicketDataGet?.ticketInfo?.location : 'NA'}>View File</Link>}
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <h4 className="text-xl  font-bold :text-white">Feedback Details</h4>
            </div>
            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'row' }} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 :bg-gray-800 :border-gray-700 :hover:bg-gray-700">
                    {feedbackData ?
                        <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <p className="font-normal text-gray-700">
                                Name : {feedbackData && feedbackData.name}
                            </p>
                            <p className="font-normal text-gray-700">
                                Email : {feedbackData && feedbackData.email}
                            </p>
                            <p className="font-normal text-gray-700">
                                Message : {feedbackData && feedbackData.message}
                            </p>
                            <p className="font-normal text-gray-700">
                                Ticket Number : {feedbackData && feedbackData.ticket_number}
                            </p>
                            <p className="font-normal text-gray-700">
                                Rating : {feedbackData && feedbackData.ratings}
                            </p>
                        </div>
                        :
                        <div style={{ textDecoration: 'none', width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <p className="font-normal text-gray-700">
                                No Feedback Details
                            </p>
                        </div>}
                </div>
            </div>
            <div className="p-3">
                <h2 className="mb-2 text-lg font-semibold text-gray-900 :text-white">Issue Details:</h2>
                <ul className="max-w-md space-y-1 text-gray-500 list-insid0">
                    <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500 :text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                        </svg>
                        <br />
                        {allTicketDataGet && allTicketDataGet.message}
                    </li>
                </ul>
            </div>
            <Modal show={props.openModal == 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header style={{ padding: '1rem' }}>Ticket Details</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div style={{ backgroundColor: '#FFBF00', display: 'inline-block', padding: '8px', borderRadius: '5px' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <h6>Ticket Number</h6>
                                -
                                <p style={{ color: 'white' }}>{allTicketDataGet?.ticket_number}</p>
                            </div>
                        </div>
                        <h4>Details</h4>
                        <div style={{ display: 'flex', padding: '5px', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <p>{allTicketDataGet?.ticketInfo?.concerned_p_name}</p>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <p>{allTicketDataGet?.email}</p>
                                </div>

                                <div>
                                    <lable className="block mb-2 text-sm font-medium text-gray-900">Ward No.</lable>
                                    <p>
                                        {allTicketDataGet?.wardNo}
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div>
                                    <lable className="block mb-2 text-sm font-medium text-gray-900">Contact Number</lable>
                                    <p>
                                        {allTicketDataGet?.contactNo}
                                    </p>

                                </div>
                                <div>
                                    <lable className="block mb-2 text-sm font-medium text-gray-900">Hospital Name</lable>
                                    <p>
                                        {allTicketDataGet?.hospitalName}
                                    </p>

                                </div>
                                <div>
                                    <lable className="block mb-2 text-sm font-medium text-gray-900">Department</lable>
                                    <p>
                                        {allTicketDataGet?.department}
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h4>Issues</h4>
                            <p>
                                {allTicketDataGet?.message?.split(',')[0]}
                                <br />
                                {allTicketDataGet?.message?.split(',')[1]}
                                <br />
                                {allTicketDataGet?.message?.split(',')[2]}
                                <br />
                                {allTicketDataGet?.message?.split(',')[3]}
                                <br />
                                {allTicketDataGet?.message?.split(',')[4]}
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <lable>Remarks</lable>
                            <TextInput type="text" onChange={handleRemarksChange} placeholder='Enter Remarks' />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button style={{ display: 'flex', justifyContent: 'center' }} onClick={handleSubmit} className="text-white bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Ticket Close</button>
                            <button style={{ display: 'flex', justifyContent: 'center' }} onClick={() => { props.setOpenModal(undefined) }} className="text-black bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Close</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={props.openModal == 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <div className="mb-6">
                            {/* <img src={shield} style={{ height: '3rem', display: 'block', margin: '10px auto' }} /> */}
                            <label for="large-input" className="block mb-2 text-sm font-medium text-gray-900 dar">Enter OTP Code</label>
                            <div className="flex items-center" style={{ gap: '20px' }}>
                                <Otpinput setState={setState} state={state} />
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button className="text-white bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                onClick={handleVerifyOtp}
                            >
                                Verify OTP
                            </button>
                            <button className="text-black bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                onClick={() => props.setOpenModal(undefined)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default TicketDetails