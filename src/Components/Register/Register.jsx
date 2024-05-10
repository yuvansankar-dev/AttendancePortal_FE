import "./Register.css"
import TextInput from "../InputComponents/TextInput/TextInput";
import { useCallback, useRef, useState } from "react";
import Dropdown from "../InputComponents/Dropdown/Dropdown";
import Radiobutton from "../InputComponents/Radiobutton/Radiobutton";
import axios from "axios";
import Loading from "../childComponent/Loading/Loading";
import { useNavigate } from "react-router-dom";
import Notification from "../childComponent/Notification/Notification";

function Register(props) {
    const [registerInfo, setRegisterInfo] = useState({});
    const [loading, setLoading] = useState(false)
    const [toggleInfo, setToggleInfo] = useState({})
    const navigate = useNavigate()

    const registerClick = useCallback(() => {
        let errorAccured = false;
        if (!registerInfo.role.value) {
            errorAccured = true;
            setRegisterInfo((pre) => {
                pre.role.errorMsg = "Role should not be empty"
                return { ...pre }
            })
        }
        if (!registerInfo.gender.value) {
            errorAccured = true;
            setRegisterInfo((pre) => {
                pre.gender.errorMsg = "Gender should not be empty"
                return { ...pre }
            })
        }
        if (!registerInfo.userId.value) {
            errorAccured = true;
            setRegisterInfo((pre) => {
                pre.userId.errorMsg = "User ID should not be empty"
                return { ...pre }
            })
        }
        if (!registerInfo.firstName.value) {
            errorAccured = true;
            setRegisterInfo((pre) => {
                pre.firstName.errorMsg = "First Name should not be empty"
                return { ...pre }
            })
        }
        if (!registerInfo.lastName.value) {
            errorAccured = true;
            setRegisterInfo((pre) => {
                pre.lastName.errorMsg = "Last Name should not be empty"
                return { ...pre }
            })
        }
        if (registerInfo.password.value.length < 8) {
            errorAccured = true;
            setRegisterInfo((pre) => {
                pre.password.errorMsg = "Password should be greater than 8 character"
                return { ...pre }
            })
        }
        if (registerInfo.confirmPassword.value !== registerInfo.password.value) {
            errorAccured = true;
            setRegisterInfo((pre) => {
                pre.confirmPassword.errorMsg = "Password and Confirm password should be Equal"
                return { ...pre }
            })
        }
        if (errorAccured === false) {
            setLoading(true)
            const payloadData = {
                userId: registerInfo.userId.value,
                firstName: registerInfo.firstName.value,
                lastName: registerInfo.lastName.value,
                gender: registerInfo.gender.value,
                role: registerInfo.role.value,
                password: registerInfo.password.value,
            }
            //Login check API call
            axios.post("http://localhost:8000/user/register", payloadData).then(res => {
                setLoading(false)
                res.data.msg ? setToggleInfo({ msg: res.data.msg, success: true }) : setToggleInfo({ msg: res.data.errMsg, success: false })
                navigate("/login")
            }).catch(() => {
            setLoading(false)
                setToggleInfo({ msg: res.data.errMsg, success: false })
            })
        }
    }, [registerInfo])

    return (
        <>
            <div className="imageContainer">
                <div className="loginCard">
                    <h2>Register</h2>
                    <Radiobutton label="ROLE" keyName="role" options={["Staff", "Student"]} data={registerInfo} setData={setRegisterInfo} />
                    <Dropdown label="GENDER" keyName="gender" options={["Male", "Female", "other"]} data={registerInfo} setData={setRegisterInfo} />
                    <TextInput label="FIRST NAME" keyName="firstName" setData={setRegisterInfo} data={registerInfo} />
                    <TextInput label="LAST NAME" keyName="lastName" setData={setRegisterInfo} data={registerInfo} />
                    <TextInput label="USER ID" keyName="userId" setData={setRegisterInfo} data={registerInfo} />
                    <TextInput label="PASSWORD" keyName="password" setData={setRegisterInfo} data={registerInfo} isPassword={true} />
                    <TextInput label="CONFIRM PASSWORD" keyName="confirmPassword" setData={setRegisterInfo} data={registerInfo} isPassword={true} />
                    <button disabled={loading} onClick={registerClick}>Register</button>
                </div>
                {loading && <Loading />}
                {<Notification setToggleInfo={setToggleInfo} show={Boolean(Object.keys(toggleInfo).length)} message={toggleInfo.msg} success={toggleInfo.success} />}
            </div>
        </>
    )
}
export default Register;
