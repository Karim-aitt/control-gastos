import {useState} from 'react'
import CerrarBtn from "../img/cerrar.svg"

export const Modal = ({setModal, animarModal, setAnimarModal}) => {

    const ocultarModal = () => {
        setModal(false)

        setTimeout(() => {
            setAnimarModal(false)
        }, 500)
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarBtn}
                alt="Cerrar Modal"
                onClick={ocultarModal}
            />
            {/* Para evitar que se cierre de forma brusca el componente, primero le
            añadimos la clase cerrar que se aplica cuando setAnimarModal es false y
            luego se desmonta el componente */}
            <form className={`formulario ${animarModal ? "animar" : "cerrar" }`}>
                <legend>Nuevo Gasto</legend>
            </form>
        </div>
    </div>
  )
}
