import "./CountCard.css"
function CountCard({dayCount,title}) {
    return (
        <>
            <div className="countCard">
                <h3 className="countTitle">{title}</h3>
                <div>{(dayCount ?? "-") + " Days"}</div>
            </div>
        </>
    )
}
export default CountCard;
