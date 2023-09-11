import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import SelectNacionalidad from "./SelectNacionalidad";
import { useReserva } from "../../context/ReservaContext";
import { useFormValidation } from "../../hook/useFormValidation";
import { crearHuesped } from "../../helper/api";
import toast, { Toaster } from 'react-hot-toast';

const FormHuesped = () => {

    const {

        nombre,
        setNombre,
        apellido,
        setApellido,
        fechaNacimiento,
        setFechaNacimiento,
        nacionalidad,
        setNacionalidad,
        telefono,
        setTelefono,
        errorNombre,
        errorApellido,
        errorFechaNacimiento,
        errorNacionalidad,
        errorTelefono,
        validarFormulario

    } = useFormValidation();

    const { datosHuesped } = useReserva();
    const navigate = useNavigate();

    // TODO Falta el envio de datos con ayuda del context
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formularioValido = validarFormulario();

        if (!formularioValido) {
            alert("Error en el formulario");
        } else {
            // Construye el objeto de datos del huésped
            const datosHuespedNuevo = {  // Cambia el nombre de la variable a datosHuespedNuevo
                nombre,
                apellido,
                fechaNacimiento: fechaNacimiento.toISOString().split('T')[0],
                nacionalidad: nacionalidad.label,
                telefono,
                idReserva: datosHuesped.idReserva, // Asegúrate de ajustar esto según cómo tengas la referencia a la reserva
            };

            console.log(datosHuespedNuevo);

            try {
                const response = await crearHuesped(datosHuespedNuevo);

                if (response) {
                    // Maneja la respuesta según tus necesidades
                    console.log('Huesped creado con éxito:', response);

                    toast.success('Huésped agregado', {
                        position: "bottom-right",
                        style: {
                            backgroundColor: "#333",
                            color: "#fff",
                            border: "solid 1px #fff",
                        }
                    });

                    // Puedes redirigir o realizar otras acciones aquí
                    setTimeout(() => {
                        navigate('/menuPrincipal');
                    }, 1000);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
                toast.error('Error al agregar huésped', {
                    position: "bottom-right",
                    style: {
                        backgroundColor: "red",
                        color: "#fff",
                        border: "solid 1px #fff"
                    }
                });
            }
        }
    };

    return (
        <form className="contenedor__input" onSubmit={handleSubmit}>
            <div className="caja_input">
                <label htmlFor="nombre_huesped">nombre</label>
                <input
                    type="text"
                    id="nombre_huesped"
                    placeholder="Ingrese el nombre del huesped"
                    onChange={e => setNombre(e.target.value)}
                />
                {errorNombre && <p className="error">{errorNombre}</p>}
            </div>

            <div className="caja_input">
                <label htmlFor="apellido_huesped">apellido</label>
                <input
                    type="text"
                    id="apellido_huesped"
                    placeholder="Ingrese el apellido del huesped"
                    onChange={e => setApellido(e.target.value)}
                />
                {errorApellido && <p className="error">{errorApellido}</p>}
            </div>

            <div className="caja_input">
                <label htmlFor="fecha_born">fecha de nacimiento</label>
                <ReactDatePicker
                    id='fecha_born'
                    selected={fechaNacimiento}
                    onChange={(date) => setFechaNacimiento(date)}
                    maxDate={new Date()} // Esto bloquea las fechas pasadas
                    dateFormat="dd/MM/yyyy" // Formato de visualización
                    isClearable // Agrega un botón para borrar la fecha seleccionada
                />
                {errorFechaNacimiento && <p className="error">{errorFechaNacimiento}</p>}
            </div>

            <SelectNacionalidad nacionalidad={nacionalidad} setNacionalidad={setNacionalidad} errorNacionalidad={errorNacionalidad} />

            <div className="caja_input">
                <label className="telefono_huesped">telefono</label>
                <input
                    type="number"
                    id="telefono_huesped"
                    placeholder="ingrese el telefono del huesped"
                    onChange={e => setTelefono(e.target.value)}
                />
                {errorTelefono && <p className="error">{errorTelefono}</p>}
            </div>

            <div className="caja_input">
                <label className="numero_reserva">numero de reserva</label>
                <input type="text" id="numero_reserva" disabled value={datosHuesped.idReserva || ""} />
            </div>

            <button type="submit" className="btn__principal" id="btn_enviar_datos">
                guardar
            </button>

            <Toaster />
        </form>
    )
}

export default FormHuesped