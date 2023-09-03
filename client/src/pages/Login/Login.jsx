import React from 'react'
import FormLogin from '../../components/login/FormLogin'
import logo from '../../assets/logo.png';
import hotelLogin from "../../assets/hotel_login.jpg";

const Login = () => {
    return (
        <div id="contenedor__login">
            <div className="lado__izquierdo">
                <div className="logo">
                    <img src={logo} alt="logo_hotel" />
                </div>

                <h1 className="titular">iniciar sesión</h1>

                <FormLogin />
            </div>

            <div className="lado__derecho">
                <img src={hotelLogin} alt="hotel_login" />
            </div>
        </div>
    )
}

export default Login