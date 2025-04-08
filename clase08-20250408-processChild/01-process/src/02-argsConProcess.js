
let [,, ...argumentos ] = process.argv

console.log(argumentos)

let posicionPort=argumentos.findIndex(a=>a=="--port")
if(posicionPort==-1){
    console.log(`Complete el argumento --port`)
    process.exit()
}

// validaciones varias sobre el port ingresado

console.log(`Server running on port ${argumentos[posicionPort+1]}`)