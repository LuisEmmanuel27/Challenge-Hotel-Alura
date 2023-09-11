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
                        {huespedDatos && <RenglonesHuesped huespedDatos={huespedDatos} />}
                    </tbody>
                </table>

                <div className='btn__caja'>
                    <button className='editar'>editar</button>
                    <button className='eliminar'>eliminar</button>
                </div>
            </div>

            <div className='resultados__reservacion resultados'>
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
                        {reservaDatos && <RenglonesReserva reservaDatos={reservaDatos} />}
                    </tbody>
                </table>

                <div className='btn__caja'>
                    <button className='editar'>editar</button>
                    <button className='eliminar'>eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default TablaResultados