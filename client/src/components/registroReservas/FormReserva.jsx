import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos CSS por defecto

// TODO Las reservas tendran un valor de $800 la noche
const FormReserva = () => {

    const [selectedDateIn, setSelectedDateIn] = useState(null); // Inicializa el estado para la fecha seleccionada
    const [selectedDateOut, setSelectedDateOut] = useState(null); // Inicializa el estado para la fecha seleccionada

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className='contenedor__input' onSubmit={handleSubmit}>
            <div className='caja_input'>
                <label htmlFor='fecha_in'>fecha de check in</label>
                <DatePicker
                    id='fecha_in'
                    selected={selectedDateIn}
                    onChange={(date) => setSelectedDateIn(date)}
                    minDate={new Date()} // Esto bloquea las fechas pasadas
                    dateFormat="dd/MM/yyyy" // Formato de visualización
                    isClearable // Agrega un botón para borrar la fecha seleccionada
                />
            </div>

            <div className='caja_input'>
                <label htmlFor='fecha_out'>fecha de check out</label>
                <DatePicker
                    id='fecha_out'
                    selected={selectedDateOut}
                    onChange={(date) => setSelectedDateOut(date)}
                    minDate={selectedDateIn} // Esto bloquea las fechas pasadas
                    dateFormat="dd/MM/yyyy" // Formato de visualización
                    isClearable // Agrega un botón para borrar la fecha seleccionada
                />
            </div>

            <div className='caja_input'>
                <label htmlFor="valor_reserva">valor de reserva</label>
                <input type="number" id='valor_reserva' className='valor_reserva' disabled contentEditable="false" placeholder='$' />
            </div>

            <div className='caja_input'>
                <label htmlFor='forma_pago'>forma de pago</label>
                <select id='forma_pago'>
                    <option value="targeta de debito" key="1">targeta de debito</option>
                    <option value="targeta de credito" key="2">targeta de credito</option>
                    <option value="efectivo" key="3">efectivo</option>
                </select>
            </div>

            <button type="submit">
                siguiente
            </button>
        </form>
    )
}

export default FormReserva