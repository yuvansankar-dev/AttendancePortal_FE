import { useSelector } from "react-redux";
import "./Userdetail.css"

function Userdetail(props) {
    const userDetail = useSelector(state => state.userDetail)

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
                        {userDetail?.firstName + " "+userDetail?.lastName}
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
        </>
    )
}
export default Userdetail;
