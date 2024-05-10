import { useEffect, useState } from "react";
import Loading from "../childComponent/Loading/Loading";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { assignUserInfo } from "../../Slice/userSlice";
import { assignHolidayInfo } from "../../Slice/holidaySlice";

function Navigation(props) {
    const [state, setLoading] = useState(true)
    const navigate = useNavigate();
    const jwtValue = sessionStorage.getItem("attendanceJWT");
    const userDetail = useSelector(state => state.userDetail)
    const holidayDetail = useSelector(state => state.holidayDetail)
    const dispatch = useDispatch()
    const location = useLocation();
    const currentUrl = location.pathname;

    useEffect(() => {
        if (!Object.keys(userDetail).length) {
            if (jwtValue) {
                axios.get("http://localhost:8000/user/verify", { headers: { Authorization: "Bearer " + jwtValue } }).then((res) => {
                    setLoading(false)
                    dispatch(assignUserInfo(res.data.userData))
                }).catch(res => {
                    setLoading(false)
                    navigate("/login")
                })
            }
            else {
                setLoading(false)
                navigate("/login")
            }
        }
        else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!Object.keys(holidayDetail).length && Object.keys(userDetail).length) {
            axios.get("http://localhost:8000/holiday/list", { headers: { Authorization: "Bearer " + jwtValue } }).then((res) => {
                dispatch(assignHolidayInfo(res.data.holidayList))
            }).catch(res => {
                console.log(res)
            })
        }
    }, [userDetail])
    return (
        <>
            {state ? <Loading /> : <Outlet />}
        </>
    )
}
export default Navigation;