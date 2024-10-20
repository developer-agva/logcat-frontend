import React, {useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux';
import { getTicketCountAction } from '../../../store/action/StoreSystem';

function SupportBarDoughnutChart() {
    const [state, setState] = useState(0);
    const getTicketCountReducer = useSelector((state) => state.getTicketCountReducer);
    const { data: countData } = getTicketCountReducer;
    const barData=countData?.data2?.map((item)=>item)
    const dispatch = useDispatch();
    console.log('barData', countData?.data2)
    // Bar chart data
    const data1 = {
        labels: ['Jan'],
        datasets: [{
            label: 'Monthly Data',
            data: barData?.[0],
            fill: true,
            borderColor: 'red',
            tension: 0.1,
            backgroundColor:'#98004c'
        }]
    };
    const options1 = {
        scales: {
            x: {
                type: 'category',
                title: { display: true, text: '' },
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 15,
            },
        },
    };

    // Doughnut chart data
    const data = {
        labels: ['Open', 'Hold', 'Closed'],
        datasets: [{
            label: '# of Votes',
            data: [countData?.openTickets, countData?.onHold, countData?.closedTickets],
            backgroundColor: ['#E10000', '#FFC700', '#009855'],
            borderWidth: 6,
            hoverOffset: 6,
            borderRadius: 10,
        }],
    };

    const options = {
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
            },
        },
    };

    const handleChange = () => {
        if (state === 0) {
            setState(1)
            let filter = "12month-data"
            dispatch(getTicketCountAction(filter))
        } else {
            setState(0)
            let filter = ""
            dispatch(getTicketCountAction(filter))
        }
    };
    return (
        <div style={{ width: "20%", display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
            <select onChange={handleChange} style={{ border: '0px', padding: '8px', boxShadow: 'rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', borderRadius: '8px', display: 'inline', width: '150px' }}>
                <option value="doughnutChart">Doughnut Chart</option>
                <option value="barChart">Bar Chart</option>
            </select>
            {state === 1 ?
                <Bar data={data1} options={options1} style={{ display: 'block', width: '550px', height: '280px' }} width='560' height='560' />
                :
                <Doughnut data={data} options={options} style={{ display: 'block', width: '280px', height: '280px' }} width='560' height='560' />
            }
        </div>
    )
}

export default SupportBarDoughnutChart