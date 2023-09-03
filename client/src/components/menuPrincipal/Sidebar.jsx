import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {

    const { logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
    }

    if (!isAuthenticated) {
        return <Navigate to='/' />;
    }

    return (
        <div className='Sidebar__Menu'>
            <div className="logo">
                <img src={logo} alt="logo_hotel" width={"200px"} />
            </div>

            <hr />

            <nav>
                <a href="#">Registro de reservas</a>
                <a href="#">Búsqueda</a>
            </nav>

            <div className="caja_logout">
                <button className="btn__principal" id="btn_logout" onClick={handleLogout}>
                    cerrar sesión
                </button>
            </div>
        </div>
    )
}

export default Sidebar