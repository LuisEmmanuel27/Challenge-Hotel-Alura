import React, { useEffect, useState } from 'react'
import RenglonesHuesped from './RenglonesHuesped';
import RenglonesReserva from './RenglonesReserva';

const TablaResultados = ({ responseHuesped, responseReserva }) => {

    const [huespedDatos, setHuespedDatos] = useState(null);
    const [reservaDatos, setReservaDatos] = useState(null);

    useEffect(() => {
        setHuespedDatos(responseHuesped);
        setReservaDatos(responseReserva);
    }, [responseHuesped, responseReserva]);


    return (
        <div className='contenedor__tabla'>
            <div className='resultados__huesped resultados'>

                <h1>Tabla de huésped</h1>

                <table className='huesped tabla'>
                    <thead>
                        <tr>
                            <th>nombre</th>
                            <th>apellido</th>
                            <th>fecha de nacimiento</th>
                            <th>nacionalidad</th>
                            <th>telefono</th>
                            <th>número de reservación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {huespedDatos && <RenglonesHuesped huespedDatos={huespedDatos} setHuespedDatos={setHuespedDatos} />}
                    </tbody>
                </table>
            </div>

            <div className='resultados__reservacion resultados'>

                <h1>Tabla de reservación</h1>

                <table className='reserva tabla'>
                    <thead>
                        <tr>
                            <th>fecha de entrada</th>
                            <th>fecha de salida</th>
                            <th>valor</th>
                            <th>forma de pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservaDatos && <RenglonesReserva reservaDatos={reservaDatos} setReservaDatos={setReservaDatos} />}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablaResultados