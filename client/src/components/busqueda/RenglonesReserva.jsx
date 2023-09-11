import React from 'react'

const RenglonesReserva = ({ reservaDatos }) => {

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <tr>
            <td>{formatDate(reservaDatos.fechaEntrada)}</td>
            <td>{formatDate(reservaDatos.fechaSalida)}</td>
            <td>{reservaDatos.valor}</td>
            <td>{reservaDatos.formaPago}</td>
        </tr>
    )
}

export default RenglonesReserva