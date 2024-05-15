import "./Login.css"
import TextInput from "../InputComponents/TextInput/TextInput";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../childComponent/Loading/Loading";
import Notification from "../childComponent/Notification/Notification";
import axios from "axios";
import { useDispatch } from "react-redux";
import { assignUserInfo } from "../../Slice/userSlice";

function Login(props) {
    const [loginInfo, setLoginInfo] = useState({});
    const [loading, setLoading] = useState(false)
    const [toggleInfo, setToggleInfo] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sumbitClick = useCallback(() => {
        if (!loginInfo.userId) {
            setLoginInfo((pre) => {
                pre.userId.errorMsg = "User ID should not be empty"
                return { ...pre }
            })
        }
        else if (loginInfo.password.value.length < 8) {
            setLoginInfo((pre) => {
                pre.password.errorMsg = "Password should be minimum 8 character"
                return { ...pre }
            })
        }
        else {
            setLoading(true)
            const payloadData = {
                userId: loginInfo.userId.value,
                password: loginInfo.password.value,
            }
            axios.post("https://attendanceportal-be.onrender.com/user/login", payloadData).then(res => {
                setLoading(false)
                dispatch(assignUserInfo(res.data.userData))
                sessionStorage.setItem("attendanceJWT", res.data.jwt)
                res.data.msg ? setToggleInfo({ msg: res.data.msg, success: true }) : setToggleInfo({ msg: res.data.errMsg, success: false })
                navigate("/")
            }).catch((res) => {
                setLoading(false)
                setToggleInfo({ msg: res?.response?.data?.errMsg ?? res.message, success: false })
            })
        }
    }, [loginInfo])

    return (
        <>
            <div className="imageContainer">
                <div className="loginCard">
                    <h2>Login</h2>
                    <TextInput label="USER ID" keyName="userId" setData={setLoginInfo} data={loginInfo} />
                    <TextInput label="PASSWORD" keyName="password" setData={setLoginInfo} data={loginInfo} isPassword={true} />
                    <div className="registerAccount" onClick={() => navigate("/register")}>Register Account</div>
                    <button onClick={sumbitClick}>Sumbit</button>
                </div>
                {loading && <Loading />}
                {<Notification setToggleInfo={setToggleInfo} show={Boolean(Object.keys(toggleInfo).length)} message={toggleInfo.msg} success={toggleInfo.success} />}
            </div>
        </>
    )
}
export default Login;
