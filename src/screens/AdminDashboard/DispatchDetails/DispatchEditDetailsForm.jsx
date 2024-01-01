import React, { useState } from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/Production.module.css"
import back from "../../../assets/images/back.png";
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { editDispatchDataModel, getSingleHospitalDetails } from '../../../store/action/DispatchDetailsAction';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
function DispatchEditDetailsForm() {
    const [EditDispatch, setEditDispatch] = useState({
        hospital_name: '',
        concerned_person_name: '',
        concerned_person_no: '',
        document_no: '',
        address: '',
        current_date: ''
    })

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceId = urlParams.get('deviceId')
    const serialNo = urlParams.get('serialNO')
    const goBack = () => {
        window.history.go(-1)
    }
    const history = useNavigate();

    // Hpospital Data
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;

    // Single Hpospital Data
    const getHospitalDetailsReducer = useSelector((state) => state.getHospitalDetailsReducer);
    const { data: singleHospitalData } = getHospitalDetailsReducer;
    const singleDataOfHospital = singleHospitalData && singleHospitalData.data
    const hospitalAddress = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Hospital_Address;
    const dispatch = useDispatch()
    var phoneno = /^\d{10}$/
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!EditDispatch.hospital_name) {
            toast.error('Enter Hospital Name')
        }
        else if (!EditDispatch.concerned_person_name) {
            toast.error('Enter Concerned Person Name')
        }
        else if (!EditDispatch.concerned_person_no) {
            toast.error('Enter Concerned Person Number')
        }
        else if (!EditDispatch.concerned_person_no.match(phoneno)) {
            toast.error(`Enter 10 digit not ${EditDispatch.concerned_person_no.toString().length} digit Concerned Number`)
        }
        else if (!EditDispatch.document_no) {
            toast.error('Enter Document Number')
        }
        else if (!EditDispatch.current_date) {
            toast.error('Enter Current Date')
        }
        else if (EditDispatch.hospital_name && EditDispatch.concerned_person_name && EditDispatch.concerned_person_no && EditDispatch.document_no && EditDispatch.current_date) {
            dispatch(editDispatchDataModel({
                deviceId: deviceId,
                hospital_name: EditDispatch.hospital_name,
                address: hospitalAddress,
                document_no: EditDispatch.document_no,
                phone_number: EditDispatch.concerned_person_no,
                concerned_person: EditDispatch.concerned_person_name,
                serial_no: serialNo,
                date_of_dispatch: EditDispatch.current_date,
            }))
            setTimeout(() => {
                history('/dispatchModel')
            }, 1000);
        }
    }
    const navigate = useNavigate();
    const handleAddHospital = () => {
        navigate('/add_hospital')
    }
    return (
        <>
            <Navbar />
            <SideBar />
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                            <Link onClick={goBack} style={{ display: 'block' }}>
                                <img src={back} style={{ width: "3rem", }} />
                            </Link>
                            <h1 className="text-2xl font-extrabold">Edit<small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Dispatch Details</small></h1>
                            <hr style={{ color: "#CB297B" }} />
                        </div>
                        <button onClick={handleAddHospital} style={{ backgroundColor: '#cb297b' }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Hospital</button>
                    </div>
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div className={Style.formItem}>
                                <div>
                                    <label for="state" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial Number</label>
                                    <div style={(serialNo && serialNo.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {serialNo}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="first_name" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</label>
                                    <input list='data' type="text" onChange={(e) => {
                                        setEditDispatch({ ...EditDispatch, hospital_name: e.target.value })
                                        const hospital_name = e.target.value;
                                        dispatch(getSingleHospitalDetails(hospital_name))
                                    }} value={EditDispatch.hospital_name} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                                    <datalist id='data'>
                                        {dataHospital && dataHospital.map((item) => {
                                            return (
                                                <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                                            )
                                        })}
                                    </datalist>
                                </div>

                                <div>
                                    <label for="state" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Document Number</label>
                                    <input onChange={(e) => { setEditDispatch({ ...EditDispatch, document_no: e.target.value }) }} value={EditDispatch.document_no} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Document Number" required />
                                </div>
                                <div>
                                    <label for="district" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">New Dispatch Date</label>
                                    <input type='date' onChange={(e) => { setEditDispatch({ ...EditDispatch, current_date: e.target.value }) }} value={EditDispatch.current_date} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Address" required />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <div>
                                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Contact Number</label>
                                    <input onChange={(e) => { setEditDispatch({ ...EditDispatch, concerned_person_no: e.target.value }) }} type='number' value={EditDispatch.concerned_person_no} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Contact Number" required />
                                </div>
                                <div>
                                    <label htmlFor="first_name" style={{ textAlign: 'start' }} className="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Name</label>
                                    <input onChange={(e) => { setEditDispatch({ ...EditDispatch, concerned_person_name: e.target.value }) }} value={EditDispatch.concerned_person_name} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Name" required />
                                </div>
                                <div>
                                    <label for="district" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Address</label>
                                    <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Pincode.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {hospitalAddress}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                    <div>
                        <hr style={{ color: "#707070" }} />
                        <div className={Style.buttonContainer} >
                            <button className={Style.continuebtn} onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DispatchEditDetailsForm