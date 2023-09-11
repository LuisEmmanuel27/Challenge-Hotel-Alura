import axios from 'axios';

const URL_BASE = "http://localhost:8080";

export const loginUser = async (userData) => {
    try {
        const json = JSON.stringify(userData);
        const response = await axios.post(`${URL_BASE}/login`, json);

        if (response && response.data) {
            return response.data;
        } else {
            throw new Error("La respuesta del servidor es inválida.");
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error.message);
        throw error.message;
    }
}

//* peticion axios para crear la reservacion */
export const crearReserva = async (datosReserva) => {
    try {
        const json = JSON.stringify(datosReserva);
        const response = await axios.post(`${URL_BASE}/reserva`, json);
        return response.data;
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        throw error;
    }
};

//* peticion axios para crear un huesped */
export const crearHuesped = async (datosHuesped) => {
    try {
        const json = JSON.stringify(datosHuesped);
        const response = await axios.post(`${URL_BASE}/huesped`, json);
        return response.data;
    } catch (error) {
        console.error('Error al crear el huésped:', error);
        throw error;
    }
};
