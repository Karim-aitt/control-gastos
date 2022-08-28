import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Modal } from "./components/Modal";
import { ListadoGastos } from "./components/ListadoGastos";
import { Filtros } from "./components/Filtros";

import { generarId } from "./helpers";


import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {

  // Comprobamos en LocalStorage si existen "gastos" si existen, los transformamos
  // a array, si no existe []
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )  

  // Obtenemos de localStorage el valor de presupuesto, si no existe, entonces 0
	const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem("presupuesto")) ?? 0);

	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  // Crear un modal
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  // Editar un gasto
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])


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

  // Setea en LocalStorage el presupuesto si existe, si no, 0.
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  }, [presupuesto])

  // Setea en LocalStorage los gastos
  useEffect(() => {
    // No se pueden almacenar arrays en localStorage, por lo que hay que convertirlo a string
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro){
      // Filtrar gastos por categoria en el filtro
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    // Si este presupuesto es mayor a 0, quiere decir que es valido,
    // por lo que seteamos la flag a true y entonces entramos directamente en la segunda
    // pantalla y nos saltamos la de añadir presupuesto

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  

	return (
		<div className={modal ? "fijar" : ""}>
			<Header
        gastos={gastos}
        setGastos={setGastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>
      {/* Si isValidPresupuesto es true, entonces se muestra la imagen */}
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
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
      <div className="contenedor sombra footer">
        <p className="">
        Creado por {""}
        <a href="https://github.com/Karim-aitt" target="_blank">
          Karim Gonzalez
        </a>
        {""} 2022
        </p>
      </div>

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
