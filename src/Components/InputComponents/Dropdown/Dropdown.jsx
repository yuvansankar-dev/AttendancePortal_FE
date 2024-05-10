import { useEffect, useMemo, useState } from "react";
import downArrow from "../../../assets/Downarrow.svg"
import "./Dropdown.css"
function Dropdown({ label, keyName, options, data, setData }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const index = options.indexOf(data[keyName]?.value)
    index !== -1 && options.splice(index, 1)
    const changeInputData = (selectedOption) => {
        selectedOption && setDropdownOpen(false)
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
    useEffect(() => {
        const handleClickOutside = (event) => {

            if (
                document.getElementById("optionsPart") &&
                !document.getElementById("optionsPart").contains(event.target) &&
                !document.getElementById("dropdownPart").contains(event.target)
            ) {
                setDropdownOpen(false)
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setDropdownOpen]);

    const dropdownState = useMemo(() => {
        let result = "dropdown "
        result += dropdownOpen ? "open " : "close "
        result += data[keyName]?.value && "withValue ";
        result += data[keyName]?.errorMsg && "withError ";
        return result;
    })
    return (
        <div style={{ position: "relative" }}>
            <div className={dropdownState} id="dropdownPart" onClick={() => setDropdownOpen(pre => !pre)}>
                <img src={downArrow} />
                <span id="dropdownLabel" >{label}</span>
                {data[keyName]?.value && <span className="valueText">{data[keyName]?.value}</span>}
            </div>
            {dropdownOpen &&
                <div className="options" id="optionsPart">
                    {options.map((option, idx) =>
                        <div key={idx} >{Boolean(idx) && <hr />}<div className="option" onClick={() => changeInputData(option)}>{option}</div>
                        </div>
                    )}
                </div>}
            <div className='errorMsg'>{data[keyName]?.errorMsg}</div>
        </div>
    )
}
export default Dropdown;
