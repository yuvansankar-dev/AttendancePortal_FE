import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import "./Notification.css"
import { useEffect } from 'react';
function Notification({ message, success, setToggleInfo, show }) {
    useEffect(() => {
        setTimeout(() => {
            setToggleInfo({})
        }, 10000)
    }, [success])
    return (
        <>
            {show && <div className={success ? 'notificationBar' : "notificationBar errorNotification"}>
                {message}
                {success ? <CheckCircleOutlineTwoToneIcon /> : <HighlightOffRoundedIcon />}
            </div>}
        </>
    )
}
export default Notification;
