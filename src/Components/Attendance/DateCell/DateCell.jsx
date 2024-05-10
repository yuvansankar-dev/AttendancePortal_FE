import { useEffect } from "react";
import "./DateCell.css"
import { useSelector } from "react-redux";
function DateCell({ value, state, selectedDates, setSelectedDates, selectedMonth, endDate, studentLeave }) {
    const holidayDetail = useSelector(state => state.holidayDetail)
    const currentCellEpoch = new Date(`2024-${selectedMonth.selectedMonth.value}-${value}`).getTime()
    state += !endDate || endDate && currentCellEpoch <= endDate ? "" : "disable "
    state += studentLeave?.leave?.[currentCellEpoch] && state.includes("current") ? "disable leave " : "";
    state += holidayDetail[currentCellEpoch] && state.includes("current") ? "disable holiday " : "";
    let title = holidayDetail[currentCellEpoch] ?? studentLeave?.leave?.[currentCellEpoch] ?? "";
    title = title ? title : state.includes("weekend") ? "weekend" : ""

    const inputChange = () => {
        setSelectedDates((pre) => {
            const index = pre.indexOf(currentCellEpoch);
            if (index === -1) {
                return [...pre, currentCellEpoch]
            }
            else {
                return pre.toSpliced(index, 1);
            }
        })
    }
    return (
        <div className="DateCell" title={title}>
            <div className={"dayValue " + state} >{value}</div>
            <input type="checkbox" onChange={inputChange} checked={selectedDates.includes(currentCellEpoch)} />
        </div>
    )
}
export default DateCell;
