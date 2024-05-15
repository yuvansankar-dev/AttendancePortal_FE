import { useEffect } from "react";
import './Radiobutton.css'

function Radiobutton({ label, keyName, options, data, setData }) {
    const changeInputData = (selectedOption) => {
        setData((pre) => {
            return {
                ...pre, [keyName]: {
                    value: selectedOption ?? "", errorMsg: ""
                }
            }
        })
    }

    useEffect(() => {
        changeInputData(data[keyName]?.value);
    }, [])

    return (
        <>
            <div className="radioTitle">{label}</div><div className="radioList">
                {options.map((val) =>
                    <div key={val} className="radioOption"><input className="radio" defaultChecked={false} type="radio" id={val} name={label} onClick={() => changeInputData(val)} checked={data[keyName]?.value===val}/>
                        <label className="radioLabel" htmlFor={val}>{val}</label></div>
                )}</div>

            <div className='errorMsg'>{data[keyName]?.errorMsg}</div>
        </>
    )
}
export default Radiobutton;
