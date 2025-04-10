import fs from "fs"

process.on("exit", code=>{
    console.log(`Saliendo del proceso con coódigo ${code}`)
    console.log(`Tareas de finalización del app. (desconectar DB's, eliminar temporales, etc.)`)
    if(code>0){
        console.log(`Escribe log de salida con error`)
    }
})

process.on("uncaughtException", (error, type)=>{
    console.log(`Ocurrió un error inesperado de tipo ${type}; detalle: ${error.message}`)
    console.log(`Escribir log de errores...`)
})

// process.exit(-5)

let contador=0
let intervalo=setInterval(() => {
    contador++
    console.log(`Proceso ${contador} ejecutando`)

    if(contador>10){
        clearInterval(intervalo)
    }
}, 500);

setTimeout(() => {
    throw new Error("Error inesperado... :(")
}, 2000);