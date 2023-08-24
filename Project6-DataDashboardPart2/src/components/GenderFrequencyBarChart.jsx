import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
} from 'chart.js';

Chart.register(BarElement, BarController, CategoryScale, LinearScale);

const GenderFrequencyBarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const chartData = {
    labels: data.map((d) => d.gender),
    datasets: [
      {
        label: 'Frequency',
        data: data.map((d) => d.frequency),
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'category',
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className='graph'>
      <h2 className='graph-title'>Gender Frequency</h2>
      <Bar
        ref={(el) => {
          chartRef.current = el?.chartInstance;
        }}
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default GenderFrequencyBarChart;
