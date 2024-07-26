import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = (props) => {
    const { title,dataa,labels ,mapdata, yaxis , newdataa ,label, newlable, dateArr, newDatelable, newDate, medicineLable, indexOfMedicine} = props;
  const datasets = [
    {
      label: label,
      data: dataa,
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.1)',
      xAxisID: 'x',
    },
    {
      label: newlable ? newlable : '',
      data: newdataa,
      borderColor: newlable ? 'red' : 'white',
      backgroundColor: newlable ? 'rgba(255, 0, 0, 0.1)' : 'white',
      xAxisID: 'x',
    },
    {
      label: labels?.medicineData[0]?.name ?? '',
      data: dateArr?.[0] ?? [],
      borderColor: medicineLable ? 'green' : 'white',
      backgroundColor: medicineLable ? 'rgba(255, 0, 0, 0.1)' : 'white',
      xAxisID: 'x',
    },
    {
      label: labels?.medicineData[indexOfMedicine]?.name ?? '',
      data: dateArr?.[indexOfMedicine] ?? [],
      borderColor: medicineLable ? 'purple' : 'white',
      backgroundColor: medicineLable ? 'rgba(255, 0, 0, 0.1)' : 'white',
      xAxisID: 'x',
    },
    {
      label: medicineLable ? '' : '',
      data: [0, 20, 40, 60, 80, 100],
      borderColor: medicineLable ? 'white' : 'white',
      backgroundColor: medicineLable ? 'white' : 'white',
      yAxisID: 'y',
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title ?? '',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
    },
  };

  return <Line data={{ labels: yaxis, datasets }} options={options} />;
};

export default ChartComponent;
