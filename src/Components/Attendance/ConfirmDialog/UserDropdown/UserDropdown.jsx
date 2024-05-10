import { useEffect, useMemo, useRef, useState } from "react";
import downArrow from "../../../../assets/Downarrow.svg"

function UserDropdown({ label, keyName, options, allOptions, data, setData }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const selectedStudentName = allOptions[data[keyName]?.value]
    delete options[data[keyName]?.value]
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
        changeInputData();
        return () => {
            setData((pre) => {
                return {
                    ...pre, [keyName]: {
                        value: "", errorMsg: ""
                    }
                }
            })
        }
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
        result += selectedStudentName && "withValue ";
        result += data[keyName]?.errorMsg && "withError ";
        return result;
    })
    return (
        <div style={{ position: "relative" }}>
            <div className={dropdownState} id="dropdownPart" onClick={() => setDropdownOpen(pre => !pre)}>
                <img src={downArrow} />
                <span id="dropdownLabel" >{label}</span>
                {selectedStudentName && <span className="valueText">{selectedStudentName}</span>}
            </div>
            {dropdownOpen &&
                <div className="options" id="optionsPart">
                    {Object.entries(options).map((option, idx) =>
                        <div key={idx} >{Boolean(idx) && <hr />}<div className="option" onClick={() => changeInputData(option[0])}>{option[1]}</div>
                        </div>
                    )}
                </div>}
            <div className='errorMsg'>{data[keyName]?.errorMsg}</div>
        </div>
    )
}
export default UserDropdown;