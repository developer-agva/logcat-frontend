import React, { useCallback, useEffect, useState } from 'react'
import Style from "../../../css/Production.module.css"
import { useDispatch, useSelector } from 'react-redux';
import {
    deviceAction,
    getDeviceIdBySerialNumber,
} from "../../../store/action/DeviceAction";

import { Button, Modal } from 'flowbite-react';
import shield from "../../../assets/icons/shield.png"
import { getAllHospitalData, getStoreSystem, putallStoreDataAction, getHospitalDataFromAdding, getHospitalListFromPinCode, postTicketServiceDataAction } from "../../../store/action/StoreSystem"
import { Link, useNavigate } from 'react-router-dom';
import back from "../../../assets/images/back.png";
import { verifyEmialForSuppport, verifyOtpForSuppport } from '../../../store/action/VerifiedEmail';
import Otpinput from '../../auth/OtpInput';
import { getSerialNumberList } from '../../../store/action/DispatchDetailsAction';
import { getTicketDetailsInSupport } from '../../../store/action/ServiceEngAction';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function ServiceEngFormData() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: '',
        service_engineer: "",
        issue: "",
        contactNo: "",
        priority: "",
        pincode: '',
        department: '',
        emailConcernedPerson: '',
        nameConcernedPerson: '',
        serialNumber: '',
        tagName: '',
        hospitalName: ''
    })
    const [checkedValue, setCheckedValue] = useState([]);
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
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/s3/upload-ticket-file`, formData,
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

    const [issuesData, setIssuesData] = useState({
        wardNo: '',
        hospitalName: '',
        department: '',
        issuedFrom: '',
        toolsProvided: ''
    })
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setCheckedValue(prev => [...prev, value])
        }
        else (
            setCheckedValue(pre => {
                return [...pre.filter(skill => skill !== value)]
            })
        )
    };
    const newCheckedValue = checkedValue?.map(item => `${item}`).join(',');
    const [state, setState] = useState({
        otp: null,
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticketNo = urlParams.get("ticketNo");

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const [verifyBtn, setVerifyBtn] = useState('Verify')

    const getHospitalListByPincodeReducer = useSelector((state) => state.getHospitalListByPincodeReducer);
    const { data: hospitalDatFromPincode } = getHospitalListByPincodeReducer;

    const getDeviceIdBySerialNumberReducer = useSelector((state) => state.getDeviceIdBySerialNumberReducer);
    const { data: serialNoData } = getDeviceIdBySerialNumberReducer;

    const storeSystemReducer = useSelector((state) => state.storeSystemReducer);
    const { data: data121 } = storeSystemReducer;
    const serviceEngName = data121 && data121.data

    const verifyOtpReducer = useSelector(
        (state) => state.verifyOtpReducer
    );
    const { data: dataa, message: msg, error } = verifyOtpReducer;

    // Hpospital Data
    // const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    // const { data: dataHospital } = getHospitalFromAdding;

    // Hpospital Data
    const deviceIdByHospitalNameReducer = useSelector((state) => state.deviceIdByHospitalNameReducer);
    const { data: dataDeviceId } = deviceIdByHospitalNameReducer;
    const deviceIdByHospital = dataDeviceId && dataDeviceId.data

    const verifyEmailReducer = useSelector((state) => state.verifyEmailReducer);
    const { loading, data, message } = verifyEmailReducer;

    // Serial Number Data
    const getSerialNumberListReducer = useSelector((state) => state.getSerialNumberListReducer);
    const { data: dataSerialNumbers } = getSerialNumberListReducer;

    const getTicketDetailsByNumberReducer = useSelector((state) => state.getTicketDetailsByNumberReducer);
    const { data: ticketData } = getTicketDetailsByNumberReducer;
    const allTicketDataGet = ticketData && ticketData.data
    console.log('allTicketDataGet', allTicketDataGet)
    useEffect(() => {
        dispatch(getSerialNumberList())
        dispatch(getTicketDetailsInSupport(ticketNo))
    }, [])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])

    // email verified
    // const email = dispatchDetails.emailConcernedPerson
    // useEffect(() => {
    //     dispatch(verifyEmialForSuppport(email))
    // }, [email])

    // Hospital Name
    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])


    useEffect(() => {
        dispatch(getStoreSystem())
    }, [])

    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])

    useEffect(() => {
        dispatch(getHospitalListFromPinCode())
    }, [])
    const navigate = useNavigate()
    const allDataFromDeviceId = `Device Id: ${serialNoData && serialNoData.deviceId},
    Concerned Person Name: ${serialNoData && serialNoData.concerned_person}, 
    Concerned Person Email: ${dispatchDetails && dispatchDetails.emailConcernedPerson},
    Concerned Person Contact: ${serialNoData && serialNoData.concerned_p_contact},
    Hospital Name: ${serialNoData && serialNoData.hospitalName},
    Warrenty Status: ${serialNoData && serialNoData.dateOfWarranty},
    Sim Number: ${serialNoData && serialNoData.simNumber},
    Batch Number : ${serialNoData && serialNoData.batchNumber},
    Manufacturing : ${serialNoData && serialNoData.manufacturingDate},
    Dispatch Date: ${serialNoData && serialNoData.dispatchDate},
    Product Type:${serialNoData && serialNoData.productType},
    Address:${serialNoData && serialNoData.address},`
    var phoneno = /^\d{10}$/
    var pinCode = /^\d{6}$/
    let priuorityValid = "Select Priority"
    let tagValid = "Select Tag"
    const dispatchHandler = () => {
        let regEx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
        // if (!dispatchDetails.service_engineer) {
        //     toast.error("Enter Service Engineer Name")
        // }
        // else if (!allDataFromDeviceId) {
        //     toast.error("Enter Details")
        // }
        // else if (!dispatchDetails.priority) {
        //     toast.error("Select Priority")
        // }
        // else if (dispatchDetails.tagName === tagValid) {
        //     toast.error('Select Tag Name')
        // }
        // else if (!dispatchDetails.emailConcernedPerson) {
        //     toast.error('Enter Concerned Person Email')
        // }
        // else if (!dispatchDetails.nameConcernedPerson) {
        //     toast.error('Enter Concerned Person Name')
        // }
        // else if (!dispatchDetails.concerned_p_contact) {
        //     toast.error('Enter Concerned Person Number')
        // }
        // else if (verifyBtn === 'Verify') {
        //     toast.error('Please Verify Email')
        // }
        // else if (dispatchDetails.priority === priuorityValid) {
        //     toast.error("Select Priority")
        // }
        // else if (dispatchDetails.service_engineer && dispatchDetails.nameConcernedPerson && dispatchDetails.issue && allDataFromDeviceId && dispatchDetails.priority && dispatchDetails.tagName && dispatchDetails.emailConcernedPerson) {
        // toast.success("Success")
        const serialNumber1 = dispatchDetails && dispatchDetails.serialNumber.length > 0 ? dispatchDetails && dispatchDetails.serialNumber : serialNoData && serialNoData.serialNumber
        if (!!ticketNo) {
            return dispatch(postTicketServiceDataAction({
                ticket_number: ticketNo,
                serialNumber: serialNumber1,
                pincode: dispatchDetails?.pincode,
                service_engineer: dispatchDetails?.service_engineer,
                tag: dispatchDetails?.tagName,
                dept_name: serialNoData && serialNoData.department_name,
                waranty_status: serialNoData?.dateOfWarranty,
                concerned_p_name: dispatchDetails?.nameConcernedPerson,
                concerned_p_email: dispatchDetails?.emailConcernedPerson,
                concerned_p_contact: serialNoData?.concerned_p_contact,
                priority: dispatchDetails?.priority,
                details: allDataFromDeviceId,
                deviceId: serialNoData && serialNoData.deviceId,
                location: location
            }))
        }
        else {
            dispatch(putallStoreDataAction({
                deviceId: serialNoData && serialNoData.deviceId,
                service_engineer: dispatchDetails.service_engineer,
                details: allDataFromDeviceId,
                concerned_p_contact: serialNoData && serialNoData.concerned_p_contact,
                contactNo: dispatchDetails?.contactNo,
                priority: dispatchDetails.priority,
                pincode: dispatchDetails && dispatchDetails.pincode,
                waranty_status: serialNoData && serialNoData.dateOfWarranty,
                concerned_p_name: dispatchDetails && dispatchDetails.nameConcernedPerson,
                concerned_p_email: dispatchDetails && dispatchDetails.emailConcernedPerson,
                serialNumber: serialNumber1,
                tag: dispatchDetails && dispatchDetails.tagName,
                address: serialNoData && serialNoData.address,
                message: newCheckedValue?.length > 0 ? newCheckedValue : allTicketDataGet?.message,
                hospitalName: issuesData?.hospitalName?.length > 0 ? issuesData?.name : allTicketDataGet?.ticketInfo?.hospital_name,
                wardNo: issuesData?.wardNo?.length > 0 ? issuesData?.name : allTicketDataGet?.wardNo,
                department: issuesData?.department?.length > 0 ? issuesData?.name : allTicketDataGet?.department,
                remark: issuesData?.description?.length > 0 ? issuesData?.name : allTicketDataGet?.remark,
                location: location,
                pincode: serialNoData?.pincode,
                toolsProvided: issuesData?.toolsProvided
            }
            )
            )
        }
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);

    }
    const goBack = () => {
        window.history.go(-1)
    }
    const handleSubmitOtp = (e) => {
        e.preventDefault()
        const otp = state.otp
        if (!otp) {
            toast.error('Enter OTP')
        }
        else {
            dispatch(verifyOtpForSuppport(otp))
            if (data && data.statusCode == 200) {
                toast.success(data && data.message)
                setVerifyBtn('Verified')
                setTimeout(() => {
                    props.setOpenModal(undefined)
                }, 500);
            }
            else if (error) {
                toast.error(error)
            }
        }
    }

    // const handleDhrFile = useCallback((e) => {
    //     e.preventDefault()
    //     let regEx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
    //     if (!dispatchDetails.emailConcernedPerson) {
    //         toast.error('Please Enter Email First')
    //     }
    //     else if (!regEx.test(dispatchDetails.emailConcernedPerson)) {
    //         toast.error('Enter Correct Email')
    //     }
    //     else if (regEx.test(dispatchDetails.emailConcernedPerson)) {
    //         const email = dispatchDetails.emailConcernedPerson.toLowerCase();
    //         dispatch(verifyEmialForSuppport(email))
    //         if (message) {
    //             toast.error(message)
    //             setVerifyBtn('Verified')
    //         }
    //         else {
    //             props.setOpenModal('pop-up')

    //         }
    //     }
    // })

    const handleAddHospital = useCallback(() => {
        navigate('/add_hospital')
    })
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    const warrent_date = serialNoData && serialNoData.dateOfWarranty
    const warrentyDateCheck = serialNoData && serialNoData.dateOfWarranty

    return (
        <div className={Style.mainContainer}>
            <div className={Style.dispatchContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem", }} />
                        </Link>
                        <h1 class="text-2xl font-extrabold">Assign<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Tickets</small></h1>
                        <hr style={{ color: "rgb(152, 0, 76)" }} />
                    </div>
                    <button onClick={handleAddHospital} style={{ backgroundColor: 'rgb(152, 0, 76)' }} type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Add Hospital</button>
                </div>
                <form >
                    <div>

                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div>
                                <label for="first_name" style={{ textAlign: 'start' }}
                                    class="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial Number</label>
                                {dispatchDetails && dispatchDetails.deviceId.length > 0 ?
                                    <input id='arrow' value={serialNoData && serialNoData.serialNumber} disabled
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                                    :
                                    <>
                                        <input list='serialno' type="text" onChange={(e) => {
                                            setDispatchDetails({ ...dispatchDetails, serialNumber: e.target.value })
                                            const serialNumber = e.target.value;
                                            dispatch(getDeviceIdBySerialNumber(serialNumber))
                                        }} value={dispatchDetails.serialNumber} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                                        <datalist id='serialno'>
                                            {dataSerialNumbers && dataSerialNumbers.data && dataSerialNumbers.data.map((item) => {
                                                return (
                                                    <option value={item.serialNumber}>{item.serialNumber}</option>
                                                )
                                            })}
                                        </datalist>
                                    </>

                                }
                            </div>
                            {/* pin code */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Pin Code</label>
                                {dispatchDetails.serialNumber.length > 0 ?
                                    <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '0.6rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        <input placeholder='Enter Pincode' defaultValue={serialNoData && serialNoData.pincode} disabled />
                                    </div> :
                                    <>
                                        <input type="number" onChange={(e) => {
                                            setDispatchDetails({ ...dispatchDetails, pincode: e.target.value })
                                            const pincode = e.target.value ? e.target.value : ""
                                            dispatch(getHospitalListFromPinCode(pincode))
                                        }}
                                            value={dispatchDetails.pincode} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter PinCode" required />
                                    </>
                                }</div>
                            {/* select service enginner */}
                            <div >
                                <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Service Engineer</label>
                                <input list="nameList" onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Enginner Name" required />
                                <datalist id='nameList' onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} value={dispatchDetails.service_engineer}>
                                    {serviceEngName && serviceEngName.map((item) => {
                                        return (
                                            <option value={item.email}>{item.firstName} ({item.userStatus == 'Active' ? 'On Work' : 'On Leave'})</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            {/* tag name */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Select Tag Name</label>
                                <select onChange={(e) => setDispatchDetails({ ...dispatchDetails, tagName: e.target.value })}
                                    value={dispatchDetails.tagName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                    <option>Select Tag</option>
                                    <option value='Installation'>Installation</option>
                                    <option value='Service'>Service</option>
                                </select>
                            </div>
                            {/* Department */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Department Name</label>
                                <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {serialNoData && serialNoData.department_name}
                                </div>
                            </div>
                            {/* Warrenty Status */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Warranty Status</label>
                                <div style={(serialNoData && serialNoData.dateOfWarranty && serialNoData.dateOfWarranty.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {warrentyDateCheck >= currentDate ? 'ACTIVE' : warrentyDateCheck >= currentDate ? 'INACTIVE' : ''}
                                </div>
                            </div>
                            {/* nameConcernedPerson */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Name</label>
                                <input list='concernedName' type="text" onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, nameConcernedPerson: e.target.value })
                                }} value={dispatchDetails.nameConcernedPerson} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Name" required />
                                <datalist id='concernedName'>
                                    <option value={serialNoData && serialNoData.concerned_person}>{serialNoData && serialNoData.concerned_person}
                                    </option>
                                </datalist>
                            </div>
                            {/* concerned person email */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Email</label>
                                <div class="flex items-center">
                                    <input type="text" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, emailConcernedPerson: e.target.value })
                                        // dispatchDetails && dispatchDetails.emailConcernedPerson === '' ? setVerifyBtn('Verify') : setVerifyBtn('Verify')
                                    }
                                    }
                                        value={dispatchDetails.emailConcernedPerson} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Email" required />
                                    {/* {verifyBtn === 'Verified' ?
                                        <button onClick={handleDhrFile} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled>
                                            {verifyBtn}
                                        </button>
                                        :
                                        <button onClick={handleDhrFile} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            {verifyBtn}
                                        </button>
                                    } */}
                                </div>
                                {dispatchDetails && dispatchDetails.emailConcernedPerson && dispatchDetails.emailConcernedPerson.length > 0 ?
                                    <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                                        <Modal.Header />
                                        <Modal.Body>
                                            <div className="text-center">
                                                <div class="mb-6">
                                                    <img src={shield} style={{ height: '3rem', display: 'block', margin: '10px auto' }} />
                                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Code</label>
                                                    <div class="flex items-center" style={{ gap: '20px' }}>
                                                        <Otpinput setState={setState} state={state} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Button onClick={handleSubmitOtp} color="failure"
                                                    // onClick={() => props.setOpenModal(undefined)}
                                                    >
                                                        Verify OTP
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                    :
                                    ''}
                            </div>
                            {/* concerned person number */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Contact Number</label>
                                <input list='concernedNumber' type="text" onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, contactNo: e.target.value })
                                }} value={dispatchDetails.contactNo} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Contact" required />
                                <datalist id='concernedNumber'>
                                    <option value={serialNoData && serialNoData.contactNo}>{serialNoData && serialNoData.contactNo}
                                    </option>
                                </datalist>
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Priority</label>
                                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" onChange={(e) => setDispatchDetails({ ...dispatchDetails, priority: e.target.value })} value={dispatchDetails.priority}>
                                    <option>Select Priority</option>
                                    <option value='Medium'>Medium</option>
                                    <option value='High'>High</option>
                                </select>
                            </div>
                        </div>
                        {ticketNo?.length > 0 ? '' :
                            <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                                {/* ### */}
                                <div>
                                    <lable class="block mb-2 text-sm font-medium text-gray-900">Ward No.</lable>
                                    <input id='arrow' onChange={(e) => setIssuesData({ ...issuesData, wardNo: e.target.value })} value={issuesData?.wardNo}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Ward Number" required />
                                    <lable class="block mb-2 text-sm font-medium text-gray-900 mt-8">Service Issued from</lable>
                                    <input type='text' onChange={(e) => setIssuesData({ ...issuesData, issuedFrom: e.target.value })} value={issuesData?.issuedFrom}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Service Issued From" required />

                                    <lable class="block mb-2 text-sm font-medium text-gray-900 mt-8">Issue Details</lable>
                                    <textarea onChange={(e) => setIssuesData({ ...issuesData, description: e.target.value })} value={issuesData.description}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 " placeholder="Enter Issue details" required />
                                    <lable class="block mb-2 text-sm font-medium text-gray-900 mt-8">Tools Provided</lable>
                                    <textarea onChange={(e) => setIssuesData({ ...issuesData, toolsProvided: e.target.value })} value={issuesData.toolsProvided}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 " placeholder="Enter Tools Provided" required />

                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <h4>Issues</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", borderRadius: '10px' }}>
                                        <div>
                                            <div class="flex items-start mb-6">
                                                <div class="flex items-center h-5">
                                                    <input
                                                        value='General Service'
                                                        onChange={handleCheckboxChange} id="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">General Services</label>
                                            </div>
                                            <div class="flex items-start mb-6">
                                                <div class="flex items-center h-5">
                                                    <input type="checkbox"
                                                        onChange={handleCheckboxChange} id="remember" value='Operating Support' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Operating Support</label>
                                            </div>
                                            <div class="flex items-start mb-6">
                                                <div class="flex items-center h-5">
                                                    <input
                                                        onChange={handleCheckboxChange} id="remember" type="checkbox" value='Request for Consumables' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Request for Consumables</label>
                                            </div>
                                            <div class="flex items-start mb-6">
                                                <div class="flex items-center h-5">
                                                    <input
                                                        onChange={handleCheckboxChange} id="remember" type="checkbox" value='Physical Damage' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physical Damage</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-start mb-6">
                                                <div class="flex items-center h-5">
                                                    <input
                                                        onChange={handleCheckboxChange} id="remember" type="checkbox" value='Issue in Ventilation' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Issue in Ventilation</label>
                                            </div>
                                            <div class="flex items-start mb-6">
                                                <div class="flex items-center h-5">
                                                    <input
                                                        onChange={handleCheckboxChange} id="remember" type="checkbox" value='Apply for CMC/AMC' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apply for CMC/AMC</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ###### */}
                            </div>}
                        {/* *** */}
                        {/* upload file */}
                        <div>
                            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 text-start">Upload File</label>
                            <div class="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                <input type="file" onChange={handleImageSelect} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400  :focus:ring-blue-500 :focus:border-blue-500" required />
                                <button style={{ width: '20%', height: '3rem', color: 'white' }} class="bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800" onClick={generateDhrFile} >
                                    {loadinState && <h6 style={{ fontSize: '0.9rem' }}>Uploading...</h6>}
                                    {!loadinState && <h6>Upload</h6>}
                                </button>
                            </div>
                        </div >
                        {/* *** */}
                    </div>
                    <div className={Style.rightForm}>
                        <div className={Style.formItem}>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Details</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: '14px', borderRadius: '10px' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, deviceIdDetails: e.target.value })} value={dispatchDetails.deviceIdDetails}>
                                {/* <div style={{display:'flex',flexWrap:'wrap'}} onChange={(e) => setDispatchDetails({ ...dispatchDetails, deviceIdDetails: e.target.value })} value={dispatchDetails.deviceIdDetails}>
                                    Address: {serialNoData && serialNoData.address}
                                </div> */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1>Device Id:</h1>
                                        <p>{serialNoData && serialNoData.deviceId}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1>Concerned Person Name:</h1>
                                        <p>{serialNoData && serialNoData.concerned_person}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1> Concerned Person Email:</h1>
                                        <p>{dispatchDetails && dispatchDetails.emailConcernedPerson}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1>Concerned Person Contact:</h1>
                                        <p>{serialNoData && serialNoData.concerned_p_contact}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1>Hospital Name:</h1>
                                        <p>{serialNoData && serialNoData.hospitalName}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1>Warrenty Status:</h1>
                                        <p>{serialNoData && serialNoData.dateOfWarranty}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1>Sim Number:</h1>
                                        <p>{serialNoData && serialNoData.simNumber}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1>Batch Number :</h1>
                                        <p>{serialNoData && serialNoData.batchNumber}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1> Manufacturing date :</h1>
                                        <p>{serialNoData && serialNoData.manufacturingDate}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1> Dispatch date :</h1>
                                        <p> {serialNoData && serialNoData.dispatchDate}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1> Product Type:</h1>
                                        <p>{serialNoData && serialNoData.productType}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <h1>Address:</h1>
                                        <p style={{ width: '550px' }}>{serialNoData && serialNoData.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: '6rem 0rem' }}>
                        <hr style={{ color: "#707070" }} />
                        <div className={Style.buttonContainer} >
                            <button className={Style.continuebtn} onClick={dispatchHandler}>Assign Ticket</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ServiceEngFormData