// Spread:
let numeros=[1,2,3,4,5]
let numeros2=[6,7,8,9,0]
let todosLosNumeros=[...numeros, 5, 48, 34, ...numeros2] 
console.log(numeros)
console.log(numeros2)
console.log(todosLosNumeros)

const suma=(a, b, c, d, e)=>{
    return a+b+c+d+e
}

console.log(suma(1,2,3,4,5))
console.log(suma(...numeros))
console.log(suma(...numeros2))



let datos1={
    nombre:"Julian", 
    edad:23
}

let datos2={
    apellido:"Alvarez",
    nacionalidad: "Argentino",
    email: "jalvarez@test.com",
    altura: 1.79,
    peso: 75
}

let datosCompletos={
    // nombre: datos1.nombre, 
    // apellido: datos2.apellido
    ...datos1, 
    ...datos2
}

console.log(datosCompletos)


// REST:
const datos=(nombre, apellido, ...otrosDatos)=>{
    console.log(nombre)
    console.log(apellido)
    console.log(otrosDatos)
}

datos()
datos("Juan")
datos("Juan", "Lopez")
datos("Juan", "Lopez", 34, {domicilio:"tatata 2020"})
datos("Juan", "Lopez", false, 109, 34, {domicilio:"tatata 2020"})

const sumaVarios=(...sumandos)=>{   // ... son operador rest
    let resultado=0
    sumandos.forEach(n=>{
        resultado+=n
    })
    return resultado
}

console.log(sumaVarios(10,10,10))
console.log(sumaVarios(...numeros))  // ... son operador spread


let {nombre, edad, ...otrasCaracteristicas}=datosCompletos
console.log(nombre)
console.log(edad)
console.log(otrasCaracteristicas)

const PI=3.1416
nombre="Raul"
// let {name, email, ...otras} =req.body   // ... son rest
// if(!name || !email) return res.status(400).send(`Error, name | email son requeridos`)

// let nuevoUsuario=await grabaUser({name, email, ...otras})   // son spread