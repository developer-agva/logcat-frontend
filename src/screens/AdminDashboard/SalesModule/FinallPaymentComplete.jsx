import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newDeviceAction } from "../../../store/action/DeviceAction";
import { addPaymentUpdatesAction } from "../../../store/action/ProjectAction";
import axios from "axios";

const FinallPaymentComplete = ({ paymentAllData, leadId }) => {
    const [formData, setFormData] = useState({
        paymentReceived: "",
        deviceSerialNo: [],
        advanceAmount: "",
        paymentMode: "",
        nextPaymentDate: "",
        paymentTerms: null,
        deviceId: []
    });
    console.log('leadId', leadId)
    const [deviceInput, setDeviceInput] = useState(""); // State for input field
    const [showDropdown, setShowDropdown] = useState(false);
    const newDeviceReducer = useSelector((state) => state.newDeviceReducer);
    const { data: deviceIdData, error } = newDeviceReducer;
    useEffect(() => {
        dispatch(newDeviceAction({ page: 1, limit: 100, projectCode: '007' }));
    }, []);
    const handleDeviceSelect = (deviceId) => {
        setFormData((prev) => ({ ...prev, deviceId: [...prev.deviceId, deviceId] }));
        setDeviceInput("");
        setShowDropdown(false);
    };
    const filteredDevices = deviceIdData?.data?.data?.filter(device =>
        device.deviceId.toLowerCase().includes(deviceInput.toLowerCase())
    ) || [];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent overwriting `deviceSerialNo` array with a string
        if (name === "deviceSerialNo") return;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };



    const handleDeviceInputChange = (e) => {
        let value = e.target.value;
        if (value === "") {
            setShowDropdown(false)
            setDeviceInput('');
            return;
        }
        else {
            setDeviceInput(e.target.value);
            setShowDropdown(true)
            return;
        }
    };

    const handleDeviceKeyDown = (e) => {
        if (e.key === "Enter" && deviceInput.trim() !== "") {
            e.preventDefault();
            setFormData({ ...formData, deviceId: [...formData.deviceId, deviceInput.trim()] });
            setDeviceInput(""); // Clear input field
        }
    };
    // Handle Enter Key Press for Serial Number
    const handleSerialNoKeyPress = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();

            setFormData((prev) => ({
                ...prev,
                deviceSerialNo: Array.isArray(prev.deviceSerialNo)
                    ? [...prev.deviceSerialNo, e.target.value.trim()]
                    : [e.target.value.trim()]
            }));

            // e.target.value = ""; // Clear input field after adding
        }
    };


    const removeDeviceId = (index) => {
        setFormData({
            ...formData,
            deviceId: formData.deviceId.filter((_, i) => i !== index)
        });
    };

    // Remove Serial Number
    const removeSerialNo = (index) => {
        setFormData((prev) => ({
            ...prev,
            deviceSerialNo: prev.deviceSerialNo.filter((_, i) => i !== index)
        }));
    };

    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const generatePdfAndUploadToS3 = async () => {
        if (!selectedImage) {
            alert('Please select a file');
            return;
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('file', selectedImage);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/s3/upload-visiting-card`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setPdfUrl(response?.data?.location);
            alert('Uploaded successful')
            setLoading(false)
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPaymentUpdatesAction({
            serialNumbers: formData?.deviceSerialNo,
            deviceIds: formData?.deviceId,
            paymentReceived: formData?.paymentReceived,
            advanceAmount: formData?.advanceAmount,
            paymentMode: formData?.paymentMode,
            nextPaymentDate: formData?.nextPaymentDate,
            paymentTerms: formData?.paymentTerms,
            leadId: leadId,
            paymentImageUrl: pdfUrl
        }))
    };
    const classCss = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5';
    const lableCss = 'block mb-2 text-sm font-medium text-gray-900';
    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">UPDATE - PAYMENT</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-4">
                {/* devie ID */}
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Device Id</label>
                    <input type="text"
                        placeholder="Enter Device Id"
                        value={formData?.deviceId}
                        onChange={handleDeviceInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {showDropdown === true ?
                        <div style={{ height: '15rem' }} className="absolute bg-white border-2 border-dotted border-gray-400 rounded-lg shadow-lg w-full mt-1 overflow-y-auto">
                            {filteredDevices.length > 0 ? (
                                filteredDevices?.map((device, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="px-2 py-2 hover:bg-gray-100 cursor-pointer font-mono text-lg tracking-wide transform hover:scale-105"
                                            onClick={() => handleDeviceSelect(device.deviceId)}
                                        >
                                            {device.deviceId}
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="px-2 py-1 text-gray-500 font-mono text-lg tracking-wide transform hover:scale-105">No results found</div>
                            )}
                        </div>
                        : ''}
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData?.deviceId?.map((id, index) => (
                            <span key={index} className="bg-blue-200 text-blue-700 px-3 py-1 rounded-md flex items-center">
                                {id}
                                <button type="button" onClick={() => setFormData({ ...formData, deviceId: formData.deviceId.filter((_, i) => i !== index) })} className="ml-2 text-red-600 font-bold">×</button>
                            </span>
                        ))}
                    </div>
                </div>
                {/* Dispatched From */}
                <div>
                    <label for="concerned_person_name"
                        class={lableCss}
                    >Payment Terms</label>
                    <input type="text"
                        name="paymentTerms"
                        placeholder="Enter Payment Terms"
                        value={formData.paymentTerms}
                        onChange={handleChange}
                        class={classCss}
                        required />
                </div>
                {/* Device Serial No. */}
                <div className="col-span-1">
                    <label class={lableCss}>Device Serial No.</label>
                    <input
                        type="text"
                        name="deviceSerialNo"
                        placeholder="Enter Serial Number"
                        onKeyPress={handleSerialNoKeyPress} // Capture enter key
                        onKeyDown={handleDeviceKeyDown}
                        className={classCss}
                    />

                    <div className="mt-2">
                        {formData?.deviceSerialNo?.map((serial, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-200 p-1 rounded mt-1">
                                <span>{serial}</span>
                                <button
                                    type="button"
                                    className="text-red-500 text-sm"
                                    onClick={() => removeSerialNo(index)}
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Docket No. */}
                <div className="col-span-1">
                    <label class={lableCss}>Payment Received Amount</label>
                    <input
                        type="text"
                        name="paymentReceived"
                        placeholder="Enter Payment Received"
                        value={formData.paymentReceived}
                        onChange={handleChange}
                        class={classCss}
                    />
                </div>
                {/* Expected Delivery Date */}
                <div className="col-span-1">
                    <label class={lableCss}>Next Payment Date</label>
                    <input
                        type="date"
                        name="nextPaymentDate"
                        value={formData.nextPaymentDate}
                        onChange={handleChange}
                        class={classCss}
                    />
                </div>
                {/* Delivery Via */}
                <div className="col-span-1">
                    <label class={lableCss}>Payment Mode</label>
                    <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleChange}
                        class={classCss}
                    >
                        <option value="">Select (UPI, Check, NEFT)</option>
                        <option value="UPI">UPI</option>
                        <option value="Check">Check</option>
                        <option value="NEFT">NEFT</option>
                    </select>
                </div>
                {/* Delivery Note (File Upload) */}
                <div className="col-span-1">
                    <label class={lableCss}>Payment Proof</label>
                    <div className="flex flex-column gap-2">
                        <input type="file" name="visitingCard" onChange={handleImageSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <button type="button" onClick={generatePdfAndUploadToS3} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-pink-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100">{loading === true ? 'Loading...' : 'Upload Payment Proof'}</button>
                    </div>
                </div>
                {/* Submit Button */}
                <div className="col-span-2 flex justify-start">
                    <button type="submit" className="bg-pink-800 text-white px-4 py-2 rounded-lg w-full">
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    );
};
export default FinallPaymentComplete;