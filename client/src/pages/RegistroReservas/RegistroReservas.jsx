import calendario_img from "../../assets/calendario_form.jpg";
import FormReserva from '../../components/registroReservas/FormReserva';

const RegistroReservas = () => {
    return (
        <div id="contenedor__registroReservas">
            <div className='lado__izquierdo'>
                <h1>sistema de reservas</h1>

                <FormReserva />
            </div>

            <div className='lado__derecho'>
                <img src={calendario_img} alt="calendario_img" />
            </div>
        </div>
    )
}

export default RegistroReservas