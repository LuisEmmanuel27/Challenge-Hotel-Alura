import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return element;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;