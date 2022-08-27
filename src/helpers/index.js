
export const generarId = () => {
    // Generamos un numero random, lo transformamos a string y le quitamos los dos
    // primeros digitos, luego generamos milisegundos y los sumamos con random
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

// Formatear la fecha a un formato más legible
export const formatearFecha = (fecha) => {
    // generar la fecha nueva
    const fechaNueva = new Date(fecha);

    // Opciones que toma toLocaleDateString method para formatear la fecha
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    }
    // retornamos la fecha en formato España 11 de Diciembre 2022
    return fechaNueva.toLocaleDateString("es-ES", opciones)
}