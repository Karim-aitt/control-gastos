import { useState } from "react";
import Mensaje from "./Mensaje";

import CerrarBtn from "../img/cerrar.svg";

export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto }) => {

    const [mensaje, setMensaje] = useState("")

    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")

    // Para Ocultar el modal al hacer Click en la X
	const ocultarModal = () => {
		setModal(false);
		setTimeout(() => {
			setAnimarModal(false);
		}, 500);
	};

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación de los inputs del formulario del modal
        if([nombre, cantidad, categoria].includes("")){
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setMensaje("")
            }, 3000)

            return;
        }
        guardarGasto({nombre, cantidad, categoria})
    }

	return (
		<div className="modal">
			<div className="cerrar-modal">
            {/* X que cierra el modal */}
				<img src={CerrarBtn} alt="Cerrar Modal" onClick={ocultarModal} />
				{/* Para evitar que se cierre de forma brusca el componente, primero le
            añadimos la clase cerrar que se aplica cuando setAnimarModal es false y
            luego se desmonta el componente */}
            </div>
				<form 
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
                >
					<legend>Nuevo Gasto</legend>
                    {/* Componente Mensaje que muestra el error en caso de mal validacion */}
                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

					<div className="campo">
						<label htmlFor="nombre">Nombre Gasto</label>
						<input
							id="nombre"
							type="text"
							placeholder="Añade el nombre del Gasto"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
						/>
					</div>
					<div className="campo">
						<label htmlFor="cantidad">Cantidad</label>
						<input
							id="cantidad"
							type="number"
							placeholder="Añade la cantidad del Gasto: ej. 300"
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
						/>
					</div>
					<div className="campo">
						<label htmlFor="categoria">Categoria</label>
						<select 
                        id="categoria" 
                        value={categoria} 
                        onChange={(e) => setCategoria(e.target.value)}
                        >
							<option value="">-- Seleccione --</option>
							<option value="ahorro">Ahorro</option>
							<option value="comida">Comida</option>
							<option value="casa">Casa</option>
							<option value="gastos">Gastos Varios</option>
							<option value="ocio">Ocio</option>
							<option value="salud">Salud</option>
							<option value="suscripciones">Suscripciones</option>
						</select>
					</div>

                    <input
                    type="submit"
                    value="Añadir Gasto"
                     />

				</form>
			
		</div>
	);
};
