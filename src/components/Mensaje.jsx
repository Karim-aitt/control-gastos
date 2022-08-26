import React from 'react'

function Mensaje({children, tipo}) {

  return (
    // Estos nos permite tener un componente al que pasarle distintos tipos,
    // de error o correcto y le pasamos children con todo el mensaje

    // Clase fija con clase dinamica, y children como cuerpo
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje