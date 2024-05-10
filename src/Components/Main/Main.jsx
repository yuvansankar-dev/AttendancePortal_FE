import "./Main.css"
import image from "../../assets/AttendanceLogo.jpg"
import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
function Main(props) {
    const menuRef = useRef()
    const [isMenuClick, setIsMenuClick] = useState(false);
    const location = useLocation();
    const currentUrl = location.pathname;
    const [tabInfo, setTabInfo] = useState({ tabs: { "Home": "/", "Attendance Detail": "/attendance", "User Detail": "/userdetail" } })
    const navigate = useNavigate()
    const tabChange = useCallback((tabName) => {
        if (tabName !== tabInfo.selected) {
            setTabInfo((pre) => { return { ...pre, selected: tabName } });
            navigate(tabInfo.tabs[tabName])
        }
        setIsMenuClick(false)
    }, [tabInfo])
    useEffect(() => {
        setTabInfo((pre) => {
            const selected = Object.keys(pre.tabs)[Object.values(pre.tabs).indexOf(currentUrl)]
            return { ...pre, selected }
        })
    }, [])

    useEffect(() => {
        const closeTab = (e) => {
            (!document.getElementById("tabs").contains(e.target)) && setIsMenuClick(false)
        }
        document.addEventListener("mousedown", closeTab)
        return () => {
            document.removeEventListener("mousedown", closeTab)
        }
    }, [])
    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="menuIconContainer" onClick={() => setIsMenuClick(pre => !pre)} ref={menuRef}>
                        <span className="menuIcon"></span>
                        <span className="menuIcon"></span>
                        <span className="menuIcon"></span>
                    </div>
                    <div className="attendanceTitle">
                        <img src={image} className="headerImg" />
                        <h2>Attendance portal</h2>
                    </div>
                    <div className="tabs" id="tabs" style={isMenuClick ? { left: "0px" } : {}}>
                        {Object.keys(tabInfo.tabs).map((tab,idx) => <div key={idx} className={tabInfo.selected === tab ? "tab tabSelected" : "tab"} onClick={() => tabChange(tab)}>{tab}</div>)}
                    </div>
                </div>
                <Outlet />
            </div >


        </>
    )
}
export default Main;
