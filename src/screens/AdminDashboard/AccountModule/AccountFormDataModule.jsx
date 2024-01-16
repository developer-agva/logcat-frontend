import React, { useEffect, useState } from 'react'
import NavBarForAll from '../../../utils/NavBarForAll'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Style from "../../../css/AccountFormData.module.css"
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import back from "../../../assets/images/back.png";
import { Button, Card, Checkbox, Label, TextInput, Radio } from 'flowbite-react';
import e from 'cors';
import { getDataBySerialNumberAccountAction, postAccountDataWithFile } from '../../../store/action/DispatchDetailsAction';

function AccountFormDataModule() {
    const [accountData, setAccountData] = useState({
        billedTo: '',
        consigneName: '',
        consigneAddress:'',
        invoiceNumber: '',
        ewayNumber: '',
        document_ref_no: ''
    })
    const [selectedImageInvoice, setSelectedImageInvoice] = useState(null);
    const [selectedImageEway, setSelectedImageEway] = useState(null);
    const dispatch = useDispatch();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serialNo = urlParams.get("serialNo");

    const [invoiceSelect, setinvoiceSelect] = useState(false)
    const [ewaybillSelect, setewaybillSelect] = useState(false)

    const getAccountDataBySerialNumberReducer = useSelector((state) => state.getAccountDataBySerialNumberReducer);
    const { loading, data } = getAccountDataBySerialNumberReducer;
    const getDispatchData = data && data.data
    console.log('getDispatchData', getDispatchData)
    useEffect(() => {
        dispatch(getDataBySerialNumberAccountAction(serialNo))
    }, [dispatch])
    const [pdfUrl, setPdfUrl] = useState('');
    const [loadinState, setLoadingState] = useState(false)

    const generateInvoiceFile = async (e) => {
        e.preventDefault()
        setinvoiceSelect(true)
        if (!selectedImageInvoice) {
            toast.error('Please select a (Invoice) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImageInvoice);
        var invoiceNumber = accountData.invoiceNumber;
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/logger/upload-invoice-file/${serialNo}/${invoiceNumber}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded Invoice File')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };

    const generateEwayFile = async (e) => {
        e.preventDefault()
        // setewaybillSelect(true)
        if (!selectedImageEway) {
            toast.error('Please select a (E-way) file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedImageEway);
        var ewayBill = accountData.ewayNumber;
        try {
            setLoadingState(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/logger/upload-ewaybill-file/${serialNo}/${ewayBill}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setewaybillSelect(true)
            setTimeout(() => {
                setLoadingState(false)
            }, 500);
            setPdfUrl(response.data.pdfUrl);
            toast.success('Uploaded E-way bill')
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };

    const handleSubmitData = (e) => {
        e.preventDefault();
        if (!accountData.billedTo) {
            toast.error('Enter Billed To')
        }
        else if (!accountData.invoiceNumber) {
            toast.error('Enter Invoice Number')
        }
        else if (!accountData.ewayNumber) {
            toast.error('Enter Eway Bill Number')
        }
        else if (invoiceSelect == false) {
            toast.error('Please upload invoice file')
        }
        else if (ewaybillSelect == false) {
            toast.error('Please upload E-way bill file')
        }
        else if (!accountData.document_ref_no) {
            toast.error('Enter Document Number')
        }
        else if (accountData.billedTo && accountData.document_ref_no && accountData.ewayNumber && accountData.invoiceNumber) {
            dispatch(postAccountDataWithFile({
                seriallNo: serialNo,
                ewaybillNo: accountData.ewayNumber,
                billedTo: accountData.billedTo,
                consinee: accountData.consigneName,
                consigneeAddress:accountData.consigneAddress,
                invoiceNo: accountData.invoiceNumber,
                document_ref_no: accountData.document_ref_no,
            }))

        }
    }
    const handleImageSelectInvoice = (event) => {
        setSelectedImageInvoice(event.target.files[0]);
    };
    const handleImageSelectEWay = (event) => {
        setSelectedImageEway(event.target.files[0]);
    };
    const goBack = () => {
        window.history.go(-1)
    }
    return (
        <div>
            <Toaster />
            <NavBarForAll />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem", }} />
                        </Link>
                        <h1 class="text-2xl font-extrabold">Accounts<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                        <hr style={{ color: "#CB297B" }} />
                    </div>
                    <form>
                        <div>
                            <div
                                style={{ width: '100%' }}
                            >
                                <Card
                                >
                                    <form className='flex gap-12 flex-wrap'>
                                        <div className="flex flex-col gap-4">
                                            <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Serial Number :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{serialNo}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Person Name :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.concerned_person}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Concerned Email</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.concerned_person_email}</h5>
                                            </section>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Document No. :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.document_no}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>GST No. :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.gst_number}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Marketing Lead :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.marketing_lead}</h5>
                                            </section>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Purpose :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.purpose}</h5>
                                            </section>

                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Pin Code :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.pincode}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Address :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchData && getDispatchData.dispatchData.address}</h5>
                                            </section>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Hospital Name :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.hospitalName}</h5>
                                            </section>

                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Manuf. Date:</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.manufacturingDate}</h5>
                                            </section>
                                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ width: '9rem', textAlign: 'start' }}>Dispatch Date :</span>
                                                <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchDate}</h5>
                                            </section>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <form class="w-full">
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Billed To</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, billedTo: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Billed To" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Consignee Name <span>(Optional)</span></label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, consigneName: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Consignee Name" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Consignee Address <span>(Optional)</span></label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, consigneAddress: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Consignee Address" required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Documment Ref. Number</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, document_ref_no: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Document No." required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invoice Number</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, invoiceNumber: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Invoice Number" required />
                                                </div>
                                            </form>
                                            <div class="mb-2" style={{ textAlign: 'start' }}>
                                                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Invoice File</label>
                                                <div class="flex gap-2 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                                    <input type="file" onChange={handleImageSelectInvoice} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" required />
                                                    <button style={{ width: '20%', height: '3rem', color: 'white' }} class="bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5" onClick={generateInvoiceFile} >
                                                        upload invoice file
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <form class="w-full">
                                                <div class="mb-2">
                                                    <label for="invoice" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-way Bill Number</label>
                                                    <input type="text" onChange={(e) => {
                                                        setAccountData({ ...accountData, ewayNumber: e.target.value })
                                                    }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter E-way bill number" required />
                                                </div>
                                            </form>
                                            <div class="mb-2" style={{ textAlign: 'start' }}>
                                                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 :text-white">E-way Bill File</label>
                                                <div class="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                                    <input type="file" onChange={handleImageSelectEWay} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" required />
                                                    <button style={{ width: '20%', height: '3rem', color: 'white' }} class="bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800" onClick={generateEwayFile} >
                                                        Upload E-way bill
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="submit" onClick={handleSubmitData} style={{ backgroundColor: 'rgb(203, 41, 123)' }} class="text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                                </Card >
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountFormDataModule