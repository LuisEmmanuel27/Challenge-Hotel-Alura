import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos CSS por defecto
import SelectFormaPago from './SelectFormaPago';
import { useReserva } from '../../context/ReservaContext';

// TODO Las reservas tendran un valor de $800 la noche
const FormReserva = () => {

    const [selectedDateIn, setSelectedDateIn] = useState(null); // Inicializa el estado para la fecha seleccionada
    const [selectedDateOut, setSelectedDateOut] = useState(null); // Inicializa el estado para la fecha seleccionada
    const [selectedFormaPago, setSelectedFormaPago] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    //* valores del context de reserva
    const { datosReserva, setDatosReserva, datosHuesped, setDatosHuesped } = useReserva();

    //* Generar el costo total de la reserva
    useEffect(() => {
        if (selectedDateIn && selectedDateOut) {
            const unDia = 24 * 60 * 60 * 1000;
            const noches = Math.round(Math.abs(selectedDateOut - selectedDateIn) / unDia);

            const costePorNoche = 800;
            const total = noches * costePorNoche;
            // Formatea el número con comas
            const formattedTotal = total.toLocaleString();

            setTotalCost(formattedTotal);
        } else {
            setTotalCost(0);
        }
    }, [selectedDateIn, selectedDateOut]);

    //* Generar un numero de reserva
    const generarNumeroReserva = () => {
        const fechaActual = new Date();
        const costo = totalCost.replace('$', '');
        const metodoPago = selectedFormaPago.value;

        const valorAleatorio = Math.floor(Math.random() * 100) + 1;

        const numeroReserva = `${fechaActual.getFullYear()}${fechaActual.getMonth() + 1}${fechaActual.getDate()}${costo}${metodoPago}${valorAleatorio}`;

        return numeroReserva;
    }

    //* Enviando los datos del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedDateIn && selectedDateOut && selectedFormaPago) {
            const fechaEntrada = selectedDateIn;
            const fechaSalida = selectedDateOut;
            const valor = totalCost;
            const formaDePago = selectedFormaPago;
            const idReserva = generarNumeroReserva();

            setDatosReserva({
                ...datosReserva,
                fechaEntrada,
                fechaSalida,
                valor,
                formaDePago,
            });

            setDatosHuesped({
                ...datosHuesped,
                idReserva
            })

            navigate('/registroHuesped');
        } else {
            setError(true);
        }
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
                    minDate={selectedDateIn ? new Date(selectedDateIn.getTime() + 86400000) : null} // Esto bloquea las fechas pasadas
                    dateFormat="dd/MM/yyyy" // Formato de visualización
                    isClearable // Agrega un botón para borrar la fecha seleccionada
                />
            </div>

            <div className='caja_input'>
                <label htmlFor="valor_reserva">valor de reserva</label>
                <input
                    type="text"
                    id='valor_reserva'
                    className='valor_reserva'
                    disabled
                    contentEditable="false"
                    placeholder='$'
                    value={`$ ${totalCost}`}
                />
            </div>

            <SelectFormaPago selectedFormaPago={selectedFormaPago} setSelectedFormaPago={setSelectedFormaPago} />

            {
                error &&
                <p className='error'>
                    Hay datos faltantes, por favor llena el formulario correctamente.
                </p>
            }

            <button type="submit" className="btn__principal" id="btn_guardar_reservacion">
                siguiente
            </button>
        </form>
    )
}

export default FormReserva