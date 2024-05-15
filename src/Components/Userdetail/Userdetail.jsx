import { useDispatch, useSelector } from "react-redux";
import "./Userdetail.css"
import { useNavigate } from "react-router-dom";
import { logout } from "../../Slice/userSlice";

function Userdetail(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.userDetail)
    const logoutClick = () => {
        sessionStorage.removeItem("attendanceJWT");
        dispatch(logout())
        navigate("/login")
    }

    return (
        <>
            <div className="userDetailMain">
                <div className="userDetailContainer">
                    <div className="userDetail">
                        <div className="userDetailTitle">
                            USER ID
                        </div>
                        <div className="userDetailColon">
                            :
                        </div>
                        <div className="userDetailValue">
                            {userDetail?.userId}
                        </div>
                    </div>
                    <div className="userDetail">
                        <div className="userDetailTitle">
                            NAME
                        </div>
                        <div className="userDetailColon">
                            :
                        </div>
                        <div className="userDetailValue">
                            {userDetail?.firstName + " " + userDetail?.lastName}
                        </div>
                    </div>
                    <div className="userDetail">
                        <div className="userDetailTitle">
                            GENDER
                        </div>
                        <div className="userDetailColon">
                            :
                        </div>
                        <div className="userDetailValue">
                            {userDetail?.gender}
                        </div>
                    </div>
                    <div className="userDetail">
                        <div className="userDetailTitle">
                            ROLE
                        </div>
                        <div className="userDetailColon">
                            :
                        </div>
                        <div className="userDetailValue">
                            {userDetail?.role}
                        </div>
                    </div>

                </div>
            </div>
            <div className="logout" onClick={logoutClick}><button>Logout</button></div>
        </>
    )
}
export default Userdetail;
