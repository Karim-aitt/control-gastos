import { useState, useEffect } from "react";
// Importacion api Circular progressbar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
// Importacion hoja de estilos de Circular progressbar
import "react-circular-progressbar/dist/styles.css"

// Documentacion https://www.npmjs.com/package/react-circular-progressbar

const ControlPresupuesto = ({ 
	gastos, 
	presupuesto, 
	setGastos, 
	setPresupuesto, 
	setIsValidPresupuesto 
}) => {

	const [porcentaje, setPorcentaje] = useState(0)
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

		const nuevoPorcentaje = 
		(( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
		
		// Para que se vea la animación rellenar la grafica
		setTimeout(() => {
			// seteamos el valor de referencia de la grafica con el % correcto
			setPorcentaje(nuevoPorcentaje)
		}, 1500)

	}, [gastos]);

	// Transformar cantidad numerica a dinero local (euro en este caso)
	const formatearCantidad = (cantidad) => {
		return cantidad.toLocaleString("es-ES", {
			style: "currency",
			currency: "EUR",
		});
	};

	// Funcion para resetear los gastos y el presupuesto
	const handleResetApp = () => {
		// Confirmacion en caso de error
		const resultado = confirm("Deseas reiniciar presupuesto y gastos?")
		if(resultado){
			setGastos([])
			setPresupuesto(0)
			setIsValidPresupuesto(false)
		}
	}

	return (
		<div className="contenedor-presupuesto contenedor sombra dos-columnas">
			<div>
				<CircularProgressbar
				// para construir los estilos de la gráfica (ver documentacion)
					styles={buildStyles({
						pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
						trailColor: "#F5F5F5",
						textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6"
					})}
				// Valor que muestra la gráfica
					value={porcentaje}
				// El texto que va dentro de la grafica
					text={`${porcentaje}% Gastado`}
				
				/>
			</div>
			<div className="contenido-presupuesto">
			<button 
			className="reset-app"
			type="button"
			onClick={handleResetApp}
			>Resetear App</button>
				<p>
					<span>Presupuesto: </span>
					{/* Mostramos el dinero ya formateado */}
					{formatearCantidad(presupuesto)}
				</p>
				{/* En caso de que el gasto supere lo disponible, se torna color rojo */}
				<p className={`${disponible < 0 ? "negativo": ""}`}>
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
