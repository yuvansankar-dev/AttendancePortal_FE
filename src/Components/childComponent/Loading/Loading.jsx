import CircularProgress from '@mui/material/CircularProgress';
import "./Loading.css"
function Loading(props) {
    return (
        <div className='loading'>
            <CircularProgress /><div>Loading...</div>
        </div>
    )
}
export default Loading;