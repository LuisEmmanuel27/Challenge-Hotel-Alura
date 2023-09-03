const FechaTitulo = () => {

    const fechaActual = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaActual.toLocaleDateString(undefined, options);

    return (
        <div>
            <h1>Sistema de Reservas Hotel Alura</h1>

            <h2>Hoy es {fechaFormateada}</h2>
        </div>
    )
}

export default FechaTitulo