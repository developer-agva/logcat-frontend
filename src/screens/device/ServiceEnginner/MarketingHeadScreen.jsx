import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ServiceModuleNavBar from './ServiceModuleNavBar'
import { MdAssignment } from "react-icons/md";
import { getTotalCalculationDataAction } from '../../../store/action/ServiceEngAction';
import { useDispatch, useSelector } from 'react-redux';
function MarketingHeadScreen() {
    const dispatch=useDispatch();

    const getTotalCountReducer = useSelector((state) => state.getTotalCountReducer);
    const { data } = getTotalCountReducer;
    console.log('data', data)
    useEffect(()=>{
        dispatch(getTotalCalculationDataAction())
    },[])
    return (
        <div>
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                <div
                    class="px-3 py-3 lg:px-5 lg:pl-3"
                    style={{ backgroundColor: "#cb297b" }}
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start">
                            <Link
                                to="/marketing_head_screen"
                                class="flex ml-2 md:mr-24"
                                style={{ textDecoration: "none" }}
                            >
                                <span
                                    style={{ color: "white" }}
                                    class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"
                                >
                                    AgVa Healthcare
                                </span>
                            </Link>
                        </div>
                        <div class="flex items-center">
                            <div class="flex items-center ml-3">
                                <ServiceModuleNavBar />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="p-6" style={{ marginTop: '4rem'}}>
                <Link to='/assign_user_marketing' class="d-flex g-2 align-items-center text-center block max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow text-decoration-none">
                <MdAssignment size={25} color='black'/>
                    <h5 class="text-2xl tracking-tight text-gray-900" style={{marginLeft:'1rem'}}>Assign Target</h5>
                </Link>
            </div>
            <div class="p-6">
                <Link to='/single_user_count' style={{display:'flex',flexDirection:'column'}} class="d-flex align-items-center text-center block max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow text-decoration-none">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <h5 class="text-2xl tracking-tight text-gray-900">Total Demo</h5>
                        <h6>{data?.data?.[0]?.totalDemo}</h6>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <h5 class="text-2xl tracking-tight text-gray-900">Total Demo Done</h5>
                        <h6>{data?.data?.[0]?.totalDemoDone}</h6>
                    </div>
                </Link>
            </div>
            <div class="p-6">
                <Link to='/single_user_count'style={{display:'flex',justifyContent:'space-between'}} class="d-flex align-items-center text-center block max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow text-decoration-none">
                    <h5 style={{marginBottom:'0.5rem'}} class=" text-2xl tracking-tight text-gray-900">Total Sold</h5>
                    <h6>{data?.data?.[0]?.totalSales}</h6>
                </Link>
            </div>
            <div class="p-6">
                <Link to='/single_user_count'style={{display:'flex',justifyContent:'space-between'}} class="d-flex align-items-center text-center block max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow text-decoration-none">
                    <h5 style={{marginBottom:'0.5rem'}} class=" text-2xl tracking-tight text-gray-900">Total Expense</h5>
                    <h6>{data?.data?.[0]?.totalExpense}</h6>
                </Link>
            </div>
        </div>
    )
}

export default MarketingHeadScreen