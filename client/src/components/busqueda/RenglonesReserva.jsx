import React, { useState } from 'react'
import { editarReserva, eliminarReserva } from '../../helper/api';
import toast, { Toaster } from "react-hot-toast";

const RenglonesReserva = ({ reservaDatos, setReservaDatos }) => {

    const [isEditing, setIsEditing] = useState(false);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleEditChange = (field, value) => {
        const updatedReservaDatos = { ...reservaDatos, [field]: value };
        setReservaDatos(updatedReservaDatos);
    }

    const toggleEdit = async () => {
        if (isEditing) {
            try {
                const formattedFechaEntrada = formatDate(reservaDatos.fechaEntrada);
                const formattedFechaSalida = formatDate(reservaDatos.fechaSalida);
                const updatedReservaDatos = { ...reservaDatos, fechaEntrada: formattedFechaEntrada, fechaSalida: formattedFechaSalida };

                const data = await editarReserva(reservaDatos.id, updatedReservaDatos);

                console.log(data);

                setIsEditing(false);
                toast.success("datos enviados", {
                    style: {
                        backgroundColor: "#333",
                        color: "#fff"
                    }
                })
            } catch (error) {
                console.error('Error al editar reservación:', error);
                toast.error("error al editar datos", {
                    style: {
                        backgroundColor: "#333",
                        color: "#fff"
                    }
                });
            }
        } else {
            setIsEditing(true);
        }
    }

    const handleDelete = async () => {
        try {
            const data = await eliminarReserva(reservaDatos.id);
            console.log(data);
            toast.success("reserva eliminada", {
                style: {
                    backgroundColor: "#333",
                    color: "#fff"
                }
            })

            setTimeout(() => {
                navigate('/menuPrincipal');
            }, 1000);

        } catch (error) {
            console.error('Error al eliminar reserva:', error);
            toast.error("error al eliminar reserva", {
                style: {
                    backgroundColor: "#333",
                    color: "#fff"
                }
            });
        }
    }

    return (
        <>
            <tr>
                <td>
                    {isEditing ?
                        (
                            <input
                                type='text'
                                value={formatDate(reservaDatos.fechaEntrada)}
                                onChange={(e) => handleEditChange('fechaEntrada', e.target.value)}
                            />) :
                        (formatDate(reservaDatos.fechaEntrada))}
                </td>

                <td>
                    {isEditing ?
                        (
                            <input
                                type='text'
                                value={formatDate(reservaDatos.fechaSalida)}
                                onChange={(e) => handleEditChange('fechaSalida', e.target.value)}
                            />) :
                        (formatDate(reservaDatos.fechaSalida))}
                </td>

                <td>
                    {isEditing ?
                        (
                            <input
                                type='text'
                                value={reservaDatos.valor}
                                onChange={(e) => handleEditChange('valor', e.target.value)}
                            />) :
                        (reservaDatos.valor)}
                </td>

                <td>
                    {isEditing ?
                        (
                            <input
                                type='text'
                                value={reservaDatos.formaPago}
                                onChange={(e) => handleEditChange('formaPago', e.target.value)}
                            />) :
                        (reservaDatos.formaPago)}
                </td>

            </tr>
            <tr className="btn__caja">
                <td>
                    <button className="editar" onClick={toggleEdit}>{isEditing ? 'Guardar' : 'Editar'}</button>
                </td>

                <td>
                    <button className='eliminar' onClick={handleDelete}>eliminar</button>
                </td>

                <td><Toaster /></td>
            </tr>
        </>
    )
}

export default RenglonesReserva