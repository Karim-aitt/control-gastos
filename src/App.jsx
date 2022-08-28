import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Modal } from "./components/Modal";
import { ListadoGastos } from "./components/ListadoGastos";

import { generarId } from "./helpers";


import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [gastos, setGastos] = useState([])  

	const [presupuesto, setPresupuesto] = useState(0);
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  // Crear un modal
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  // Editar un gasto
  const [gastoEditar, setGastoEditar] = useState({})

  // Cuando se deslice y se añada un gasto a gastoEditar si trigerea este useEffect
  // y abre el modal para su edicción
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
    // segundos que tarda en desplegarse la animación de "Nuevo Gasto"
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
    }
  },[gastoEditar])

  // Abrir el modal
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    // segundos que tarda en desplegarse la animación de "Nuevo Gasto"
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const guardarGasto = (gasto) => {
    if(gasto.id){
      // actualizar
      const gastosActualiados = gastos.map(gastoState => 
        gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualiados)
      // limpiarState
      setGastoEditar({})
    } else {
      // Nuevo gasto
      // genera la id para el objeto gasto con el helper generarId y luego guardamos
      // el nuevo objeto gasto en el state gastos copiando todos los que haya
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }
    // Para cerrar el modal una vez hacemos click en añadir gasto
    setModal(false);
		setTimeout(() => {
			setAnimarModal(false);
		}, 500);
  }

  // filtramos los gastos por la id que obtenemos a través del swip y seteamos
  // otra vez los gastos pero sin el elemento igual a la id suministrada
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

	return (
		<div className={modal ? "fijar" : ""}>
			<Header
        gastos={gastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>
      {/* Si isValidPresupuesto es true, entonces se muestra la imagen */}
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>

          <div className="nuevo-gasto">
            <img 
            src={IconoNuevoGasto} 
            alt="Icono nuevo gasto"
            onClick={handleNuevoGasto}
            />
			    </div>
      </>
      )}

			{modal &&

      <Modal 
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

		</div>
	);
}

export default App;
