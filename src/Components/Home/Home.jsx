import { useEffect, useState } from "react";
import CountCard from "../childComponent/CountCard/CountCard";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Home.css"

function Home(props) {
    const userDetail = useSelector(state => state.userDetail)
    const [dayCount, setDayCount] = useState({})
    const jwt = sessionStorage.getItem("attendanceJWT")
    useEffect(() => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date();
        const difference = endDate.getTime() - startDate.getTime();
        setDayCount((pre) => { return { ...pre, totalDays: Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1 } })
        const firstWeekDays = startDate.getDay() <= 1 ? 1 - startDate.getDay() : 8 - startDate.getDay()
        const lastWeekDays = 0 - endDate.getDay()
        startDate.setDate(startDate.getDate() + firstWeekDays)
        endDate.setDate(endDate.getDate() + lastWeekDays)
        const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1);
        const weeksDifference = Math.ceil(daysDifference / 7);
        const firstLeave = firstWeekDays <= 2 ? firstWeekDays : 2;
        const lastLeave = lastWeekDays >= -5 ? 0 : 1;
        setDayCount((pre) => { return { ...pre, weekEndCount: (weeksDifference * 2) + firstLeave + lastLeave } });
        let apiCalls = []
        apiCalls.push(axios.get("http://localhost:8000/holiday/count", {
            headers: {
                Authorization: "Bearer " + jwt
            }
        }))
        if (userDetail.role === "Student") {
            apiCalls.push(axios.get(`http://localhost:8000/leave/count/${userDetail.userId}`, {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            }))
        }
        Promise.all(apiCalls).then((res) => {
            setDayCount((pre) => { return { ...pre, holidayRequestCount: res[0].data.requestCount } });
            setDayCount((pre) => { return { ...pre, holidayTakenCount: res[0].data.takenCount } });
            setDayCount((pre) => { return { ...pre, workingDays: pre.totalDays - pre.weekEndCount - res[0].data.takenCount } });

            if (userDetail.role === "Student") {
                setDayCount((pre) => { return { ...pre, leaveTakenCount: res[1].data.takenCount } });
                setDayCount((pre) => { return { ...pre, leaveRequestCount: res[1].data.requestCount } });
                setDayCount((pre) => { return { ...pre, attendedDays: pre.workingDays - res[1].data.takenCount } });
            }
        }).catch((res) => {
            console.log(res)
        })
    }, [])

    return (
        <>
            <div className="countCardContainer">
                <div style={{marginBottom:"30px"}}><h3 className="note">This counts are from 01/01/2024 to today</h3><div className="info">No of days bewtween 01/01/2024 - today : {dayCount.totalDays}</div></div>
                <div></div>

                <CountCard dayCount={dayCount.workingDays} title="Total Working days" />
                <CountCard dayCount={dayCount.weekEndCount} title="Total Weekend count" />
                <CountCard dayCount={dayCount.holidayTakenCount} title="Number of holidays granted in past" />
                <CountCard dayCount={dayCount.holidayRequestCount} title="Number of holidays to be offered in the future" />
                {userDetail.role === "Student" &&
                    <>
                        <CountCard dayCount={dayCount.leaveTakenCount} title="Total Leave taken count" />
                        <CountCard dayCount={dayCount.leaveRequestCount} title="Total Leave requested count" />
                        <CountCard dayCount={dayCount.attendedDays} title="Totally attended day count" />
                    </>}
            </div>
        </>
    )
}
export default Home;
