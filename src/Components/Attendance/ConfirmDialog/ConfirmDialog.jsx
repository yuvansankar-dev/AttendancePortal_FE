import { useEffect, useState } from "react";
import TextInput from "../../InputComponents/TextInput/TextInput";
import "./ConfirmDialog.css"
import axios from "axios";
import { useDispatch } from "react-redux";
import { assignHolidayInfo } from "../../../Slice/holidaySlice";

function ConfirmDialog({ selectedDates, userId, setApplyClicked, setSelectedDates }) {
    const [leaveInfo, setLeaveInfo] = useState({ reason: { value: "", errorMsg: "" } });
    const jwtValue = sessionStorage.getItem("attendanceJWT");
    const dispatch = useDispatch()

    const sumbitClicked = () => {
        if (userId) {
            axios.post("https://attendanceportal-be.onrender.com/leave/apply", {
                userId,
                selectedDates,
                reason: leaveInfo.reason.value,
            }, { headers: { Authorization: "Bearer " + jwtValue } }).then(() => {
                setApplyClicked(false)
                setSelectedDates([])
            }).catch(() => {
                setApplyClicked(false)
            })
        }
        else {
            axios.post("https://attendanceportal-be.onrender.com/holiday/apply", {
                selectedDates,
                reason: leaveInfo.reason.value,
            }, { headers: { Authorization: "Bearer " + jwtValue } }).then(() => {
                setApplyClicked(false)
                setSelectedDates([])
                axios.get("https://attendanceportal-be.onrender.com/holiday/list", { headers: { Authorization: "Bearer " + jwtValue } }).then((res) => {
                    dispatch(assignHolidayInfo(res.data.holidayList))
                }).catch(res => {
                    console.log(res)
                })
            }).catch(() => {
                setApplyClicked(false)
            })
        }
    }
    useEffect(() => {
        const closeDialog = (e) => {
            !document.getElementById("dialogBox").contains(e.target) && setApplyClicked(false)
        }
        document.addEventListener("mousedown", closeDialog)
        return () => {
            document.removeEventListener("mousedown", closeDialog)
        }
    })
    return (
        <>
            <div className="parentLayer">
                <div className="dialogParent" id="dialogBox">
                    <TextInput label="Reason for Leave" keyName="reason" setData={setLeaveInfo} data={leaveInfo} />
                    <button onClick={sumbitClicked} disabled={!leaveInfo.reason.value}>Submit</button>
                </div>
            </div>
        </>
    )
}
export default ConfirmDialog;