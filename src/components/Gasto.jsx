import React from "react";


// Libreria de swipeable list para poder hacer swip en cada gasto
// https://www.npmjs.com/package/react-swipeable-list
// npm i react-swipeable-list

// ---------- necesita de instalar prop-types =>  npm i prop-types ----------
// Los necesita para marcar como obligatorios ciertas funciones de los componentes
// a importar

// importaciones de los componentes que vamos a usar de la libreria
import {
    LeadingActions, 
    SwipeableList, 
    SwipeableListItem, 
    SwipeAction, 
    TrailingActions
} from "react-swipeable-list"

// importacion de la hoja de estilos de la libreria
import "react-swipeable-list/dist/styles.css"

import { formatearFecha } from "../helpers";

import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"

// Diccionario de imagenes
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

	const { categoria, nombre, cantidad, id, fecha } = gasto;

    // Estas funciones deben de utilizar los componentes importados
    // el parentesis significa "return", muestra el siguiente componente
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
            onClick={() => {eliminarGasto(id)}}
            // Animación de Eliminar, de la libreria de Swipe
            destructive={true}
            >Eliminar</SwipeAction>
        </TrailingActions>
    )

	return (
        <SwipeableList

        >
        <SwipeableListItem
            // Esta funcion es para el lado delantero del swip
            leadingActions={leadingActions()}
            // Esta función es para el lado trasero del swip
            trailingActions={trailingActions()}
        >
		<div className="gasto sombra">
			<div className="contenido-gasto">
            {/* Busca en el diccionario el nombre que corresponda con el de categoria
            entonces selecciona la imagen correspondiente, diccionarioIconos["salud"] */}
            <img src={diccionarioIconos[categoria]}
                alt="Icono Gasto"
            />
				<div className="descripcion-gasto">
					<p className="categoria">{categoria}</p>
					<p className="gasto">{nombre}</p>
                    <p className="fecha-gasto">
                        Agregado el {""}
                        {/* Aqui coge la fecha del objeto y la pasa al helper */}
                        <span>{formatearFecha(fecha)}</span>
                    </p>
				</div>
			</div>
            <p className="cantidad-gasto">{cantidad} €</p>
		</div>
        </SwipeableListItem>
        </SwipeableList>
	);
};

export default Gasto