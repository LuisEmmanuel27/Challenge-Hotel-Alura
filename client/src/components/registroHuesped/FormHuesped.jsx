import { useState } from "react";
import ReactDatePicker from "react-datepicker"
import SelectNacionalidad from "./SelectNacionalidad";
import { useReserva } from "../../context/ReservaContext";

const FormHuesped = () => {

    const { datosHuesped, setDatosHuesped } = useReserva();
    const [selectedBornDate, setSelectedBornDate] = useState(null);
    const [selectedNacionalidad, setSelectedNacionalidad] = useState(null);
    const [datosFormHuesped, setDatosFormHuesped] = useState({
        nombre: null,
        apellido: null,
        fechaNacimiento: null,
        nacionalidad: null,
        telefono: null,
        idReserva: null,
    })

    const handleBlur = (e) => {
        if (!e.target.value) {
            alert("Por favor, complete todos los campos antes de enviar el formulario.");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="contenedor__input" onSubmit={handleSubmit}>
            <div className="caja_input">
                <label htmlFor="nombre_huesped">nombre</label>
                <input type="text" id="nombre_huesped" placeholder="Ingrese el nombre del huesped" />
            </div>

            <div className="caja_input">
                <label htmlFor="apellido_huesped">apellido</label>
                <input type="text" id="apellido_huesped" placeholder="Ingrese el apellido del huesped" />
            </div>

            <div className="caja_input">
                <label htmlFor="fecha_born">fecha de nacimiento</label>
                <ReactDatePicker
                    id='fecha_born'
                    selected={selectedBornDate}
                    onChange={(date) => setSelectedBornDate(date)}
                    maxDate={new Date()} // Esto bloquea las fechas pasadas
                    dateFormat="dd/MM/yyyy" // Formato de visualización
                    isClearable // Agrega un botón para borrar la fecha seleccionada
                />
            </div>

            <SelectNacionalidad selectedNacionalidad={selectedNacionalidad} setSelectedNacionalidad={setSelectedNacionalidad} />

            <div className="caja_input">
                <label className="telefono_huesped">telefono</label>
                <input type="number" id="telefono_huesped" placeholder="ingrese el telefono del huesped" />
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