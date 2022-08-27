import { useState } from "react";
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

  

  const handleNuevoGasto = () => {
    setModal(true)

    // segundos que tarda en desplegarse la animación de "Nuevo Gasto"
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const guardarGasto = (gasto) => {
    // genera la id para el objeto gasto con el helper generarId y luego guardamos
    // el nuevo objeto gasto en el state gastos copiando todos los que haya
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])

    // Para cerrar el modal una vez hacemos click en añadir gasto
    setModal(false);
		setTimeout(() => {
			setAnimarModal(false);
		}, 500);
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
      />}

		</div>
	);
}

export default App;
