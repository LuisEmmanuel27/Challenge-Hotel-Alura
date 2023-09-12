import React, { useEffect, useState } from 'react'
import { formatDate } from '../../helper/formatDate';
import { actualizarHuesped } from '../../helper/api';
import toast, { Toaster } from "react-hot-toast";

const TablaHuesped = ({ responseHuesped }) => {

    const [editable, setEditable] = useState(false);
    const [nuevaData, setNuevaData] = useState(null);

    useEffect(() => {
        if (responseHuesped) {
            setNuevaData(responseHuesped);
        }
    }, [responseHuesped]);

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditable(true);
    }

    const handleSaveClick = (e) => {
        e.preventDefault();

        const idHuesped = nuevaData.id; // Asegúrate de que la propiedad sea correcta
        const fechaFormateada = formatDate(nuevaData.fechaNacimiento);
        const datosActualizados = { ...nuevaData, fechaNacimiento: fechaFormateada };

        // Llama a la función actualizarHuesped desde api.js
        actualizarHuesped(idHuesped, datosActualizados)
            .then((response) => {
                console.log(response);
                toast.success("Cambios correctamente guardados", {
                    style: {
                        backgroundColor: "#333",
                        color: "#fff"
                    }
                })
            })
            .catch((error) => {
                console.error('Error en la petición PUT:', error);
                toast.error("Cambios correctamente guardados", {
                    style: {
                        backgroundColor: "red",
                        color: "white"
                    }
                })
            });

        // Luego, puedes deshabilitar la edición
        setEditable(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (e.target.value === "") {
            alert("No puedes dejar el campo vacio");
        }

        setNuevaData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <form className='contenedor_info_huesped contenedor_form'>
            <div className='caja_input'>
                <label htmlFor='nombre'>nombre</label>
                <input
                    id='nombre'
                    name='nombre'
                    type="text"
                    disabled={!editable}
                    value={nuevaData ? nuevaData.nombre : ""}
                    placeholder='nombre del huesped'
                    onChange={handleInputChange}
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='apellido'>apellido</label>
                <input
                    id='apellido'
                    name='apellido'
                    type="text"
                    disabled={!editable}
                    value={nuevaData ? nuevaData.apellido : ""}
                    placeholder='apellido del huesped'
                    onChange={handleInputChange}
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='fechaNacimiento'>fecha de nacimiento</label>
                <input
                    id='fechaNacimiento'
                    name='fechaNacimiento'
                    type="text"
                    disabled
                    value={nuevaData ? formatDate(nuevaData.fechaNacimiento) : ""}
                    placeholder='fecha de nacimiento del huesped'
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='nacionalidad'>nacionalidad</label>
                <input
                    id='nacionalidad'
                    name='nacionalidad'
                    type="text"
                    disabled={!editable}
                    value={nuevaData ? nuevaData.nacionalidad : ""}
                    placeholder='nacionalidad del huesped'
                    onChange={handleInputChange}
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='telefono'>telefono</label>
                <input
                    id='telefono'
                    name='telefono'
                    type="text"
                    disabled={!editable}
                    value={nuevaData ? nuevaData.telefono : ""}
                    placeholder='telefono del huesped'
                    onChange={handleInputChange}
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='numeroReserva'>numero de reservación</label>
                <input
                    id='numeroReserva'
                    name='numeroReserva'
                    type="text"
                    disabled
                    value={nuevaData ? nuevaData.idReserva : ""}
                    placeholder='numero de reservación'
                />
            </div>

            <div className='caja_btn'>
                {editable ? (
                    <button onClick={handleSaveClick}>guardar</button>
                ) : (
                    <button onClick={handleEditClick} disabled={!responseHuesped}>editar</button>
                )}

                <button disabled={!responseHuesped}>eliminar</button>
            </div>

            <Toaster />
        </form>
    )
}

export default TablaHuesped