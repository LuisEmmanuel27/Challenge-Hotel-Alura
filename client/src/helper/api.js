import axios from 'axios';

export const loginUser = async (userData) => {
    try {
        const json = JSON.stringify(userData);
        const response = await axios.post("http://localhost:8080/login", json);

        if (response && response.data) {
            console.log(response);
            return response.data;
        } else {
            throw new Error("La respuesta del servidor es inválida.");
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error.message);
        throw error.message;
    }
}
