import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import "./TextInput.css";

function TextInput({ label, keyName, data, setData, isPassword }) {

    const [show, setShow] = useState(!isPassword)
    const errorMsg = data[keyName]?.errorMsg;

    const changeInputData = (e) => {
        setData((pre) => {
            return {
                ...pre, [keyName]: {
                    value: e?.target?.value ?? "", errorMsg: ""
                }
            }
        })
    }

    useEffect(() => {
        changeInputData();
    }, [])

    return (
        <div>
            <div className="inputBox">
                <input type={show ? "text" : "password"} required="required" className="inputTag" style={errorMsg ? { borderColor: "red" }:{}} value={data[keyName]?.value ?? ""} onChange={changeInputData} />
                <label className="inputLabel" >{label}</label>
                {isPassword && (show ? <FontAwesomeIcon icon={faEye} className="passwordIcon" onClick={() => setShow(false)} />
                    : <FontAwesomeIcon icon={faEyeSlash} className="passwordIcon" onClick={() => setShow(true)} />)}
            </div>
            <div className='errorMsg'>{errorMsg}</div>
        </div>
    )
}
export default TextInput;
