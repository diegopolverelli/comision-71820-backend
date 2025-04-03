
const sumaVarios=(...sumandos)=>{   // ... son operador rest
    let resultado=0
    sumandos.forEach(n=>{
        resultado+=n
    })
    return resultado
}

const saludo=()=>{
    return `Hola...!!!`
}

const modifica=(fn)=>{
    return (...args)=>{   // ... son el op rest
        try {
            console.log(`La funcion ${fn.name} se ejecuto el ${new Date().toLocaleDateString()}`)
            return fn(...args)  // ... son el op spread
        } catch (error) {
            console.log(`Error...!!!`)
        }
    }
}

let saludoModificado=modifica(saludo)
console.log(saludo())
console.log(saludoModificado())
console.log(saludo())

let sumaModificada=modifica(sumaVarios)
console.log(sumaVarios(10, 9))
console.log(sumaModificada(10, 9))


