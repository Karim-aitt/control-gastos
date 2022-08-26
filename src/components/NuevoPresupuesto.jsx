import {useState} from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [mensaje, setMensaje] = useState("")

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0){
            setMensaje("No es un prespuesto válido")
            return
        }

        setMensaje("")
        setIsValidPresupuesto(true)
    }

	return (
		<div className="contenedor-presupuesto contenedor sombra">
			<form onSubmit={handlePresupuesto} className="formulario">
				<div className="campo">
					<label>Definir Presupuesto</label>
					<input
						className="nuevo-presupuesto"
						type="number"
						placeholder="Añade tu Presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
					/>
				</div>
				<input type="submit" value="Añadir" />

                {/* Aqui se muestra el mensaje de error si la validación del número
                no es correcta, le pasa como props el valor "error" (que es una clase) a tipo */}
                {/* le pasamos al componente Mensaje, el mensaje a través de children */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

			</form>
		</div>
	);
};

export default NuevoPresupuesto;
