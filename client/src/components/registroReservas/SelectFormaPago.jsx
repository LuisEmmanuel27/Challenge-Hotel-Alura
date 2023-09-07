import Select from 'react-select';

const options = [
    { value: 'cre', label: 'TARJETA DE CREDITO' },
    { value: 'deb', label: 'TARJETA DE DEBITO' },
    { value: 'efe', label: 'EFECTIVO' },
];

const SelectFormaPago = ({ selectedFormaPago, setSelectedFormaPago }) => {

    const handleChange = (selectedOption) => {
        setSelectedFormaPago(selectedOption);
    };

    return (
        <div className='caja_input'>
            <label htmlFor='forma_pago'>forma de pago</label>
            <Select
                id='forma_pago'
                value={selectedFormaPago}
                onChange={handleChange}
                options={options}
                placeholder="Selecciona un metodo de pago"
            />
        </div>
    )
}

export default SelectFormaPago