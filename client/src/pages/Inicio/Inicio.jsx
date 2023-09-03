import { Link } from 'react-router-dom';
import muestraHotel from '../../assets/hotel-registration.jpg';
import logo from '../../assets/logo.png';
import iconoUsuario from '../../assets/useri-icon.png';

const Inicio = () => {
    return (
        <div id="contenedor__inicio">
            <div className="lado__izquierdo">
                <img
                    src={muestraHotel}
                    alt="muestra_hotel"
                />
            </div>

            <div className="lado__derecho">
                <div className="logo">
                    <img src={logo} alt="logo_hotel" />
                </div>

                <div className="caja_boton_login">

                    {/* Modificar este enlace */}
                    <Link to="/login" className="btn_login">Login</Link>

                    <div className="icono">
                        <img
                            src={iconoUsuario}
                            alt="icono_usuario"
                        />
                    </div>
                </div>

                <div className="creditos">
                    <span>
                        Aplicación desarrollada por: Luis Emmanuel Ramírez
                        Fernández
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Inicio