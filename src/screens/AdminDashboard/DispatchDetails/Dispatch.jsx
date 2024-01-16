import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchDetailsAction, getDeviceIdFromProduction, getPincodeData, getSerialNumberList, getSingleHospitalDetails, getproductionDetailsByIdAction } from '../../../store/action/DispatchDetailsAction'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DispatchDetails.module.css"
import { Link, useNavigate } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import { getHospitalDataFromAdding } from '../../../store/action/StoreSystem'
import { deviceAction, getDeviceIdBySerialNumber } from '../../../store/action/DeviceAction'
import NavBarForAll from '../../../utils/NavBarForAll'
import { Button, Card, Checkbox, Label, TextInput, Radio } from 'flowbite-react';

function Dispatch() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: '',
        product_type: "",
        serial_no: "",
        hospitalName: "",
        purpose: "",
        concerned_person: "",
        consignee_name: '',
        consignee_address: '',
        phone_number: "",
        concerned_person_email: '',
        gst_number: '',
        leadMarketingUser: '',
        date_of_dispatch: "",
        distributor_name: "",
        distributor_contact: "",
        document_no: "",
        nDistrict: '',
        nPincode: '',
        nState: '',
        nCity: '',
        nAddress: ''
    })
    const dispatch = useDispatch()


    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serialNo = urlParams.get("serialNum");
    const deviceID = urlParams.get('deviceId')

    // Single Hpospital Data
    const getHospitalDetailsReducer = useSelector((state) => state.getHospitalDetailsReducer);
    const { data: singleHospitalData } = getHospitalDetailsReducer;
    const singleDataOfHospital = singleHospitalData && singleHospitalData.data

    const hospitalPinCode = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode;
    const hospitalDistrict = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].District;
    const hospitalCity = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].City;
    const hospitalAddress = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Hospital_Address;
    const hospitalState = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].State
    // Serial No
    const getDeviceIdBySerialNumberReducer = useSelector((state) => state.getDeviceIdBySerialNumberReducer);
    const { data: dataSerialNo, error } = getDeviceIdBySerialNumberReducer;
    useEffect(() => {
        dispatch(getDeviceIdBySerialNumber())
    }, [])


    const getPiincodeDatReducer = useSelector((state) => state.getPiincodeDatReducer);
    const { data: pincodeData } = getPiincodeDatReducer;
    const getPincodeAllData = pincodeData && pincodeData.data && pincodeData.data[0]
    useEffect(() => {
        dispatch(getPincodeData())
    }, [])

    useEffect(() => {
        dispatch(getproductionDetailsByIdAction())
    }, [])

    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])
    useEffect(() => {
        dispatch(getDeviceIdFromProduction())
    }, [])

    var phoneno = /^\d{10}$/
    var pinCode = /^\d{6}$/
    var purposeValid = "Select Purpose Type"
    var productValid = "Select Product Type"


    const pincodeNewData = dispatchDetails.nPincode.length > 0 ? dispatchDetails.nPincode : hospitalPinCode
    const districtNewData = dispatchDetails.nDistrict.length > 0 ? dispatchDetails.nDistrict : hospitalPinCode
    const cityNewData = dispatchDetails.nCity.length > 0 ? dispatchDetails.nCity : hospitalPinCode
    const stateNewData = dispatchDetails.nState.length > 0 ? dispatchDetails.nState : hospitalPinCode

    const dispatchHandler = (e) => {
        e.preventDefault()
        if (!dispatchDetails.product_type || dispatchDetails.purpose === productValid) {
            toast.error("Enter Product Type")
        }
        else if (!dispatchDetails.purpose || dispatchDetails.purpose === purposeValid) {
            toast.error("Enter Purpose")
        }
        else if (!dispatchDetails.date_of_dispatch) {
            toast.error("Enter Date Of Dispatch")
        }
        else if (!dispatchDetails.document_no) {
            toast.error("Enter Document Number")
        }
        else if (!dispatchDetails.gst_number) {
            toast.error('Enter Gst Number')
        }
        else if (!dispatchDetails.leadMarketingUser) {
            toast.error('Enter Lead marketing user')
        }
        else if (dispatchDetails.product_type && dispatchDetails.purpose && dispatchDetails.document_no && dispatchDetails.date_of_dispatch && dispatchDetails.gst_number && dispatchDetails.leadMarketingUser) {
            dispatch(dispatchDetailsAction({
                deviceId: deviceID,
                product_type: dispatchDetails.product_type,
                serial_no: serialNo,
                purpose: dispatchDetails.purpose,
                concerned_person: dispatchDetails.concerned_person,
                consinee: dispatchDetails.consignee_name,
                consigneeAddress: dispatchDetails.consignee_address,
                phone_number: dispatchDetails.phone_number,
                marketing_lead: dispatchDetails.leadMarketingUser,
                gst_number: dispatchDetails.gst_number,
                concerned_person_email: dispatchDetails.concerned_person_email,
                address: hospitalAddress,
                date_of_dispatch: dispatchDetails.date_of_dispatch,
                hospital_name: dispatchDetails.hospitalName,
                pincode: pincodeNewData,
                distributor_name: dispatchDetails.distributor_name,
                distributor_contact: dispatchDetails.distributor_contact,
                district: districtNewData,
                state: stateNewData,
                city: cityNewData,
                document_no: dispatchDetails.document_no
            }))
        }
    }

    const navigate = useNavigate()
    const handleAddHospital = () => {
        navigate('/add_hospital')
    }
    const goBack = () => {
        window.history.go(-1)
    }

    return (
        <>
            <Toaster />
            <NavBarForAll />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                            <Link onClick={goBack} style={{ display: 'block' }}>
                                <img src={back} style={{ width: "3rem", }} />
                            </Link>
                            <h1 class="text-2xl font-extrabold">Dispatch<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                            <hr style={{ color: "#CB297B" }} />
                        </div>
                        <button onClick={handleAddHospital} style={{ backgroundColor: '#cb297b' }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Hospital</button>
                    </div>
                    <div>
                        <div
                            style={{ width: '100%' }}
                        >
                            <h4 style={{ textAlign: 'start', fontSize: "1.5rem", color: '#cd597b', paddingBottom: '1.5rem' }}>Device Details:</h4>

                            <Card
                            >
                                <form className='w-full flex gap-12 flex-wrap'>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '12rem' }}>Serial Number :</span>
                                            <input readOnly
                                                defaultValue={serialNo} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '12rem' }}>Device Id :</span>
                                            <input readOnly
                                                defaultValue={deviceID} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter device id" required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '12rem' }}>Product Type :</span>
                                            <select id="countries" onChange={(e) => setDispatchDetails({ ...dispatchDetails, product_type: e.target.value })}
                                                value={dispatchDetails.product_type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                                <option defaultChecked>{productValid}</option>
                                                <option>AgVa Pro</option>
                                                <option>Insulin</option>
                                                <option>Suction Pump</option>
                                                <option>AgVa Oxy+</option>
                                                <option>AgVa Emer.</option>
                                                <option>AgVa Inteli</option>
                                                <option>Patient Moniter</option>
                                                <option>Sedation System</option>
                                            </select>
                                        </section>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '12rem' }}>Purpose :</span>
                                            <select id="countries" onChange={(e) => setDispatchDetails({ ...dispatchDetails, purpose: e.target.value })}
                                                value={dispatchDetails.purpose} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                                <option defaultChecked>{purposeValid}</option>
                                                <option>Sold</option>
                                                <option>Demo</option>
                                            </select>
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '12rem' }}>Lead By :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, leadMarketingUser: e.target.value })}
                                                value={dispatchDetails.leadMarketingUser} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Person Name.' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '12rem' }}>PO Number :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, document_no: e.target.value })}
                                                value={dispatchDetails.document_no} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter PO Number' required />
                                        </section>
                                    </div>
                                </form>
                            </Card >
                        </div>
                    </div>
                    <div>
                        <div
                            style={{ width: '100%' }}
                        >
                            <h4 style={{ textAlign: 'start', fontSize: "1.5rem", color: '#cd597b', paddingBottom: '1.5rem' }}>Build To:</h4>

                            <Card
                            >
                                <form className='w-full flex justify-between flex-wrap'>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ width: 'full', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>Consignee Name :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, consignee_name: e.target.value })}
                                                value={dispatchDetails.consignee_name} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Consignee Name' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>Consignee Address :</span>
                                            <textarea type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, consignee_address: e.target.value })}
                                                value={dispatchDetails.consignee_address} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Consignee Address' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>Concerned Person Email:</span>
                                            <input type="email" onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_person_email: e.target.value })}
                                                value={dispatchDetails.concerned_person_email} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Concerned Person Email' required />

                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>Person Contact:</span>
                                            <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, phone_number: e.target.value })}
                                                value={dispatchDetails.phone_number} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Concerned Person Contact' required />

                                        </section>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>Distributor Name :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_name: e.target.value })} value={dispatchDetails.distributor_name} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Distributor Name' required />

                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>Distributer Contact:</span>
                                            <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_contact: e.target.value })}
                                                value={dispatchDetails.distributor_contact} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Distributor Contact' required />
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '22rem', textAlign: 'start' }}>Concerned Person Name :</span>
                                            <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_person: e.target.value })}
                                                value={dispatchDetails.concerned_person} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Concerned Person Name' required />
                                        </section>
                                    </div>
                                </form>
                            </Card >
                        </div>
                    </div>
                    <div>
                        <div
                            style={{ width: '100%' }}
                        >
                            <h4 style={{ textAlign: 'start', fontSize: "1.5rem", color: '#cd597b', paddingBottom: '1.5rem' }}>Shipped To:</h4>
                            <Card
                            >
                                <form className='w-full flex justify-between flex-wrap'>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ width: 'full', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>Hospital Name :</span>
                                            <input list='data' type="text" onChange={(e) => {
                                                setDispatchDetails({ ...dispatchDetails, hospitalName: e.target.value })
                                                const hospital_name = e.target.value;
                                                dispatch(getSingleHospitalDetails(hospital_name))
                                            }} value={dispatchDetails.hospitalName} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                                            <datalist id='data'>
                                                {dataHospital && dataHospital.map((item) => {
                                                    return (
                                                        <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                                                    )
                                                })}
                                            </datalist></section>
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>Address :</span>
                                            <textarea type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, consignee_address: e.target.value })}
                                                value={dispatchDetails.consignee_address} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Consignee Address' required />
                                        </section>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>PinCode:</span>
                                            {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                                <div>
                                                    <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label>
                                                    <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Pincode.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                                        {hospitalPinCode}
                                                    </div>
                                                </div>
                                                :
                                                <div class="mb-6">
                                                    <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label>
                                                    <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nPincode: e.target.value })}
                                                        value={dispatchDetails.nPincode} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter PIN code' required />
                                                </div>}
                                        </section>
                                        {/* <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ width: '20rem', textAlign: 'start' }}>District:</span>
                                            <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_contact: e.target.value })}
                                                value={dispatchDetails.distributor_contact} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Distributor Contact' required />
                                        </section> */}
                                    </div>
                                </form>
                            </Card >
                        </div>
                    </div>
                    <form>
                        <div class="grid gap-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div class="mb-6" style={{ width: '204%' }}>
                                <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">GST Number</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, gst_number: e.target.value })}
                                    value={dispatchDetails.gst_number} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter GST Number' required />
                                {dispatchDetails.gst_number.length > 0 ?
                                    <>
                                        <span>Details:</span><p style={{ fontSize: '0.8rem', display: 'inline' }}>Verify</p>
                                    </>
                                    : ''}
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            {/* dispatch date */}
                            <div class="mb-6">
                                <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Dispatch Date</label>
                                <input type="date" onChange={(e) => setDispatchDetails({ ...dispatchDetails, date_of_dispatch: e.target.value })}
                                    value={dispatchDetails.date_of_dispatch} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                            </div>
                            {/* Distributer Contact */}

                            {/* PIN Code */}
                            <div>
                                {/* <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label> */}
                                {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                    <div>
                                        <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label>
                                        <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Pincode.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                            {hospitalPinCode}
                                        </div>
                                    </div>
                                    :
                                    <div class="mb-6">
                                        <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label>
                                        <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nPincode: e.target.value })}
                                            value={dispatchDetails.nPincode} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter PIN code' required />
                                    </div>}
                            </div>

                            {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                <div>
                                    <label for="district" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">District</label>
                                    <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].District.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {hospitalDistrict}
                                    </div>
                                </div>
                                :
                                <div class="mb-6">
                                    <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">District</label>
                                    <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nDistrict: e.target.value })}
                                        value={dispatchDetails.nDistrict} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter District' required />
                                </div>
                            }
                            {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                <div>
                                    <label for="city" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">City</label>
                                    <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].City.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {hospitalCity}
                                    </div>
                                </div>
                                :
                                <div class="mb-6">
                                    <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">City</label>
                                    <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nCity: e.target.value })}
                                        value={dispatchDetails.nCity} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter City' required />
                                </div>}
                            {/* nState */}
                            {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                <div>
                                    <label for="state" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">State</label>
                                    <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Hospital_Address.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {hospitalState}
                                    </div>
                                </div>
                                :
                                <div class="mb-6">
                                    <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">State</label>
                                    <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nState: e.target.value })}
                                        value={dispatchDetails.nState} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter State' required />
                                </div>}
                            {/* Address */}
                            {dispatchDetails && dispatchDetails.hospitalName && dispatchDetails.hospitalName.length > 0 ?
                                <div>
                                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Address</label>
                                    <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Pincode.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {hospitalAddress}
                                    </div>
                                </div>
                                :
                                <div class="mb-6">
                                    <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Address</label>
                                    <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nAddress: e.target.value })}
                                        value={dispatchDetails.nAddress} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Address' required />
                                </div>}
                        </div>
                        <button type="submit" style={{ backgroundColor: 'rgb(203, 41, 123)' }} onClick={dispatchHandler} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Request Doc</button>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Dispatch