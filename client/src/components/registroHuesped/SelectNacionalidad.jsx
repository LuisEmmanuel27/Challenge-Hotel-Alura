import Select from 'react-select';

const options = [
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' },
    { value: 'mx', label: 'México' },
    { value: 'gb', label: 'Reino Unido' },
    { value: 'au', label: 'Australia' },
    { value: 'fr', label: 'Francia' },
    { value: 'de', label: 'Alemania' },
    { value: 'jp', label: 'Japón' },
    { value: 'it', label: 'Italia' },
    { value: 'es', label: 'España' },
    { value: 'br', label: 'Brasil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'ch', label: 'Suiza' },
    { value: 'se', label: 'Suecia' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'za', label: 'Sudáfrica' },
    { value: 'ru', label: 'Rusia' },
    { value: 'gr', label: 'Grecia' },
    { value: 'nl', label: 'Países Bajos' },
    // Agregar más opciones de nacionalidades según sea necesario
];

const SelectNacionalidad = ({ nacionalidad, setNacionalidad, errorNacionalidad }) => {

    const handleChange = (selectedOption) => {
        setNacionalidad(selectedOption);
    };

    return (
        <div className='caja_input'>
            <label htmlFor='nacionalidad'>Nacionalidad</label>
            <Select
                id='nacionalidad'
                value={nacionalidad}
                onChange={handleChange}
                options={options}
                placeholder="Selecciona una nacionalidad"
            />
            {errorNacionalidad && <p className="error">{errorNacionalidad}</p>}
        </div>
    )
}

export default SelectNacionalidad