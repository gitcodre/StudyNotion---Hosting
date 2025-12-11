import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const{token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    if(token !== null)
    {
        return children;
    }
    return navigate('/');
}

export default ProtectedRoute