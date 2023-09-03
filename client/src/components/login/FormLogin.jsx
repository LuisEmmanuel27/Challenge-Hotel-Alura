import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const FormLogin = () => {

    const { login, isAuthenticated } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
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
                    name="usuario"
                    className="usuario"
                    placeholder="Ingresa tu nombre de usuario"
                />
            </div>

            <div className="caja_input">
                <label htmlFor="password">contraseña</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                />
            </div>

            <button type="submit" className="btn__principal" id="btn_login">
                entrar
            </button>
        </form>
    )
}

export default FormLogin