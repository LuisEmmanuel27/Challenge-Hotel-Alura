import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { loginUser } from "../../helper/api";
import Error from "../Error";

const FormLogin = () => {

    const { login } = useAuth();
    const [error, setError] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState(null);
    const [contrasenaUsuario, setContrasenaUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const inputs = document.querySelectorAll("input");
            inputs.forEach(input => input.value = null);
        }, 1000);
    }, []);

    const handleChange = (e) => {
        const value = e.target.id;
        console.log(value);
        value === "nombreUsuario" ?
            setNombreUsuario(e.target.value) :
            setContrasenaUsuario(e.target.value);
    }

    const verificarDatos = (nombre, contrasena, flag) => {

        let statusNom = true;
        let statusContra = true;

        if (nombre === null || nombre === "") {
            document.getElementById("nombreUsuario").classList.add("error");
            statusNom = false;
        }

        if (contrasena === null || contrasena === "") {
            document.getElementById("contrasenaUsuario").classList.add("error");
            statusContra = false;
        }

        if (!statusNom || !statusContra) return flag = false;
        else {
            document.getElementById("nombreUsuario").classList.remove("error");
            document.getElementById("contrasenaUsuario").classList.remove("error");
            return flag = true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let flag = true;

        flag = verificarDatos(nombreUsuario, contrasenaUsuario, flag);
        console.log(flag);

        if (flag === true) {
            // Almacena los valores en variables locales
            const newFormData = {
                nombreUsuario: nombreUsuario,
                contrasenaUsuario: contrasenaUsuario,
            };

            try {
                const user = await loginUser(newFormData);
                login(user);
                navigate('/menuPrincipal');
            } catch (err) {
                setError(true);
                console.log('Error de inicio de sesion: ', err);
            }
        } else {
            console.log("hay datos nulos");
            return;
        }
    }

    return (

        <form className="contenedor__input" onSubmit={handleSubmit}>
            <div className="caja_input">
                <label htmlFor="nombreUsuario">usuario</label>
                <input
                    type="text"
                    id="nombreUsuario"
                    className="usuario"
                    placeholder="Ingresa tu nombre de usuario"
                    autoComplete="off"
                    onChange={handleChange}
                />
            </div>

            <div className="caja_input">
                <label htmlFor="contrasenaUsuario">contraseña</label>
                <input
                    type="password"
                    id="contrasenaUsuario"
                    className="contraseña"
                    placeholder="Ingresa tu contraseña"
                    autoComplete="new-password"
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn__principal" id="btn_login">
                entrar
            </button>

            {error && <Error />}
        </form>
    )
}

export default FormLogin