import ReactDatePicker from "react-datepicker"
import SelectNacionalidad from "./SelectNacionalidad";
import { useReserva } from "../../context/ReservaContext";
import { useFormValidation } from "../../hook/useFormValidation";
import { useEffect } from "react";

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

    const { datosReserva, datosHuesped, setDatosHuesped } = useReserva();

    // TODO Falta el envio de datos con ayuda del context
    const handleSubmit = (e) => {
        e.preventDefault();

        const formularioValido = validarFormulario();

        if (!formularioValido) {

            alert("error");

        } else {

            setDatosHuesped((prevDatosHuesped) => ({
                ...prevDatosHuesped,
                nombre,
                apellido,
                fechaNacimiento,
                nacionalidad,
                telefono,
            }));
        }
    }

    useEffect(() => {
        console.log(datosReserva);
        console.log(datosHuesped);
    }, [datosHuesped]);

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
        </form>
    )
}

export default FormHuesped