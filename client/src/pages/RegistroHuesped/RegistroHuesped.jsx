import { useNavigate } from "react-router-dom";
import huesped_img from "../../assets/huesped_form.jpg";
import FormHuesped from "../../components/registroHuesped/FormHuesped";
import { useReserva } from "../../context/ReservaContext";
import { useEffect } from "react";

const RegistroHuesped = () => {

    const { datosReserva } = useReserva();
    const navigate = useNavigate();

    //* Verifica que existan datos de reserva, en caso de que no regresa a dicho formulario
    useEffect(() => {
        const DatosReservaIncompletos = Object.values(datosReserva).some(value => !value);
        if (DatosReservaIncompletos) {
            alert("Por favor complete primero el formulario de reserva.");
            navigate("/registroReservas");
        }
    }, []);

    return (
        <div id='contenedor__registroHuesped'>
            <div className='lado__izquierdo'>
                <img src={huesped_img} alt="huesped_img" />
            </div>

            <div className='lado__derecho'>
                <h1 className="titular">registro huésped</h1>

                <FormHuesped />
            </div>
        </div>
    )
}

export default RegistroHuesped