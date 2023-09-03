import FechaTitulo from "../../components/menuPrincipal/FechaTitulo"
import Sidebar from "../../components/menuPrincipal/Sidebar"

const MenuPrincipal = () => {
    return (
        <div id="contenedor__menuPrincipal">
            <div className="lado__izquierdo">
                <Sidebar />
            </div>

            <div className="lado__derecho">
                <FechaTitulo />

                <div className="contenedor_bienvenida">
                    <h1>Bienvenido</h1>

                    <div className="contenido">
                        <p>
                            Sistema de reserva del hotel. Controle y administre de forma óptima y fácil el flujo
                            de reservas y de huespédes del hotel.
                            <br />
                            Esta herramienta le permitirá llevar un control completo y detallado de sus
                            reservas y huespédes, tendrá acceso a herramientas especiales para tareas específicas
                            como lo son:
                        </p>

                        <ul>
                            <li>Registro de Reservas y Húespedes</li>
                            <li>Edición de Reservas y Húespedes existentes</li>
                            <li>Eliminar todo tipo de registros</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MenuPrincipal