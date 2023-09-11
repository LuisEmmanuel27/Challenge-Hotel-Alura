import Select from 'react-select';

const options = [
    { value: 'huespedRe', label: 'NÚMERO DE RESERVACÓN' },
    { value: 'huespedAp', label: 'APELLIDO DEL HUÉSPED' },
];

const SelectParametroBusqueda = ({ selectedParametro, setSelectedParametro }) => {

    const handleChange = (selectedOption) => {
        setSelectedParametro(selectedOption);
    };


    return (
        <div className='caja_input'>
            <label htmlFor='forma_busqueda'>parámetro de búsqueda</label>
            <Select
                id='forma_busqueda'
                value={selectedParametro}
                onChange={handleChange}
                options={options}
                placeholder="Selecciona un parámetro"
            />
        </div>
    )
}

export default SelectParametroBusqueda