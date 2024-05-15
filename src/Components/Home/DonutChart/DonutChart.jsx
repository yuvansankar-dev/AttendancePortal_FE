import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';

const DonutChart = ({ workingDays, weekEndCount, holidayCount, leaveCount }) => {
    const data = {
        labels: ["Working Days", "WeekEnd Count", "Holiday Count", "Leave Count"],
        datasets: [
            {
                label: 'Day Count',
                data: [workingDays, weekEndCount, holidayCount, leaveCount],
                backgroundColor: [
                    "#f2ddb5", "#b0a083", "darkgreen", "darkred"
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Day Count Donut Chart',
            },
        },
    };
    ChartJS.register(ArcElement, Tooltip, Legend);

    return <Doughnut data={data} options={options} />;
};

export default DonutChart;
