import React from "react";

const ControlPresupuesto = ({ presupuesto }) => {
	// Transformar cantidad numerica a dinero local (euro en este caso)
	const formatearCantidad = (cantidad) => {
		return cantidad.toLocaleString("es-ES", {
			style: "currency",
			currency: "EUR",
		});
	};

	return (
		<div className="contenedor-presupuesto contenedor sombra dos-columnas">
			<div>
				<p>Gráfica aquí</p>
			</div>
			<div className="contenido-presupuesto">
				<p>
                
					<span>Presupuesto: </span> 
                    {/* Mostramos el dinero ya formateado */}
                    {formatearCantidad(presupuesto)}
                    <span>Disponible: </span> 
                    {/* Mostramos el dinero ya formateado */}
                    {formatearCantidad(0)}
                    <span>Gastado: </span> 
                    {/* Mostramos el dinero ya formateado */}
                    {formatearCantidad(0)}
				</p>
			</div>
		</div>
	);
};

export default ControlPresupuesto;
