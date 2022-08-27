import { useState, useEffect } from "react";

const ControlPresupuesto = ({ gastos, presupuesto }) => {
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);

	useEffect(() => {
		// Reduce toma dos valores, el valor acumulado y la instancia de gasto,
		// que es lo que itera entre todos los objetos. Va ir acumulando de gasto.cantidad
		// en total, y para terminar, es el valor con el que inicia que es 0.
		const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
		setGastado(totalGastado)

		const totalDisponible = presupuesto - totalGastado;
		setDisponible(totalDisponible);		

	}, [gastos]);

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
				</p>
				<p>
					<span>Disponible: </span>
					{/* Mostramos el dinero ya formateado */}
					{formatearCantidad(disponible)}
				</p>

				<p>
					<span>Gastado: </span>
					{/* Mostramos el dinero ya formateado */}
					{formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};

export default ControlPresupuesto;
