import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRoutesProps {
    children: React.ReactElement;
}

export default function ProtectedRoutes({children}: ProtectedRoutesProps) {
    const isAuthenticated = useSelector((state: any)=> state.user.value.isAuthenticated);
    if(!isAuthenticated){
        return <Navigate to="/signin" replace />
    }else{
        return children
    }
    
}