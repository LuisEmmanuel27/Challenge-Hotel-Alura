import { useState } from 'react'
import SelectParametroBusqueda from '../../components/busqueda/SelectParametroBusqueda';
import logo from "../../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";
import { obtenerHuesped, obtenerReserva } from '../../helper/api';
import TablaHuesped from '../../components/busqueda/TablaHuesped';
import TablaReserva from '../../components/busqueda/TablaReserva';

const Busqueda = () => {

    const [selectedParametro, setSelectedParametro] = useState(null);
    const [responseHuesped, setResponseHuesped] = useState(null);
    const [responseReserva, setResponseReserva] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedParametro || !e.target[1].value) {
            toast.error("No seleccionaste o escribiste un valor de búsqueda", {
                style: {
                    backgroundColor: "#333",
                    color: "#fff"
                }
            });

            return;
        }

        try {
            const valorBusqueda = e.target[1].value;

            if (selectedParametro.value === "huespedRe") {
                const responseHuesped = await obtenerHuesped(selectedParametro.value, valorBusqueda);
                const idReserva = responseHuesped.idReserva; // Obtener el ID del huésped
                setResponseHuesped(responseHuesped);
                setResponseReserva(await obtenerReserva(idReserva)); // Obtener datos de reserva con el ID del huésped
            } else {
                const responseHuesped = await obtenerHuesped(selectedParametro.value, valorBusqueda);
                const idReserva = responseHuesped.idReserva; // Obtener el ID del huésped
                setResponseHuesped(responseHuesped);
                setResponseReserva(await obtenerReserva(idReserva)); // Obtener datos de reserva con el ID del huésped
            }

            toast.success("datos enviados", {
                style: {
                    backgroundColor: "#333",
                    color: "#fff"
                }
            })
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            toast.error("Error, por favor verifique los datos enviados", {
                style: {
                    backgroundColor: "#333",
                    color: "#fff"
                }
            });
        }
    }

    return (
        <div id='contenedor__busqueda'>
            <div className='area__superior'>
                <div className='logo_titulo'>
                    <div className='logo'>
                        <img src={logo} alt="logo_hotel" />
                    </div>

                    <h1 className='titular'>sistema de búsqueda</h1>
                </div>

                <form onSubmit={handleSubmit} className='contenedor_form'>

                    <SelectParametroBusqueda selectedParametro={selectedParametro} setSelectedParametro={setSelectedParametro} />

                    <div className='caja_input'>
                        <input type="text" placeholder='Ingresa el valor a buscar' />
                        <button type="submit" id='btn_busqueda' className='btn__principal'>buscar</button>
                    </div>
                </form>
            </div>

            <div className='area__inferior'>
                <TablaHuesped responseHuesped={responseHuesped} />
                <TablaReserva responseReserva={responseReserva} />
            </div>

            <Toaster />
        </div>
    )
}

export default Busqueda