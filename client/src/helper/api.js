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

//* obtener datos huesped por numero reserva */
export const obtenerHuesped = async (params, value) => {
    try {
        const response = await axios.get(`${URL_BASE}/${params}/${value}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//* obtener datos reserva por numero de reserva */
export const obtenerReserva = async (value) => {
    try {
        const response = await axios.get(`${URL_BASE}/reserva/${value}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//* enviar nuevos datos de huesped */
export const actualizarHuesped = (idHuesped, datosActualizados) => {
    const json = JSON.stringify(datosActualizados);
    console.log(json, idHuesped);
    return axios.put(`${URL_BASE}/huesped/actualizar/${idHuesped}`, json);
};

//* enviar nuevos datos de reserva */
export const actualizarReserva = async (reservaId, datosActualizados) => {
    const json = JSON.stringify(datosActualizados);
    console.log(json, reservaId);
    return axios.put(`${URL_BASE}/reservaAct/${reservaId}`, json);
}

export const eliminarHuesped = async (huespedId) => {
    try {
        const response = await axios.delete(`${URL_BASE}/huespedEl/${huespedId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const eliminarReserva = async (reservaId) => {
    try {
        const response = await axios.delete(`${URL_BASE}/reservaEl/${reservaId}`);
        return response;
    } catch (error) {
        throw error;
    }
}