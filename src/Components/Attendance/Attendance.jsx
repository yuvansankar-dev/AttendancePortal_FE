import { useEffect, useMemo, useRef, useState } from "react";
import "./Attendance.css"
import Dropdown from "../InputComponents/Dropdown/Dropdown";
import DateCell from "./DateCell/DateCell";
import { useSelector } from "react-redux";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import Radiobutton from "../InputComponents/Radiobutton/Radiobutton";
import UserDropdown from "./ConfirmDialog/UserDropdown/UserDropdown";

function Attendance(props) {
    const userDetail = useSelector(state => state.userDetail)
    const [showCalender, setShowCalender] = useState({})
    const [studentsList, setStudentsList] = useState({})
    const [studentLeave, setStudentLeave] = useState({
        leave: {}
    })
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const jwt = sessionStorage.getItem("attendanceJWT")
    const [staffSelection, setStaffSelection] = useState({ operation: { value: "Holiday declaration" } })
    const studentId = useMemo(() => {
        if (staffSelection.studentId?.value) {
            return staffSelection.studentId?.value;
        }
        return userDetail.role === "Student" ? userDetail.userId : false;
    }, [staffSelection.studentId?.value])
    const buttonText = userDetail.role === "Staff" ? staffSelection.operation?.value === "Holiday declaration" ? "Mark as Holiday" : "Mark as Absent" : "Apply Leave";
    const endDate = (userDetail.role === "Staff" && staffSelection.operation?.value === "Mark absent for Student") ? new Date().getTime() : false;
    const [selectedDates, setSelectedDates] = useState([])
    const [selectedMonth, setSelectedMonth] = useState({ selectedMonth: { value: monthNames[new Date().getMonth()], errorMsg: "" } })
    const [applyClicked, setApplyClicked] = useState(false)
    const applyClick = () => {
        if (userDetail.role === "Staff" && staffSelection.operation?.value === "Mark absent for Student" && !staffSelection.studentId?.value) {
            setStaffSelection(pre => { return { ...pre, studentId: { value: "", errorMsg: "Select any one student" } } })
        }
        else { setApplyClicked(true) }
    }
    useEffect(() => {
        if (studentId || studentId && !applyClicked) {
            axios.get(`http://localhost:8000/leave/list/${studentId}`, { headers: { Authorization: "Bearer " + jwt } }).then((res) => {
                setStudentLeave(pre => { return { ...pre, leave: res.data.leaveList } })
            }).catch((res) => {
                console.log(res)
            })
        }
    }, [studentId, applyClicked])
    useEffect(() => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const currentMonth = monthNames.indexOf(selectedMonth.selectedMonth.value)
        changeCalender(currentMonth + 1)
    }, [selectedMonth.selectedMonth.value])
    useEffect(() => {
        setSelectedDates([])
        setStudentLeave({ leave: {} })
        if (staffSelection?.operation?.value === "Mark absent for Student") {
            axios.get("http://localhost:8000/user/list", { headers: { Authorization: "Bearer " + jwt } }).then((res) => {
                setStudentsList(res.data.studentsData);
            }).catch((res) => {
                console.log(res)
            })
        }
    }, [staffSelection?.operation?.value])

    const changeCalender = (month) => {
        const startDate = new Date(`2024-${month}-01`);
        const firstDay = new Date((new Date(`2024-${month}-01`).setDate(2 - startDate.getDay() <= 1 ? 2 - startDate.getDay() : -5))).getDate()
        const indexToStart = startDate.getDay() > 0 ? startDate.getDay() - 1 : 6;
        const currentMonthLastDay = new Date(new Date(`${month < 12 ? "2024" : "2025"}-${month < 12 ? month + 1 : 1}-01`).setDate(0)).getDate();
        setShowCalender((pre) => { return { ...pre, firstDay, indexToStart, currentMonthLastDay } })
        setShowCalender((pre) => {
            let calendanderValues = [];
            let firstDay = pre.firstDay;
            let index = 0;
            let nextMonth = 1;
            function dateState(position) {
                let state = ""
                state += position;
                state += index % 7 === 5 || index % 7 === 6 ? "weekend " : "";
                return state;
            }
            for (let i = 0; i < indexToStart; i++) {
                calendanderValues.push({ [firstDay]: dateState("previous ") });
                firstDay++;
                index++
            }
            for (let i = 1; i <= currentMonthLastDay; i++) {
                calendanderValues.push({ [i]: dateState("current ") });
                index++
            }
            while (index % 7 !== 0) {
                calendanderValues.push({ [nextMonth]: dateState("next ") });
                nextMonth++
                index++
            }
            return { ...pre, calendanderValues };

        })
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="staffOption">
                    {userDetail.role === "Staff" && <div> <Radiobutton label="SELECT OPERATION" keyName="operation" options={["Holiday declaration", "Mark absent for Student"]} data={staffSelection} setData={setStaffSelection} /></div>}
                    <div className="calenderSelector">
                        {userDetail.role === "Staff" && staffSelection?.operation?.value === "Mark absent for Student" && <UserDropdown label="STUDENT" keyName="studentId" options={{ ...studentsList }} allOptions={{ ...studentsList }} data={staffSelection} setData={setStaffSelection} />}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="calenderOption">
                    <div className="calenderSelector">
                        <Dropdown label="MONTH" keyName="selectedMonth" options={[...monthNames]} data={selectedMonth} setData={setSelectedMonth} />
                    </div>
                    <div>
                        <div style={{ fontWeight: "bold" }}>Year</div>
                        <div>2024</div>
                    </div>
                </div>
            </div>
            <div className="dateComponent">
                <div className="calenderGrid">
                    {
                        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => <div className="dayTitle" key={idx}>{day}</div>)
                    }
                    {showCalender.calendanderValues?.map((val, ind) => <DateCell key={ind} value={Object.keys(val)[0]} state={Object.values(val)[0]} selectedDates={selectedDates} setSelectedDates={setSelectedDates} selectedMonth={selectedMonth} endDate={endDate} studentLeave={studentLeave} />)}
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}><div className="calenderOption" style={{ justifyContent: "center" }}>
                <button disabled={!selectedDates.length} onClick={applyClick}>{buttonText}</button>
            </div></div>
            {applyClicked && <ConfirmDialog selectedDates={selectedDates} userId={studentId} setApplyClicked={setApplyClicked} />}
        </>
    )
}
export default Attendance;
