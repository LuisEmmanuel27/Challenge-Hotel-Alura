import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editarHuesped, eliminarHuesped, eliminarReserva } from "../../helper/api";
import toast, { Toaster } from "react-hot-toast";

const RenglonesHuesped = ({ huespedDatos, setHuespedDatos }) => {

    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleEditChange = (field, value) => {
        const updatedHuespedDatos = { ...huespedDatos, [field]: value };
        setHuespedDatos(updatedHuespedDatos);
    }

    const toggleEdit = async () => {
        if (isEditing) {
            try {
                const formattedFechaNacimiento = formatDate(huespedDatos.fechaNacimiento);
                const updatedHuespedDatos = { ...huespedDatos, fechaNacimiento: formattedFechaNacimiento };

                const data = await editarHuesped(huespedDatos.id, updatedHuespedDatos);

                console.log(data);

                setIsEditing(false);
                toast.success("datos enviados", {
                    style: {
                        backgroundColor: "#333",
                        color: "#fff"
                    }
                })
            } catch (error) {
                console.error('Error al editar el huésped:', error);
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
            const data = await eliminarHuesped(huespedDatos.id);
            const data2 = await eliminarReserva(huespedDatos.idReserva);
            console.log(data, data2);
            toast.success("huésped eliminado", {
                style: {
                    backgroundColor: "#333",
                    color: "#fff"
                }
            })

            setTimeout(() => {
                navigate('/menuPrincipal');
            }, 1000);

        } catch (error) {
            console.error('Error al eliminar el huésped:', error);
            toast.error("error al eliminar huésped", {
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
                    {isEditing ? (
                        <input
                            type='text'
                            value={huespedDatos.nombre}
                            onChange={(e) => handleEditChange('nombre', e.target.value)}
                        />
                    ) : (
                        huespedDatos.nombre
                    )}
                </td>
                <td>
                    {isEditing ? (
                        <input
                            type='text'
                            value={huespedDatos.apellido}
                            onChange={(e) => handleEditChange('apellido', e.target.value)}
                        />
                    ) : (
                        huespedDatos.apellido
                    )}
                </td>
                <td>{isEditing ? 'No editable' : formatDate(huespedDatos.fechaNacimiento)}</td>
                <td>
                    {isEditing ? (
                        <input
                            type='text'
                            value={huespedDatos.nacionalidad}
                            onChange={(e) => handleEditChange('nacionalidad', e.target.value)}
                        />
                    ) : (
                        huespedDatos.nacionalidad
                    )}
                </td>
                <td>
                    {isEditing ? (
                        <input
                            type='text'
                            value={huespedDatos.telefono}
                            onChange={(e) => handleEditChange('telefono', e.target.value)}
                        />
                    ) : (
                        huespedDatos.telefono
                    )}
                </td>
                <td>{isEditing ? 'No editable' : huespedDatos.idReserva}</td>
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

export default RenglonesHuesped