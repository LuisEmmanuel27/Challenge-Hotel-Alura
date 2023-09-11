const RenglonesHuesped = ({ huespedDatos }) => {

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <tr>
            <td>{huespedDatos.nombre}</td>
            <td>{huespedDatos.apellido}</td>
            <td>{formatDate(huespedDatos.fechaNacimiento)}</td>
            <td>{huespedDatos.nacionalidad}</td>
            <td>{huespedDatos.telefono}</td>
            <td>{huespedDatos.idReserva}</td>
        </tr>
    )
}

export default RenglonesHuesped