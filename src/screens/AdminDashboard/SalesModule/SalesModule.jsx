import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDemoDeviceCountAction, getDemoDeviceGraphCount } from '../../../store/action/ProjectAction';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import AgVaMiniDevices from '../../device/AgVaMiniDevices';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);
const SalesModule = () => {
    const getSalesDemoDeviceCountReducer = useSelector((state) => state.getSalesDemoDeviceCountReducer);
    const { data: countData } = getSalesDemoDeviceCountReducer;

    const getDemoDeviceGraphCountReducer = useSelector((state) => state.getDemoDeviceGraphCountReducer);
    const { data: graphCount } = getDemoDeviceGraphCountReducer;
    console.log('graphCount', graphCount)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDemoDeviceCountAction());
        dispatch(getDemoDeviceGraphCount())
    }, [dispatch]);
    const options = useMemo(() => ({
        plugins: {
            title: {
                display: true,
            },
        },
        responsive: true,
        scales: {
            x: { grid: { display: false }, stacked: true },
            y: { grid: { display: false }, stacked: true },
        },
    }), []);
    const labels = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], []);
    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: '',
                data: [26, 35, 45, 48, 34, 35, 42, 13, 45, 46, 35, 35],
                backgroundColor: 'rgb(76, 187, 23)',
                borderRadius: 0,
            },
            {
                label: '',
                data: [23, 24, 35, 45, 23, 53, 12, 43, 52, 35, 65, 24],
                backgroundColor: 'rgb(211, 211, 211)',
                borderRadius: 4,
            },
        ],
    }), [labels]);
    const data2 = useMemo(() => ({
        labels: ['Production', 'Demo', 'Sales', 'Total'],
        datasets: [
            {
                data: [graphCount?.data?.productionCount, graphCount?.data?.demoCount,graphCount?.data?.salesCount,graphCount?.data?.totalDeviceCount],
                backgroundColor: ["rgb(152, 0, 76)", "rgb(54, 162, 235)","green", "grey"],
                borderRadius: 8,
                hoverOffset: 4,
            },
        ],
    }), []);
    return (
        <div className="flex-1 p-6">
            <div className="grid grid-cols-5 shadow rounded-lg p-2">
                {[
                    { color: "bg-gray-300", label: "TOTAL DEVICES", value: countData?.data?.totalDeviceCount },
                    { color: "bg-green-600", label: "ACTIVE IN 24 HOUR", value: countData?.data?.activeLast24Hours },
                    { color: "bg-yellow-300", label: "ACTIVE IN 7 DAYS", value: countData?.data?.activeLast7Days },
                    { color: "bg-red-300", label: "INACTIVE IN 7 DAYS", value: countData?.data?.inactiveLast7Days },
                    { color: "bg-blue-300", label: "PRODUCTION", value: countData?.data?.productionCount },
                ].map((item, index) => (
                    <div key={index} className="bg-white p-4 text-center flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className={`rounded h-3 w-3 ${item.color}`} />
                            <h2 className="text-gray-600">{item.label}</h2>
                        </div>
                        <p className="text-4xl font-bold text-gray-500">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-16 mt-6">
                <div className="line_chart">
                    <div className="flex items-center justify-between">
                        <h2 className="text-gray-600">DEMO DEVICE GRAPH</h2>
                        <div className="flex gap-4 p-2">
                            <div className="flex gap-2 items-center"><span className="rounded h-2 w-2 bg-green-600"></span>ACTIVE</div>
                            <div className="flex gap-2 items-center"><span className="rounded h-2 w-2 bg-gray-300"></span>TOTAL</div>
                        </div>
                    </div>
                    <div className="lineChart_data">
                        <Bar data={data} options={options} />
                    </div>
                </div>

                <div style={{ boxShadow: ' 0px 5px 30px #0000001a', borderRadius: '15px' }} >

                    <div className='doughnut_chart'>
                        <h2 className="text-gray-600">CHART</h2>
                        <div className="doughnut_data">
                            <Pie data={data2} />
                            <div className='flex justify-between p-4'>
                                <div className='flex gap-2 items-center'><span className='rounded h-2 w-2 bg-red-800'></span>PRODUCTION</div>
                                <div className='flex gap-2 items-center'><span className='rounded h-2 w-2 bg-blue-600'></span>DEMO</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <AgVaMiniDevices />
            </div>
        </div>
    );
};

export default SalesModule;
