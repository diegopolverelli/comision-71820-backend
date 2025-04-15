
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}


const decoradorLog=(fn)=>{
    return ( ...args)=>{   // ... son aquí rest   [4, 5]
        console.log(`Se ha ejecutado la función ${fn.name} el ${new Date().toLocaleString()}`)
        return fn( ...args) //... son aquí op. spread     4, 5
    }
}


const sumaConLog=decoradorLog(suma)

console.log(suma(4,5))

console.log(sumaConLog(4, 5))

console.log(suma(4,5))