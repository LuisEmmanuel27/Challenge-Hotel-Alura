import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { loginUser } from "../../helper/api";

const FormLogin = () => {

    const { login, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({ nombreUsuario: '', contrasenaUsuario: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombreUsuario = e.target[0].value;
        const contrasenaUsuario = e.target[1].value;
        setFormData({ nombreUsuario: nombreUsuario, contrasenaUsuario: contrasenaUsuario });

        try {
            const user = await loginUser(formData);
            login(user);
            navigate('/menuPrincipal');
        } catch (error) {
            console.log('Error de inicio de sesion: ', error);
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/menuPrincipal" />;
    }

    return (
        <form className="contenedor__input" onSubmit={handleSubmit}>
            <div className="caja_input">
                <label htmlFor="usuario">usuario</label>
                <input
                    type="text"
                    id="usuario"
                    className="usuario"
                    placeholder="Ingresa tu nombre de usuario"
                    autocomplete="off"
                />
            </div>

            <div className="caja_input">
                <label htmlFor="password">contraseña</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    autocomplete="new-password"
                />
            </div>

            <button type="submit" className="btn__principal" id="btn_login">
                entrar
            </button>
        </form>
    )
}

export default FormLogin