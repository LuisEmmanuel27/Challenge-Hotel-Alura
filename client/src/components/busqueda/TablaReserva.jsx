import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from '../../helper/formatDate';
import { actualizarReserva } from '../../helper/api';
import toast, { Toaster } from "react-hot-toast";

const TablaReserva = ({ responseReserva }) => {
    const [editable, setEditable] = useState(false);
    const [nuevaData, setNuevaData] = useState(null);
    const [nuevoValor, setNuevoValor] = useState(null);

    useEffect(() => {
        if (responseReserva) {
            setNuevaData(responseReserva);
        }
    }, [responseReserva]);

    useEffect(() => {
        if (nuevaData && nuevaData.fechaEntrada && nuevaData.fechaSalida) {
            const fechaEntrada = nuevaData.fechaEntrada;
            const fechaSalida = nuevaData.fechaSalida;

            const unDia = 24 * 60 * 60 * 1000;
            const noches = Math.round(Math.abs(fechaSalida - fechaEntrada) / unDia);

            const costePorNoche = 800;
            const total = noches * costePorNoche;
            // Formatea el número con comas
            const formattedTotal = total.toLocaleString();

            setNuevoValor(formattedTotal);
        } else {
            setNuevoValor(0);
        }
    }, [nuevaData]);

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditable(true);
    }

    const handleSaveClick = (e) => {
        e.preventDefault();

        const idReserva = nuevaData.id;
        const fechaEntradaFormateada = formatDate(nuevaData.fechaEntrada);
        const fechaSalidaFormateada = formatDate(nuevaData.fechaSalida);
        const datosActualizado = { ...nuevaData, fechaEntrada: fechaEntradaFormateada, fechaSalida: fechaSalidaFormateada };

        actualizarReserva(idReserva, datosActualizado)
            .then((response) => {
                console.log(response);
                toast.success("Cambios correctamente guardados", {
                    style: {
                        backgroundColor: "#333",
                        color: "#fff"
                    }
                })
            }).catch((error) => {
                console.error('Error en la petición PUT:', error);
                toast.error("Cambios correctamente guardados", {
                    style: {
                        backgroundColor: "red",
                        color: "white"
                    }
                })
            })

        setEditable(false);
    }

    const handleInputChange = (name, value) => {
        setNuevaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form className='contenedor_info_reserva contenedor_form'>
            <div className='caja_input'>
                <label htmlFor='fechaEntrada'>fecha de check in</label>
                <DatePicker
                    id='fechaEntrada'
                    name='fechaEntrada'
                    selected={nuevaData?.fechaEntrada ? nuevaData.fechaEntrada : null}
                    onChange={(date) => handleInputChange('fechaEntrada', date)}
                    minDate={new Date()} // Esto bloquea las fechas pasadas
                    dateFormat='yyyy-MM-dd' // Formato de visualización
                    timeInputLabel='Hora:'
                    showTimeInput={false} // Deshabilitar la entrada de tiempo
                    disabled={!editable}
                    placeholderText='fecha chek in'
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='fechaSalida'>fecha de check out</label>
                <DatePicker
                    id='fechaSalida'
                    name='fechaSalida'
                    selected={nuevaData?.fechaSalida ? nuevaData.fechaSalida : null}
                    onChange={(date) => handleInputChange('fechaSalida', date)}
                    minDate={
                        nuevaData?.fechaEntrada
                            ? (() => {
                                const fechaEntrada = new Date(nuevaData.fechaEntrada);
                                fechaEntrada.setDate(fechaEntrada.getDate() + 1); // Sumar un día
                                return fechaEntrada;
                            })()
                            : null
                    }
                    dateFormat='yyyy-MM-dd'
                    timeInputLabel='Hora:'
                    showTimeInput={false}
                    disabled={!editable}
                    placeholderText='fecha check out'
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='valor'>valor de reservación</label>
                <input
                    id='valor'
                    name='valor'
                    type="text"
                    disabled
                    value={nuevoValor === null ? '' : nuevoValor}
                    onChange={(e) => handleInputChange('valor', e.target.value)}
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='formaPago'>forma de pago</label>
                <input
                    id='formaPago'
                    name='formaPago'
                    type="text"
                    disabled
                    value={nuevaData ? nuevaData.formaPago : ""}
                    placeholder='forma de pago'
                    onChange={(e) => handleInputChange('formaPago', e.target.value)}
                />
            </div>

            <div className='caja_btn'>
                {editable ? (
                    <button onClick={handleSaveClick}>guardar</button>
                ) : (
                    <button onClick={handleEditClick} disabled={!responseReserva}>editar</button>
                )}

                <button disabled={!responseReserva}>eliminar</button>
            </div>

            <Toaster />
        </form>
    )
}

export default TablaReserva;
