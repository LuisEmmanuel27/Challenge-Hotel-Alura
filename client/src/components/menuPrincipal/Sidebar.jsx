import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import { BsCalendarCheck } from "react-icons/bs";
import { TbUserSearch } from "react-icons/tb";

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
                <img src={logo} alt="logo_hotel" />
            </div>

            <hr />

            <nav>
                <div className="btn_nav">
                    <BsCalendarCheck />
                    <a href="#">Registro de reservas</a>
                </div>

                <div className="btn_nav">
                    <TbUserSearch />
                    <a href="#">Búsqueda</a>
                </div>
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