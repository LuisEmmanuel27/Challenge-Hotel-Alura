import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) return element;
    else return <Navigate to="/login" />;

}

export default ProtectedRoute;