import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { BsCalendarCheck } from "react-icons/bs";
import { TbUserSearch } from "react-icons/tb";

const Sidebar = () => {

    const handleLogout = () => {
        localStorage.clear();
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
                    <Link to="/registroReservas">Registro de reservas</Link>
                </div>

                <div className="btn_nav">
                    <TbUserSearch />
                    <a href="#">Búsqueda</a>
                </div>
            </nav>

            <div className="caja_logout">
                <Link to="/login">
                    <button className="btn__principal" id="btn_logout" onClick={handleLogout}>
                        cerrar sesión
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar