import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

function BarChart(props) {
    const jwt = sessionStorage.getItem("attendanceJWT")
    const [leaveDetail, setLeaveDetail] = useState([])
    useEffect(() => {
        axios.get(`https://attendanceportal-be.onrender.com/leave/monthlyCount`, { headers: { Authorization: "Bearer " + jwt } }).then((res) => {
            setLeaveDetail(res.data.leaveList)
        }).catch((res) => {
            console.log(res)
        })
    }, [])
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Leave Count',
                data: leaveDetail,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Bar Chart',
            },
        },
    };

    return (
        <>
            {Boolean(leaveDetail?.length) && <Bar data={data} options={options} />}
        </>
    )
}
export default BarChart;