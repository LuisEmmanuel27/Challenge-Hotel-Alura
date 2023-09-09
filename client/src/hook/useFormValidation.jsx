import { useState } from "react";

//* Custom hook para validar el formulario de huespedes

export const useFormValidation = () => {

    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const [nacionalidad, setNacionalidad] = useState(null);
    const [telefono, setTelefono] = useState(null);
    const [errorNombre, setErrorNombre] = useState(null);
    const [errorApellido, setErrorApellido] = useState(null);
    const [errorFechaNacimiento, setErrorFechaNacimiento] = useState(null);
    const [errorNacionalidad, setErrorNacionalidad] = useState(null);
    const [errorTelefono, setErrorTelefono] = useState(null);

    const validarFormulario = () => {

        let formularioValido = true;

        if (!nombre || nombre.trim() === "") {
            setErrorNombre("Por favor ingrese el nombre del huésped");

            formularioValido = false;
        } else {
            setErrorNombre(null);
        }

        if (!apellido || apellido.trim() === "") {
            setErrorApellido("Por favor ingrese el apellido del huésped");
            formularioValido = false;
        } else {
            setErrorApellido(null);
        }

        if (!fechaNacimiento) {
            setErrorFechaNacimiento("Por favor ingrese la fecha de nacimiento del huésped");
            formularioValido = false;
        } else {
            setErrorFechaNacimiento(null);
        }

        if (!nacionalidad) {
            setErrorNacionalidad("Por favor ingrese la nacionalidad del huésped");
            formularioValido = false;
        } else {
            setErrorNacionalidad(null);
        }

        if (!telefono || telefono.trim() === "") {
            setErrorTelefono("Por favor ingrese el número de teléfono del huésped");
            formularioValido = false;
        } else {
            setErrorTelefono(null);
        }

        return formularioValido;

    }

    return {
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
    }
}